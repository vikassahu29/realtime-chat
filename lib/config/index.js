var dbConfig = require('./db.js');
var authConfig = require('./auth.js');

var config = {};
config.database = dbConfig;
config.auth = authConfig;

module.exports = config;
