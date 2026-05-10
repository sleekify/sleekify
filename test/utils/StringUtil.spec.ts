import { StringUtil } from '../../src/utils/StringUtil';

describe('StringUtil', () => {
  [
    {
      description: 'an undefined value',
      value: undefined
    },
    {
      description: 'an empty string',
      value: ''
    }
  ].forEach(test => {
    it(`When generating a hash code for ${test.description}, then the hash code is zero`, () => {
      expect(StringUtil.getHashCode(test.value)).toBe(0);
    });
  });

  it('When generating a hash code for two identical strings, then the hash codes must match', () => {
    expect(StringUtil.getHashCode('abc')).toBe(StringUtil.getHashCode('abc'));
  });

  it('When generating a hash code for two different strings, then the hash codes may not match', () => {
    expect(StringUtil.getHashCode('abc')).not.toBe(StringUtil.getHashCode('def'));
  });
});
