import test from 'ava';
import Version from '../version';

test('should compare (semver) versions', t => {
	t.true(Version('1.0.1', '<', '5.1.0'));
	t.false(Version('4.4.1', '<', '0.1.0'));
	
	t.true(Version('9.0.1', '>', '5.1.0'));
	t.false(Version('4.4.1', '>', '6.1.0'));

	t.true(Version('6.0.1', '>=', '5.1.1'));
	t.true(Version('5.1.1', '>=', '5.1.1'));
	t.false(Version('4.4.1', '>=', '6.1.0'));

	t.true(Version([4, 0, 1], '<=', [5, 1, 1]));
	t.true(Version('4.1.1', '<=', '5.1.1'));
	t.false(Version('8.4.1', '<=', '6.1.0'));
	
	t.true(Version('2.4.1', '=', '2.4.1'));
	t.false(Version('4.4.1', '=', '0.1.0'));

	t.true(Version('2.4.1', '==', '2.4.1'));
	t.false(Version('0.4.1', '==', '6.4.1'));

	t.false(Version('2.4.1', 'Whut?', '2.4.1'));
});