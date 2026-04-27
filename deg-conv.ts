export type Axis = 'lat' | 'lon'

function assertInRange(degs: number, axis: Axis): void {
  if (!Number.isFinite(degs)) {
    throw new RangeError('degrees must be a finite number')
  }
  const limit = axis === 'lat' ? 90 : 180
  if (degs < -limit || degs > limit) {
    throw new RangeError(`degrees ${degs} out of range for ${axis === 'lat' ? 'latitude (±90)' : 'longitude (±180)'}`)
  }
}

export function degreesToDM(degs: number, axis: Axis): string {
  assertInRange(degs, axis)
  let dir = ''
  if (degs < 0) {
    degs *= -1
    dir = axis === 'lat' ? 'S' : 'W'
  } else {
    dir = axis === 'lat' ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins = ((degs - d) * 60).toFixed(3)

  return d + ' ' + mins + ' ' + dir
}

function parseDegreesString(input: string, expectedParts: 2 | 3, label: string): number {
  const dirMatches = input.match(/[NSEW]/g)
  if (dirMatches && dirMatches.length > 1) {
    throw new SyntaxError(`${label} string contains multiple direction letters: ${input}`)
  }
  const dir = dirMatches?.[0]
  const negative = dir === 'S' || dir === 'W'
  const body = dir ? input.replace(dir, '') : input
  const numericParts: number[] = []
  for (const part of body.split(' ')) {
    if (part === '') continue
    const value = parseFloat(part)
    if (isNaN(value)) {
      throw new SyntaxError(`${label} string contains non-numeric part "${part}": ${input}`)
    }
    numericParts.push(value)
  }
  if (numericParts.length !== expectedParts) {
    throw new SyntaxError(`${label} string expects ${expectedParts} numeric parts, got ${numericParts.length}: ${input}`)
  }
  let fract = 1
  let degs = 0
  for (const value of numericParts) {
    degs += value / fract
    fract *= 60
  }
  return negative ? -degs : degs
}

export function DMSToDegrees(DMS: string): number {
  return parseDegreesString(DMS, 3, 'DMS')
}

export function DMToDegrees(DM: string): number {
  return parseDegreesString(DM, 2, 'DM')
}

export function degreesToDMS(degs: number, axis: Axis): string {
  assertInRange(degs, axis)
  let dir = ''
  if (degs < 0) {
    degs *= -1
    dir = axis === 'lat' ? 'S' : 'W'
  } else {
    dir = axis === 'lat' ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const totalMins = (degs - d) * 60
  const mins = Math.floor(totalMins)
  const secs = ((totalMins - mins) * 60).toFixed(1)

  return d + ' ' + mins + ' ' + secs + ' ' + dir
}
