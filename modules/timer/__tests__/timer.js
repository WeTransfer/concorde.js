import Timer from '../index';

describe('Timer module', () => {
  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate(isoDate);
      }
    };
  }

  afterEach(() => {
    // Resetting the Date object
    global.Date = RealDate;
  });

  describe('timer constructor', () => {
    let spy;
    let timer;
    beforeEach(() => {
      mockDate('Friday, 1 January 2016 00:23:45');
    });

    describe('no callback is given', () => {
      it('should throw an error if no callback is given', () => {
        expect(() => new Timer(100)).toThrow('ValidCallbackMissing');
      });
    });

    describe('callback and delay are given', () => {
      let startSpy;
      beforeEach(() => {
        spy = jest.fn();
        startSpy = jest.spyOn(Timer.prototype, 'start');
        timer = new Timer(100, spy);
      });

      it('should set the right properties and call start', () => {
        expect(timer).toMatchObject({
          remaining: 100,
          delay: 100,
          callback: spy,
          paused: false,
          time: 1451604225000,
        });
      });

      it('should call the start method', () => {
        expect(startSpy).toHaveBeenCalled();
      });
    });

    describe('callback is given, delay not', () => {
      it('should set the default delay (0)', () => {
        timer = new Timer(undefined, spy);
        expect(timer.remaining).toBe(0);
      });
    });
  });

  describe('start method', () => {
    it('should set the setTimeout method to the id property', () => {
      jest.useFakeTimers();
      const callbackSpy = jest.fn();
      const startStub = jest.spyOn(Timer.prototype, 'start');
      const timer = new Timer(10, callbackSpy);
      startStub.mockReset();

      timer.start();
      jest.runAllTimers();
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('stop method', () => {
    it('should call timer.stop with the id-property', () => {
      const callbackSpy = jest.fn();
      const startStub = jest.spyOn(Timer.prototype, 'start');
      const timer = new Timer(10, callbackSpy);
      startStub.mockReset();

      timer.id = 5;
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      timer.stop();
      expect(clearTimeoutSpy).toBeCalledWith(5);
    });
  });

  describe('pause method', () => {
    let timer;
    let callbackSpy;
    let startSpy;

    beforeEach(() => {
      callbackSpy = jest.fn();
      startSpy = jest.spyOn(Timer.prototype, 'start');
      timer = new Timer(10, callbackSpy);
      startSpy.mockReset();
    });

    describe('timer is paused', () => {
      beforeEach(() => {
        timer.paused = true;
      });

      it('should return undefined', () => {
        expect(timer.pause()).toBeUndefined();
      });
    });

    describe('timer is NOT paused', () => {
      let stopSpy;
      beforeEach(() => {
        timer.paused = false;
        timer.time = 1451701625105;
        mockDate('Friday, 2 January 2016 03:23:45');
        stopSpy = jest.spyOn(timer, 'stop');
        timer.pause();
      });

      it('should set the paused property to true', () => {
        expect(timer.paused).toBe(true);
      });

      it('should call the stop method', () => {
        expect(stopSpy).toHaveBeenCalledTimes(1);
      });

      it('should set the remaining time', () => {
        expect(timer.remaining).toEqual(200115);
      });
    });
  });

  describe('resume method', () => {
    let timer;
    let callbackSpy;
    let startSpy;

    beforeEach(() => {
      callbackSpy = jest.fn();
      timer = new Timer(10, callbackSpy);
      startSpy = jest.spyOn(timer, 'start');
      startSpy.mockReset();

      mockDate('Friday, 2 January 2016 03:23:45');
      timer.paused = true;
      timer.time = 10;
      timer.resume();
    });

    it('should set the paused property to false', () => {
      expect(timer.paused).toBe(false);
    });

    it('set the time property to the current timestamp', () => {
      expect(timer.time).toEqual(1451701425000);
    });

    it('should call the startSpy', () => {
      expect(startSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('remainingTime getter', () => {
    let timer;
    beforeEach(() => {
      timer = new Timer(10, () => 'foo');
    });

    describe('timer is paused', () => {
      beforeEach(() => {
        timer.paused = true;
        timer.remaining = 1476278108301;
      });

      it('should return the right time', () => {
        expect(timer.remainingTime).toEqual(1476278108.301);
      });
    });

    describe('timer is NOT paused', () => {
      beforeEach(() => {
        mockDate('Friday, 2 January 2016 03:23:45');
        timer.paused = false;
        timer.time = 1451607825105;
        timer.remaining = 1476278108301;
      });

      it('should return the right time', () => {
        expect(timer.remainingTime).toEqual(1476184508.406);
      });
    });
  });
});
