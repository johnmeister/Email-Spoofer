var express = require('express');
var router = express.Router();

var sendEmail = require('../server/sendEmail')
var csrf = require('../server/csrf')

router
  .get('/', csrf.getToken, (req, res, next) => {
    res.render('index', {
      csrf: res.locals.token
    });
  })

  .post('/', csrf.validateToken, sendEmail, (req, res, next) => {
    res.redirect('/')
  })

module.exports = router;