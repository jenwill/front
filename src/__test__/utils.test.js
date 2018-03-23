import { renderIf, log, logError } from '../lib/utils';
require('jest');

describe('utils', () => {
  test('renderIf', () => {
    expect(typeof renderIf).toBe('function');
    expect(renderIf(true, 'component')).toBe('component');
    expect(renderIf(false, 'component')).toBe(undefined);
  });
});
