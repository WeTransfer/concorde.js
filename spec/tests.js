import sinon from 'sinon';

import Debounce from '../index';

describe('Debounce module', () => {
  jest.useFakeTimers();

  it('should return function', () => {
    expect(typeof Debounce(sinon.stub(), 100)).toEqual('function');
  });

  it('should debounce function if called multiple times', () => {
    let counter = 0;
    const test = Debounce(() => counter++, 50);

    test();
    test();
    test();
    test();

    expect(counter).toEqual(0);
    jest.runAllTimers();
    expect(counter).toEqual(1);
  });

  it('should default the debounce to 1ms if no interval is given', () => {
    let counter = 0;
    const test = Debounce(() => counter++);

    test();
    test();

    jest.runAllTimers();
    expect(counter).toEqual(1);

    test();
    test();

    jest.runAllTimers();
    expect(counter).toEqual(2);
  });
});
