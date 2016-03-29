import test from 'ava';
import esDepsFromString from './index';

test('should esDepsFromString', (t) =>
  t.is(esDepsFromString('unicorns'), 'unicorns'));

test('should throw on empty input', t => t.throws(() => { esDepsFromString(); }, TypeError));
test('should throw on invalid input', t => t.throws(() => { esDepsFromString(2); }, TypeError));
