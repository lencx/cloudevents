// const _ = require('lodash')

module.exports = oData => {
  const { data, ...rest } = oData;
  return {
    ...rest,
    data,
  }
}