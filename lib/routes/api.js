var express = require('express');
var router = express.Router();
var provider = require('../providers');

function mongoError(errorObject) {
  var data = [];
  if (errorObject === null) {
    data.push('Some Error Occurred');
    code = 500;
  } else if (errorObject.name === 'MongoError') {
    if (errorObject.code === 11000 || errorObject.code === 11001) {
      var strObj = errorObject.message.split(/[\s,:]+/)[5].split('.')[2];
      data.push(strObj.substring(1, strObj.length - 2) + ' already exists');
    } else {
      data.push(errorObject.message);
    }
    code = 400;
  } else if (errorObject.name === 'ValidationError') {
    var errors = errorObject.errors;
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        var value = errors[key];
        if (value.kind === 'required') {
          data.push(value.path + ' is required');
        } else if (value.kind === 'user defined') {
          data.push(value.message);
        } else if (value.kind === 'enum') {
          data.push('\'' + value.value + '\' is invalid value for ' +
                    value.path);
        } else if (value.kind === 'regexp') {
          data.push(value.path + ' is invalid');
        } else if (value.kind === 'max') {
          data.push('\'' + value.value +
            '\' is more than the maximum value for ' + value.path);
        } else if (value.kind === 'min') {
          data.push('\'' + value.value +
            '\' is less than the minimum value for ' + value.path);
        } else if (value.name === 'CastError') {
          data.push(value.path + ' is an invalid ' + value.kind);
        } else {
          data.push(value.message);
        }
        code = 400;
      }
    }
  } else if (errorObject.name === 'CastError') {
    data.push(errorObject.path + ' is an invalid ' + errorObject.kind);
    code = 400;
  } else if (errorObject.name === 'CustomError') {
    data.push(errorObject.message);
    code = errorObject.code;
  } else if (errorObject instanceof Error) {
    data.push(errorObject.message);
    code = 400;
  } else {
    data.push(errorObject);
    code = 500;
  }
  return {data: data, code: code};
}

router.post('/users', function(req, res) {
  provider.User.register(req.body.name, req.body.email, req.body.password)
  .then(function(data) {
    res.status(201).json(data);
  })
  .catch(function(err) {
    var responseObj = mongoError(err);
    res.status(responseObj.code).json(responseObj.data);
  });
});

router.post('/users/login', function(req, res) {
  provider.User.login(req.body.email, req.body.password)
  .then(function(data) {
    res.status(200).json(data);
  })
  .catch(function(err) {
    var responseObj = mongoError(err);
    console.log(responseObj);
    res.status(responseObj.code).json(responseObj.data);
  });
});

module.exports = router;
