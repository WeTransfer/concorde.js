import { debounceAsync } from '../index';

describe('debounce async function', () => {
  jest.useFakeTimers();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  it('should return the result of a single operation', async () => {
    const debounced = debounceAsync(async (value) => value, 100);
    const promise = debounced('foo');

    jest.runAllTimers();
    const result = await promise;
    expect(result).toEqual('foo');
  });

  it('should cancel pending promises', async (done) => {
    const debounced = debounceAsync(async (value) => value, 100);
    const promises = ['foo', 'bar'].map(debounced);

    jest.runAllTimers();
    Promise.all(promises).catch((res) => {
      expect(res.message).toEqual('cancelled debounce');
      done();
    });
  });

  it('should return the result of last operation', () => {
    let counter = 0;
    const debounced = debounceAsync(async (increment = 1) => {
      counter += increment;
      return Promise.resolve(counter);
    });

    debounced(1).catch(() => {
      /* Don't do anything for rejected calls */
    });
    debounced(2).catch(() => {
      /* Don't do anything for rejected calls */
    });
    debounced(3);

    expect(counter).toEqual(0);
    jest.runAllTimers();
    expect(counter).toEqual(3);
  });

  it('should call the given function again if wait time has passed', async () => {
    let counter = 0;
    const debounced = debounceAsync(async () => counter++, 10);

    debounced();
    jest.runAllTimers();
    expect(counter).toEqual(1);

    sleep(20);
    debounced();
    jest.runAllTimers();
    expect(counter).toEqual(2);
  });
});
