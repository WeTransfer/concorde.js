/**
 * Timer module. Useful functions to deal with timing in javascript.
 * @module Timer
 * @since 1.0.0
 */

export default class Timer {
  /**
   * Store all the details of the timer and starts it.
   * @constructor
   * @since 1.0.0
   * @param {Integer} [delay=0] The time, in milliseconds, the Timer should wait before the specified function or code is executed. The actual delay may be longer than intended; JavaScript timing is notoriously bad.
   * @param {Function} callback A function to be executed after the timer expires.
   * @returns {Timer} The timer object
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const timedFunction = () => {
   *    console.log('ping!')
   * }
   *
   * const stopwatch = new Timer(10000, timedFunction);
   * // => Timer {remaining: 10000, callback: ƒ, paused: false, delay: 10, time: 1523436642013}
   *
   * (T+5 seconds)
   * stopwatch
   *  // => Timer {remaining: 5000, callback: ƒ, paused: false, delay: 10, time: 1523436647000}
   *
   * (T+10 seconds)
   * // 'ping!'
   */
  constructor(delay = 0, callback) {
    // Callback MUST be a function
    if (typeof callback !== 'function') {
      throw 'ValidCallbackMissing';
    }

    this.remaining = delay;
    this.callback = callback;
    this.paused = false;
    this.delay = delay;
    this.time = +new Date();

    this.start();
  }

  /**
   * (Re)starts the Timer by creating a new timeout
   * @since 1.0.0
   * @function start
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const timedFunction = () => {
   *    console.log('pong!');
   * }
   *
   * const stopwatch = new Timer(10000, timedFunction);
   *
   * (T+2 seconds)
   * stopwatch.pause(); (see Timer.pause)
   *
   * (T+10 seconds)
   * stopwatch.start();
   *
   * (T+18 seconds)
   * // 'pong!'
   */
  start() {
    // Basically it's a simple timeOut
    this.id = setTimeout(this.callback, this.remaining);
  }

  /**
   * Stops and clears the Timer
   * @since 1.0.0
   * @function stop
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const timedFunction = () => {
   *    console.log('pung!');
   * }
   *
   * const stopwatch = new Timer(10000, timedFunction);
   *
   * (T+2 seconds)
   * stopwatch.stop();
   *
   * (void)
   */
  stop() {
    // That we can stop
    clearTimeout(this.id);
  }

  /**
   * Pauses the current Timer
   * @since 1.0.0
   * @function pause
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const timedFunction = () => {
   *    console.log('peng!');
   * }
   *
   * const stopwatch = new Timer(10000, timedFunction);
   *
   * (T+2 seconds)
   * stopwatch.pause();
   *
   * (T+10 seconds)
   * stopwatch.resume(); (see Timer.resume)
   *
   * (T+18 seconds)
   * // 'peng!'
   */
  pause() {
    if (this.paused) {
      return;
    }
    // Stop and keep track of the current time remaining
    this.paused = true;
    this.stop();
    this.remaining -= +new Date() - this.time;
  }

  /**
   * Resumes the current Timer
   * @since 1.0.0
   * @function pause
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const timedFunction = () => {
   *    console.log('pang!');
   * }
   *
   * const stopwatch = new Timer(10000, timedFunction);
   *
   * (T+2 seconds)
   * stopwatch.pause(); (see Timer.pause)
   *
   * (T+10 seconds)
   * stopwatch.resume();
   *
   * (T+18 seconds)
   * // 'pang!'
   */
  resume() {
    // Restart with the time remaining
    this.paused = false;
    this.time = +new Date();
    this.start();
  }

  /**
   * Test if this device is mobile, based on its userAgent string.
   * @since 1.0.0
   * @member {Integer} remainingTime The time that is remaining for the current Timer.
   * @example
   * import Timer from '@wetransfer/concorde-timer';
   *
   * (T)
   * const stopwatch = new Timer(10000, () => 'foo'));
   *
   * (T+2 seconds)
   * stopwatch.remainingTime
   * // 8000
   */
  get remainingTime() {
    // And calculate the time remaining when paused or running.
    if (this.paused) {
      return Math.max(0, this.remaining / 1000);
    }

    return Math.max(0, (this.remaining - (+new Date() - this.time)) / 1000);
  }
}
