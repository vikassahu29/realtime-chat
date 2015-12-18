var models = require('../models');
var jwt    = require('jsonwebtoken');
var Promise = require('bluebird');
var config = require('../config');

module.exports = {
  register: function(name, email, password) {
    return new Promise(function(resolve, reject) {
      var user = new models.User({
        name: name,
        email: email,
        password: password
      });
      user.save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({name: name});
        }
      });
    });
  },
  login: function(email, password) {
    return new Promise(function(resolve, reject) {
      models.User.findOne({email: email}, function(err, user) {
        if (err) {
          reject(err);
        } else if (user) {
          user.comparePassword(password, function(err, isMatch) {
            if (err) {
              reject(err);
            } else if (isMatch) {
              var token = jwt.sign(user.getPayload(), config.auth.jwtSecret, {
                expiresIn: 3600
              });
              resolve({token: token});
            } else {
              reject({
                name: 'CustomError',
                message: 'Incorrect information provided',
                code: 400
              });
            }
          });
        } else {
          reject({
            name: 'CustomError',
            message: 'Incorrect information provided',
            code: 400
          });
        }
      });
    });
  }
};
