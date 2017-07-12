import Debounce from '../index';
import sinon from 'sinon';

describe('Debounce module', () => {
  it('should return function', () => {
    expect(typeof Debounce(sinon.stub(), 100)).toEqual('function');
  });

  it('should debounce function if called multiple times', async () => {
    let counter = 0;
    const test = Debounce(() => counter++, 50);

    test();
    test();
    test();
    test();

    await new Promise(resolve => setTimeout(resolve, 300));

    expect(counter).toEqual(1);
  });

  it('should default the debounce to 1ms if no interval is given', async () => {
    let counter = 0;
    const test = Debounce(() => counter++);

    test();
    test();
    await new Promise(resolve => setTimeout(resolve, 5));

    test();
    test();

    await new Promise(resolve => setTimeout(resolve, 300));

    expect(counter).toEqual(2);
  });
});
