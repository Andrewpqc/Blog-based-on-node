var express = require('express');
//这里multer是用来处理图片上传的
var multer = require('multer');
var crypto = require('crypto');
var upload = multer();
var config = require('../config/config.js');
var router = express.Router();

//导入User model
var mongoose = require('mongoose');
var User = mongoose.model("User");

/* 返回登录和注册表单. */
router.get('/sign-in-sign-up.html', function(req, res, next) {
  res.render("sign-in-sign-up");
});

/*检查注册时用户名是否被占用*/
router.get('/is_nickname_occupy.html', function(req, res, next) {
  var username = req.query.nickname_r;
  User.findOne({
    nickname: username
  }, function(err, doc) {
    if (err) {
      cosole.log(err.message);
      return
    }
    if (doc) {
      res.json(false);
    } else {
      res.json(true)
    }
  })
});

/*检查邮箱是否已被注册*/
router.get('/is_email_occupy.html', function(req, res, next) {
  var email = req.query.email;
  User.findOne({
    email: email
  }, function(err, doc) {
    if (err) {
      cosole.log(err.message);
      return
    }
    if (doc) {
      res.json(false);
    } else {
      res.json(true)
    }
  })
});


/*注册用户*/
router.post('/sign-up.html', function(req, res, next) {
  var hashPwd = config.makeHash(req.body.password1);
  var user = new User({
    nickname: req.body.nickname_r,
    password: hashPwd,
    email: req.body.email
  });
  user.save(function(err) {
    if (err) {
      console.log(err.message);
      return;
    }
    res.json(true)
  });
});

/*检查登录时是否已经注册*/
router.get('/is_right.html', function(req, res, next) {
  var emailOrusername = req.query.email;
  var hashPwd = config.makeHash(req.query.password);
  if ((-1 !== emailOrusername.indexOf('@')) && (-1 !== emailOrusername.indexOf('.com'))) {
    var condition = {
      $and: [{
        email: emailOrusername
      }, {
        password: hashPwd
      }]
    }
  } else {
    var condition = {
      $and: [{
        nickname: emailOrusername
      }, {
        password: hashPwd
      }]
    }
  }
  User.findOne(condition, function(err, doc) {
    if (err) {
      console.log(err.message);
      return
    }
    if (doc) {
      res.json(true)
    } else {
      res.json(false)
    }

  })
});

/*登录用户，保存session*/
router.post('/sign-in.html', function(req, res, next) {
  var emailOrusername = req.body.email_l;
  if ((-1 !== emailOrusername.indexOf('@')) && (-1 !== emailOrusername.indexOf('.com'))) {
    User.findOne({email:emailOrusername}, function(err, doc) {
      req.session.username = doc.nickname;
    })
  } else {
    req.session.username = emailOrusername
  }
  req.session.is_login = true;
  if (req.body.is_check == "on") {
    var delteTime = 3600000 * 24 * 14; //两周的时间
    req.session.cookie.expires = new Date(Date.now() + delteTime);
  }
  res.json(true)
});


module.exports = router;