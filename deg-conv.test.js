import { DMSToDegrees, DMToDegrees, degreesToDM, degreesToDMS } from './deg-conv'

test('N Latitude', () => {
  expect(degreesToDM(43.5, true).slice(-1)).toBe('N')
  expect(degreesToDMS(43.5, true).slice(-1)).toBe('N')
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
  expect(degreesToDM(-43.5, true).slice(-1)).toBe('S')
  expect(degreesToDMS(-43.5, true).slice(-1)).toBe('S')
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
  expect(degreesToDM(172.5, false).slice(-1)).toBe('E')
  expect(degreesToDMS(172.5, false).slice(-1)).toBe('E')
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
  expect(degreesToDM(-172.5, false).slice(-1)).toBe('W')
  expect(degreesToDMS(-172.5, false).slice(-1)).toBe('W')
  expect(DMToDegrees('172 30 W')).toBe(-172.5)
  expect(DMSToDegrees('172 30 00 W')).toBe(-172.5)
  expect(DMToDegrees('W 172 30')).toBe(-172.5)
  expect(DMSToDegrees('W 172 30 00')).toBe(-172.5)
  expect(DMToDegrees('172 30W')).toBe(-172.5)
  expect(DMSToDegrees('172 30 00W')).toBe(-172.5)
  expect(DMToDegrees('W172 30')).toBe(-172.5)
  expect(DMSToDegrees('W172 30 00')).toBe(-172.5)
})

test('Latitude Range', () => {
  expect(DMSToDegrees('000 00 00 E')).toBe(0)
  expect(DMSToDegrees('000 59 00 E')).toBe(59 / 60)
  expect(DMSToDegrees('000 00 59 E')).toBe(59 / 3600)
  expect(DMSToDegrees('000 00 00 W')).toBe(-0)
  expect(DMSToDegrees('000 59 00 W')).toBe(-59 / 60)
  expect(DMSToDegrees('000 00 59 W')).toBe(-59 / 3600)
  expect(DMSToDegrees('000 30 00 E')).toBe(0.5)
  expect(DMSToDegrees('000 30 00 W')).toBe(-0.5)
  expect(DMSToDegrees('000 30 30 E')).toBe(0.5 + (30 / 3600))
  expect(DMSToDegrees('000 30 30 W')).toBe(-1 * (0.5 + (30 / 3600)))
  expect(DMSToDegrees('090 45 00 E')).toBe(90.75)
  expect(DMSToDegrees('090 45 00 W')).toBe(-90.75)
  expect(DMSToDegrees('180 00 00 E')).toBe(180)
  expect(DMSToDegrees('180 00 00 W')).toBe(-180)
  expect(DMSToDegrees('179 00 00 E')).toBe(179)
  expect(DMSToDegrees('179 00 00 W')).toBe(-179)
  expect(DMSToDegrees('179 59 00 E')).toBe(179 + (59 / 60))
  expect(DMSToDegrees('179 59 00 W')).toBe(-1 * (179 + (59 / 60)))
  expect(DMSToDegrees('179 59 59 E')).toBe(179 + (59 / 60) + (59 / 3600))
  expect(DMSToDegrees('179 59 59 W')).toBe(-1 * (179 + (59 / 60) + (59 / 3600)))
})
