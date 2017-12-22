import { debounce } from '../index';

describe('debounce function', () => {
  jest.useFakeTimers();

  let counter;
  beforeEach(() => {
    counter = 0;
  });

  it('should debounce function if called multiple times', () => {
    const test = debounce((increment = 1) => {
      counter += increment;
      return counter;
    }, 50);

    test(1);
    test(2);
    test(3);
    test(4);

    expect(counter).toEqual(0);
    jest.runAllTimers();
    expect(counter).toEqual(4);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
  });

  it('should default the debounce to 0ms if no interval is given', () => {
    const test = debounce(() => counter++);

    test();
    test();

    expect(counter).toEqual(0);
    jest.runAllTimers();
    expect(counter).toEqual(1);

    test();
    test();

    jest.runAllTimers();
    expect(counter).toEqual(2);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });
});
