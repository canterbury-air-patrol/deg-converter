import { DMSToDegrees, DMToDegrees, degreesToDM, degreesToDMS } from './deg-conv'

test('N Latitude', () => {
  expect(degreesToDM(43.5, true)).toBe('43 30.000 N')
  expect(degreesToDMS(43.5, true)).toBe('43 30 0.0 N')
  expect(DMToDegrees('43 30 N')).toBe(43.5)
  expect(DMSToDegrees('43 30 00 N')).toBe(43.5)
  expect(DMToDegrees('N 43 30')).toBe(43.5)
  expect(DMSToDegrees('N 43 30 00')).toBe(43.5)
  expect(DMToDegrees('43 30N')).toBe(43.5)
  expect(DMSToDegrees('43 30 00N')).toBe(43.5)
  expect(DMToDegrees('N43 30')).toBe(43.5)
  expect(DMSToDegrees('N43 30 00')).toBe(43.5)
})

test('S Latitude', () => {
  expect(degreesToDM(-43.5, true)).toBe('43 30.000 S')
  expect(degreesToDMS(-43.5, true)).toBe('43 30 0.0 S')
  expect(DMToDegrees('43 30 S')).toBe(-43.5)
  expect(DMSToDegrees('43 30 00 S')).toBe(-43.5)
  expect(DMToDegrees('S 43 30')).toBe(-43.5)
  expect(DMSToDegrees('S 43 30 00')).toBe(-43.5)
  expect(DMToDegrees('43 30S')).toBe(-43.5)
  expect(DMSToDegrees('43 30 00S')).toBe(-43.5)
  expect(DMToDegrees('S43 30')).toBe(-43.5)
  expect(DMSToDegrees('S43 30 00')).toBe(-43.5)
})

test('E Longitude', () => {
  expect(degreesToDM(172.5, false)).toBe('172 30.000 E')
  expect(degreesToDMS(172.5, false)).toBe('172 30 0.0 E')
  expect(DMToDegrees('172 30 E')).toBe(172.5)
  expect(DMSToDegrees('172 30 00 E')).toBe(172.5)
  expect(DMToDegrees('E 172 30')).toBe(172.5)
  expect(DMSToDegrees('E 172 30 00')).toBe(172.5)
  expect(DMToDegrees('172 30E')).toBe(172.5)
  expect(DMSToDegrees('172 30 00E')).toBe(172.5)
  expect(DMToDegrees('E172 30')).toBe(172.5)
  expect(DMSToDegrees('E172 30 00')).toBe(172.5)
})

test('W Longitude', () => {
  expect(degreesToDM(-172.5, false)).toBe('172 30.000 W')
  expect(degreesToDMS(-172.5, false)).toBe('172 30 0.0 W')
  expect(DMToDegrees('172 30 W')).toBe(-172.5)
  expect(DMSToDegrees('172 30 00 W')).toBe(-172.5)
  expect(DMToDegrees('W 172 30')).toBe(-172.5)
  expect(DMSToDegrees('W 172 30 00')).toBe(-172.5)
  expect(DMToDegrees('172 30W')).toBe(-172.5)
  expect(DMSToDegrees('172 30 00W')).toBe(-172.5)
  expect(DMToDegrees('W172 30')).toBe(-172.5)
  expect(DMSToDegrees('W172 30 00')).toBe(-172.5)
})

test('DM/DMS parsers enforce numeric part counts', () => {
  // DMToDegrees previously aliased DMSToDegrees and accepted any count.
  expect(() => DMToDegrees('43 30 30 N')).toThrow(SyntaxError)
  expect(() => DMToDegrees('43 N')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('43 30 N')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('43 30 30 30 N')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('43 abc 30 N')).toThrow(SyntaxError)
})

test('DMSToDegrees rejects multiple direction letters', () => {
  // Previously: includes()/replace() removed only the first letter,
  // silently accepting "N43 30 N" or "43 30 N S" as 43.5.
  expect(() => DMSToDegrees('N43 30 N')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('43 30 N S')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('S 43 30 W')).toThrow(SyntaxError)
  expect(() => DMSToDegrees('43 30 EE')).toThrow(SyntaxError)
})

test('formatters reject out-of-range values', () => {
  expect(() => degreesToDM(91, true)).toThrow(RangeError)
  expect(() => degreesToDM(-91, true)).toThrow(RangeError)
  expect(() => degreesToDMS(91, true)).toThrow(RangeError)
  expect(() => degreesToDMS(-91, true)).toThrow(RangeError)
  expect(() => degreesToDM(181, false)).toThrow(RangeError)
  expect(() => degreesToDM(-181, false)).toThrow(RangeError)
  expect(() => degreesToDMS(181, false)).toThrow(RangeError)
  expect(() => degreesToDMS(-181, false)).toThrow(RangeError)
  expect(() => degreesToDM(NaN, true)).toThrow(RangeError)
  expect(() => degreesToDM(Infinity, false)).toThrow(RangeError)
  // Boundaries are inclusive.
  expect(() => degreesToDM(90, true)).not.toThrow()
  expect(() => degreesToDM(-90, true)).not.toThrow()
  expect(() => degreesToDM(180, false)).not.toThrow()
  expect(() => degreesToDM(-180, false)).not.toThrow()
})

test('degreesToDMS minute boundaries', () => {
  // Without Math.floor on minutes, 43.999 rounded to "43 60 -0.0 N" (invalid).
  expect(degreesToDMS(43.999, true)).toBe('43 59 56.4 N')
  // 43.508333... ≈ 43°30'30" — naive rounding produced "43 31 -0.0 N".
  expect(degreesToDMS(43.508333, true)).toBe('43 30 30.0 N')
  expect(degreesToDMS(43.5, true)).toBe('43 30 0.0 N')
  expect(degreesToDMS(0, false)).toBe('0 0 0.0 E')
  expect(degreesToDMS(-43.508333, false)).toBe('43 30 30.0 W')
})

test('Latitude Range', () => {
  // Use toBeCloseTo for any value derived from float division so a future
  // refactor that reorders the arithmetic does not break tests on IEEE drift.
  expect(DMSToDegrees('000 00 00 E')).toBe(0)
  expect(DMSToDegrees('000 59 00 E')).toBeCloseTo(59 / 60, 10)
  expect(DMSToDegrees('000 00 59 E')).toBeCloseTo(59 / 3600, 10)
  expect(DMSToDegrees('000 00 00 W')).toBe(-0)
  expect(DMSToDegrees('000 59 00 W')).toBeCloseTo(-59 / 60, 10)
  expect(DMSToDegrees('000 00 59 W')).toBeCloseTo(-59 / 3600, 10)
  expect(DMSToDegrees('000 30 00 E')).toBe(0.5)
  expect(DMSToDegrees('000 30 00 W')).toBe(-0.5)
  expect(DMSToDegrees('000 30 30 E')).toBeCloseTo(0.5 + 30 / 3600, 10)
  expect(DMSToDegrees('000 30 30 W')).toBeCloseTo(-(0.5 + 30 / 3600), 10)
  expect(DMSToDegrees('090 45 00 E')).toBe(90.75)
  expect(DMSToDegrees('090 45 00 W')).toBe(-90.75)
  expect(DMSToDegrees('180 00 00 E')).toBe(180)
  expect(DMSToDegrees('180 00 00 W')).toBe(-180)
  expect(DMSToDegrees('179 00 00 E')).toBe(179)
  expect(DMSToDegrees('179 00 00 W')).toBe(-179)
  expect(DMSToDegrees('179 59 00 E')).toBeCloseTo(179 + 59 / 60, 10)
  expect(DMSToDegrees('179 59 00 W')).toBeCloseTo(-(179 + 59 / 60), 10)
  expect(DMSToDegrees('179 59 59 E')).toBeCloseTo(179 + 59 / 60 + 59 / 3600, 10)
  expect(DMSToDegrees('179 59 59 W')).toBeCloseTo(-(179 + 59 / 60 + 59 / 3600), 10)
})
