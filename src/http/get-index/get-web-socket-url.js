module.exports = function getWS() {
  const env = process.env.NODE_ENV;
  const defaultUrl = 'ws://localhost:3333';
  return {
    testing: defaultUrl,
    staging: 'fixme: these urls are printed after create',
    production: 'fixme: these urls are printed after create'
  }[env] || defaultUrl;
}
