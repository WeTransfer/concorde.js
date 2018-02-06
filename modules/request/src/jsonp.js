import jsonp from 'jsonp';

/**
 * url (String) url to fetch
  opts (Object), optional
    param (String) name of the query string parameter to specify the callback (defaults to callback)
    timeout (Number) how long after a timeout error is emitted. 0 to disable (defaults to 60000)
    prefix (String) prefix for the global callback functions that handle jsonp responses (defaults to __jp)
    name (String) name of the global callback functions that handle jsonp responses (defaults to prefix + incremented counter)
 */
export default function(url, options) {
  return new Promise((resolve, reject) => {
    jsonp(url, options, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
}
