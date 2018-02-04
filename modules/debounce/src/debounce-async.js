export function debounceAsync (
  func,
  wait = 0,
  { cancelObj = { name: 'debounceAsync', message: 'cancelled debounce' } } = {}
) {
  let timer, latestResolve, shouldCancel

  return (...args) => {
    if (latestResolve) {
      shouldCancel = true
    }

    return new Promise((resolve, reject) => {
      latestResolve = resolve
      timer = setTimeout(() => exec(resolve, reject, ...args), wait)
    })
  }

  function exec (resolve, reject, ...args) {
    if (shouldCancel && resolve !== latestResolve) {
      return reject(cancelObj)
    }

    shouldCancel = false
    clearTimeout(timer)
    timer = latestResolve = null

    func(...args)
      .then(resolve)
      .catch(reject)
  }
}
