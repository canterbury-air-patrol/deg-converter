function assertInRange(degs: number, lat: boolean): void {
  if (!Number.isFinite(degs)) {
    throw new RangeError('degrees must be a finite number')
  }
  const limit = lat ? 90 : 180
  if (degs < -limit || degs > limit) {
    throw new RangeError(`degrees ${degs} out of range for ${lat ? 'latitude (±90)' : 'longitude (±180)'}`)
  }
}

export function degreesToDM(degs: number, lat: boolean): string {
  assertInRange(degs, lat)
  let dir = ''
  if (degs < 0) {
    degs *= -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins = ((degs - d) * 60).toFixed(3)

  return d + ' ' + mins + ' ' + dir
}

export function DMSToDegrees(DMS: string): number {
  const dirMatches = DMS.match(/[NSEW]/g)
  if (dirMatches && dirMatches.length > 1) {
    throw new SyntaxError(`DMS string contains multiple direction letters: ${DMS}`)
  }
  let negative = false
  let DMS_no_dir = DMS
  const dir = dirMatches?.[0]
  if (dir === 'S' || dir === 'W') {
    negative = true
  }
  if (dir) {
    DMS_no_dir = DMS.replace(dir, '')
  }
  const parts = DMS_no_dir.split(' ')
  let fract = 1
  let p = 0
  let degs = 0
  while (p < parts.length) {
    const value = parseFloat(parts[p])
    if (!isNaN(value)) {
      degs += value / fract
      fract *= 60
    }
    p++
  }
  if (negative) {
    degs *= -1
  }
  return degs
}

export function DMToDegrees(DM: string): number {
  return DMSToDegrees(DM)
}

export function degreesToDMS(degs: number, lat: boolean): string {
  assertInRange(degs, lat)
  let dir = ''
  if (degs < 0) {
    degs *= -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const totalMins = (degs - d) * 60
  const mins = Math.floor(totalMins)
  const secs = ((totalMins - mins) * 60).toFixed(1)

  return d + ' ' + mins + ' ' + secs + ' ' + dir
}
