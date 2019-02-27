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
    let callbackSpy;
    let timer;

    beforeEach(() => {
      mockDate('Friday, 1 January 2016 00:23:45');
    });

    describe('when no callback is given', () => {
      it('should throw an error if no callback is given', () => {
        expect(() => new Timer(100)).toThrow('ValidCallbackMissing');
      });
    });

    describe('when callback and delay are given', () => {
      let startSpy;

      beforeEach(() => {
        callbackSpy = jest.fn();
        startSpy = jest.spyOn(Timer.prototype, 'start');
        timer = new Timer(100, callbackSpy);
      });

      afterEach(() => {
        startSpy.mockRestore();
      });

      it('should initialise the instance', () => {
        expect(timer).toMatchObject({
          remaining: 100,
          delay: 100,
          callback: callbackSpy,
          paused: false,
          time: 1451604225000,
        });
      });

      it('should call the start method', () => {
        expect(startSpy).toHaveBeenCalled();
      });
    });

    describe('when callback is given, but delay is not', () => {
      it('should set the default delay (0)', () => {
        timer = new Timer(undefined, callbackSpy);
        expect(timer.remaining).toBe(0);
      });
    });
  });

  describe('start method', () => {
    it('should set the setTimeout method to the id property', () => {
      const timer = new Timer(10, jest.fn());
      timer.start();
      expect(timer.id).toEqual(expect.any(Number));
    });
  });

  describe('stop method', () => {
    let clearTimeoutSpy;
    let stop;
    let timer;

    beforeEach(() => {
      clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      stop = jest.spyOn(Timer.prototype, 'start');
      timer = new Timer(100, jest.fn());
    });

    afterEach(() => {
      stop.mockRestore();
    });

    it('should call timer.stop with the id-property', () => {
      timer.stop();
      expect(clearTimeoutSpy).toBeCalledWith(expect.any(Number));
    });
  });

  describe('reset method', () => {
    let timer;
    let callbackSpy;
    let startSpy;
    let stopSpy;

    beforeEach(() => {
      callbackSpy = jest.fn();
      startSpy = jest.spyOn(Timer.prototype, 'start');
      stopSpy = jest.spyOn(Timer.prototype, 'stop');
      timer = new Timer(10, callbackSpy);
    });

    afterEach(() => {
      startSpy.mockRestore();
      stopSpy.mockRestore();
    });

    it('should stop the timer', () => {
      timer.reset();
      expect(stopSpy).toHaveBeenCalledTimes(1);
    });

    it('should reset the remaining time', () => {
      timer.reset();
      expect(timer.remaining).toBe(10);
    });

    it('should start the timer again', () => {
      timer.reset();
      expect(startSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('pause method', () => {
    let timer;
    let startSpy;
    let stopSpy;

    beforeEach(() => {
      startSpy = jest.spyOn(Timer.prototype, 'start');
      stopSpy = jest.spyOn(Timer.prototype, 'stop');
      timer = new Timer(10, jest.fn());
    });

    afterEach(() => {
      startSpy.mockRestore();
      stopSpy.mockRestore();
    });

    describe('when timer is paused', () => {
      beforeEach(() => {
        timer.paused = true;
      });

      it('should not stop the timer', () => {
        expect(stopSpy).not.toHaveBeenCalled();
      });
    });

    describe('when timer is NOT paused', () => {
      beforeEach(() => {
        timer.paused = false;
        timer.time = 1451701625105;
        mockDate('Friday, 2 January 2016 03:23:45');
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
    let startSpy;
    let timer;

    beforeEach(() => {
      timer = new Timer(10, jest.fn());
      startSpy = jest.spyOn(timer, 'start');

      mockDate('Friday, 2 January 2016 03:23:45');
      timer.paused = true;
      timer.time = 10;
      timer.resume();
    });

    afterEach(() => {
      startSpy.mockRestore();
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
