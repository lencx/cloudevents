const fetch = require("node-fetch");

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = (url, { headers, ...rest }) => {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest
  })
  .then(res => res.text())
  .then(res => isJson(res) ? JSON.parse(res) : res);
}