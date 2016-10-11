import test from 'ava';
import Debounce from '../index';
import sinon from 'sinon';

test('should return function', t => {
  t.is(typeof Debounce(sinon.stub(), 100), 'function');
});

//TODO Assertations
test('should debounce function if called multiple times', async t => {
  var counter = 0;
  var test = Debounce(() => counter++, 50);

  test();
  test();
  test();
  test();

  await new Promise(resolve => setTimeout(resolve, 300));

  t.is(counter, 1);
});

test('should default the debounce to 1ms if no interval is given', async t => {
  var counter = 0;
  var test = Debounce(() => counter++);

  test();
  test();
  await new Promise(resolve => setTimeout(resolve, 5));

  test();
  test();

  await new Promise(resolve => setTimeout(resolve, 300));

  t.is(counter, 2);
});
