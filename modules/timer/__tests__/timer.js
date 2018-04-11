import Timer from '../index';

describe('Timer module', () => {
  let realDate;
  let mockDate;

  beforeAll(() => {
    // Mocking the Date: https://github.com/facebook/jest/issues/2234#issuecomment-324868057
    realDate = Date;
    mockDate = (date) => {
      global.Date = class extends realDate {
        constructor() {
          super();
          return new realDate(date);
        }
      };
    };
  });

  afterEach(() => {
    // Resetting the Date object
    global.Date = realDate;
  });

  it('should throw an error if no callback is given', () => {
    expect(() => new Timer(100)).toThrow('ValidCallbackMissing');
  });

  it('should set the right properties and call start', () => {
    const spy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    mockDate('Friday, 1 January 2016 00:23:45');

    const timer = new Timer(100, spy);
    expect(timer.remaining).toEqual(100);
    expect(timer.delay).toEqual(100);
    expect(timer.callback).toEqual(spy);
    expect(timer.paused).toBe(false);
    expect(timer.time).toEqual(1451604225000);
    expect(startStub).toHaveBeenCalledTimes(1);
  });

  it('#start should set the setTimeout method to the id property', () => {
    jest.useFakeTimers();
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    timer.start();
    jest.runAllTimers();
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('#stop should call timer.stop with the id-property', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    timer.id = 5;
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    timer.stop();
    expect(clearTimeoutSpy).toBeCalledWith(5);
  });

  it('#pause should return if already paused', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    timer.paused = true;

    expect(timer.pause()).toBeUndefined();
  });

  it('#pause should set paused property to true and call stop and set remaining time', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    timer.paused = false;
    timer.time = 1451701625105;
    mockDate('Friday, 2 January 2016 03:23:45');
    const spy = jest.spyOn(timer, 'stop');
    timer.pause();
    expect(timer.paused).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(timer.remaining).toEqual(200115);
  });

  it('#resume should set paused to false, time to the current date and call #start', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    mockDate('Friday, 2 January 2016 03:23:45');
    const spy = jest.spyOn(timer, 'start');
    timer.paused = true;
    timer.time = 10;

    timer.resume();
    expect(timer.paused).toBe(false);
    expect(timer.time).toEqual(1451701425000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('#get should return right time when paused', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    timer.paused = true;
    timer.remaining = 1476278108301;
    expect(timer.remainingTime).toEqual(1476278108.301);
  });

  it('#get should return right time when not paused', () => {
    const callbackSpy = jest.fn();
    const startStub = jest.spyOn(Timer.prototype, 'start');
    const timer = new Timer(10, callbackSpy);
    startStub.mockReset();

    mockDate('Friday, 2 January 2016 03:23:45');

    timer.paused = false;
    timer.time = 1451607825105;
    timer.remaining = 1476278108301;
    expect(timer.remainingTime).toEqual(1476184508.406);
  });
});
