export function degreesToDM(degs, lat) {
  let dir = ''
  if (degs < 0) {
    degs = degs * -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins = ((degs - d) * 60).toFixed(3)

  return d + ' ' + mins + ' ' + dir
}

export function DMSToDegrees(DMS) {
  let negative = false
  if (DMS.includes('N')) {
    DMS = DMS.replace('N', '')
  } else if (DMS.includes('S')) {
    negative = true
    DMS = DMS.replace('S', '')
  } else if (DMS.includes('E')) {
    DMS = DMS.replace('E', '')
  } else if (DMS.includes('W')) {
    negative = true
    DMS = DMS.replace('W', '')
  }
  const parts = DMS.split(' ')
  let fract = 1
  let p = 0
  let degs = 0
  while (p < parts.length) {
    const value = parseFloat(parts[p])
    if (!isNaN(value)) {
      degs = degs + value / fract
      fract = fract * 60
    }
    p++
  }
  if (negative) {
    degs = degs * -1
  }
  return degs
}

export function DMToDegrees(DM) {
  return DMSToDegrees(DM)
}

export function degreesToDMS(degs, lat) {
  let dir = ''
  if (degs < 0) {
    degs = degs * -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins = ((degs - d) * 60).toFixed(0)
  const secs = (degs - d - mins / 60).toFixed(1)

  return d + ' ' + mins + ' ' + secs + ' ' + dir
}
