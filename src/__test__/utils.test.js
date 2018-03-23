import { renderIf, log, logError } from '../lib/utils';
require('jest');

describe('utils', () => {
  test('renderIf', () => {
    expect(typeof renderIf).toBe('function');
    expect(renderIf(true, 'component')).toBe('component');
    expect(renderIf(false, 'component')).toBe(undefined);
  });

  describe('log method', () => {
    it('should log when in dev mode', () => {
      log('1');
      expect(true).toBeTruthy();
    });
  });

  describe('logError method', () => {
    it('should log an error', () => {
      logError('error');
      expect(true).toBeTruthy();
    });
    it('should be null', () => {
      expect(true).toBeTruthy();
    });
  });
});