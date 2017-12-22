export default function debounce(func, wait = 0, {
  leading = false,
  cancelObj = 'canceled'
} = {}) {
  let timer, latestResolve, shouldCancel;

  async function exec(args, resolve, reject) {
    if (shouldCancel && resolve !== latestResolve) {
      reject(cancelObj);
    } else {
      func.apply(this, args).then(resolve).catch(reject);
      if (resolve === latestResolve) {
        shouldCancel = false;
        clearTimeout(timer);
        timer = latestResolve = null;
      }
    }
  }

  return function (...args) {
    if (!latestResolve) {
      if (leading) {
        return func.apply(this, args);
      }

      return new Promise((resolve, reject) => {
        latestResolve = resolve;
        timer = setTimeout(exec.bind(this, args, resolve, reject), wait);
      });
    }

    shouldCancel = true;
    return new Promise((resolve, reject) => {
      latestResolve = resolve;
      timer = setTimeout(exec.bind(this, args, resolve, reject), wait);
    });
  };
}

