// TODO

const env = process.env.NODE_ENV || 'dev';

// production
const envConfig = {
  dev: require('./env/dev'),
  prd: require('./env/prd'),
};

module.exports = envConfig[env];