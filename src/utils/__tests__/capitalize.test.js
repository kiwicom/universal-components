// @flow

import * as fc from 'fast-check';
import capitalize from '../capitalize';

describe('Capitalize', () => {
  it('returns the correct string', () => {
    fc.assert(
      fc.property(fc.string(), text => {
        if (text) {
          const capitalizedText = capitalize(text);
          expect(text[0].toUpperCase()).toBe(capitalizedText[0]);
          expect(capitalizedText[0].toUpperCase()).toBe(capitalizedText[0]);
          expect(capitalizedText.slice(1)).toBe(text.slice(1));
        }
      })
    );

    expect(capitalize('kiwi.com')).toBe('Kiwi.com');
    expect(capitalize(null)).toBe('');
    expect(capitalize('')).toBe('');
  });
});
