/**
 * Signup Page
 */
var express = require("express");
var app = express();
var database = require("../database");
var sql = '';
var newUserId = 0;

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/signup', function(req, res) {
	res.render('signupForm');
});

app.post('/signup', function(req, res) {
	//get req.param('Username') and req.param('Password') from form data
	//Get Existing Last ID:
	sql = 'select max(id)+1 as newId from users';
	database.connectDB(sql, database.databasePool, function(err, rows) {
		newUserId = rows[0].newId;
		sql = 'insert into users values (' + newUserId + ', \'' + req.param('First Name') + '\', \'' + req.param('Last Name') + '\', \'' + req.param('Email') + '\', \'' + req.param('Password') + '\', current_timestamp\(\), null\)';  
		database.connectDB(sql, database.databasePool, function(err, rows) {
			if(err || rows == null) {
				res.render('signupError', {pageData: {
					"Email": req.param('Email'),
					"Password": req.param('Password')}
				});
			} else {
				req.session.user = newUserId;
				res.render('newUserWelcome', {pageData: {
					"Email": req.param('Email'),
					"Password": req.param('Password')}
				});
			}
		});
	});
});

module.exports = app;