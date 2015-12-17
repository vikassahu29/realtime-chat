var express = require('express');
var router = express.Router();
var provider = require('../providers');

router.post('/users', function(req, res) {
  provider.User.register(req.body.name, req.body.email, req.body.password)
  .then(function(data) {
    res.status(201).json(data);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

router.post('/users/login', function(req, res) {
  provider.User.login(req.body.email, req.body.password)
  .then(function(data) {
    res.status(200).json(data);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

module.exports = router;
