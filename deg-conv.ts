export function degreesToDM(degs: number, lat: boolean): string {
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
  let negative = false
  let DMS_no_dir = DMS
  if (DMS.includes('N')) {
    DMS_no_dir = DMS.replace('N', '')
  } else if (DMS.includes('S')) {
    negative = true
    DMS_no_dir = DMS.replace('S', '')
  } else if (DMS.includes('E')) {
    DMS_no_dir = DMS.replace('E', '')
  } else if (DMS.includes('W')) {
    negative = true
    DMS_no_dir = DMS.replace('W', '')
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
  let dir = ''
  if (degs < 0) {
    degs *= -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins: number = Number(((degs - d) * 60).toFixed(0))
  const secs = (degs - d - mins / 60).toFixed(1)

  return d + ' ' + mins + ' ' + secs + ' ' + dir
}
