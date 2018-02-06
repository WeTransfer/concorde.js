import axios from 'axios';

import jsonp from './jsonp';

function queryString(params = {}) {
  return Object.keys(params).reduce((a, k) => {
    a.push(k + '=' + encodeURIComponent(params[k]));
    return a;
  }, []).join('&');
}

// Re-export axios API enhanced with JSONP method
export default Object.getOwnPropertyNames(axios).reduce((api, name) => {
  return Object.assign({}, api, { [name]: axios[name] });
}, { jsonp, queryString });
