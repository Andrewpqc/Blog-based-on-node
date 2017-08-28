var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
	var username=req.session.username;
	User.findOne({nickname:username},function(err,doc){
		if(err){
			console.log(err.message);
			return;
		}else{
			res.render('index',{title:"Express",current_user:{nickname:doc.nickname}})
		}
	})
});

module.exports = router;
