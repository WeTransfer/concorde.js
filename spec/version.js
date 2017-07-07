import Version from '../version';

describe('Browser version module', () => {
  it('should compare (semver) versions', () => {
		expect(Version('1.0.1', '<', '5.1.0')).toBe(true);
		expect(Version('4.4.1', '<', '0.1.0')).toBe(false);

		expect(Version('9.0.1', '>', '5.1.0')).toBe(true);
		expect(Version('4.4.1', '>', '6.1.0')).toBe(false);

		expect(Version('6.0.1', '>=', '5.1.1')).toBe(true);
		expect(Version('5.1.1', '>=', '5.1.1')).toBe(true);
		expect(Version('4.4.1', '>=', '6.1.0')).toBe(false);

		expect(Version([4, 0, 1], '<=', [5, 1, 1])).toBe(true);
		expect(Version('4.1.1', '<=', '5.1.1')).toBe(true);
		expect(Version('8.4.1', '<=', '6.1.0')).toBe(false);

		expect(Version('2.4.1', '=', '2.4.1')).toBe(true);
		expect(Version('4.4.1', '=', '0.1.0')).toBe(false);

		expect(Version('2.4.1', '==', '2.4.1')).toBe(true);
		expect(Version('0.4.1', '==', '6.4.1')).toBe(false);

		expect(Version('2.4.1', 'Whut?', '2.4.1')).toBe(false);
	});
});
