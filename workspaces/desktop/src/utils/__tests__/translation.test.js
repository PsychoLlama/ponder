// @flow
import { translate, translateWithCount } from '../translation';

describe('Translation utils', () => {
  describe('translate(...)', () => {
    it('returns the same text', () => {
      const text = 'some string';
      const result = translate(text);

      expect(result).toBe(text);
    });
  });

  describe('translateWithCount(...)', () => {
    it('returns singular when the count is 1', () => {
      const singular = 'potato';
      const plural = 'potatoes';
      const result = translateWithCount(singular, plural, 1);

      expect(result).toBe(singular);
    });

    it('returns plural for counts other than 1', () => {
      const singular = 'potato';
      const plural = 'potatoes';
      const result = translateWithCount(singular, plural, 2);

      expect(result).toBe(plural);
    });
  });
});
