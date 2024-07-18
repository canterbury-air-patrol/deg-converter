export function degreesToDM (degs, lat) {
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

export function DMToDegrees (DM) {
  const parts = DM.split(' ')
  const d = parseInt(parts[0])
  const mins = parseFloat(parts[1])
  const dir = parts[2]
  const dec = mins / 60
  let degs = d + dec
  if (dir === 'S' || dir === 'W') {
    degs = degs * -1
  }
  return degs
}

export function degreesToDMS (degs, lat) {
  let dir = ''
  if (degs < 0) {
    degs = degs * -1
    dir = lat ? 'S' : 'W'
  } else {
    dir = lat ? 'N' : 'E'
  }
  const d = Math.floor(degs)
  const mins = ((degs - d) * 60).toFixed(0)
  const secs = ((degs - d - (mins / 60))).toFixed(1)

  return d + ' ' + mins + ' ' + secs + ' ' + dir
}

export function DMSToDegrees (DMS) {
  const parts = DMS.split(' ')
  const d = parseInt(parts[0])
  const mins = parseInt(parts[1])
  const secs = parseFloat(parts[2])
  const dir = parts[3]
  const decmins = secs / 60
  let degs = d + (mins + decmins) / 60
  if (dir === 'S' || dir === 'W') {
    degs = degs * -1
  }
  return degs
}
