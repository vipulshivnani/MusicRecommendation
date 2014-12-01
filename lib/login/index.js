/**
 * Login Page
 */
var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/login', function(req, res) {
	res.render('loginForm');
});

app.post('/login', function(req, res) {
	//get req.param('Username') and req.param('Password') from form data
/*	req.session.user = 'aneri';
	console.log(JSON.stringify(req.session));*/
	if(req.param('Username') && req.param('Password')) {
		sql = 'select id, email, last_login from users where email=\'' + req.param('Username') + '\' and password=\'' + req.param('Password') + '\'';
		//console.log("sql = " + sql);
		database.connectDB(sql, database.databasePool, function(err, rows) {
			if(err || rows.rows == 0) {
				res.render('loginError');
			} else {
				req.session.user = rows[0]["id"];
				var lastLogin = rows[0]["last_login"];
				sql = 'update users set last_login = current_timestamp\(\) where id = ' + req.session.user;
				database.connectDB(sql, database.databasePool, function(err, rows) {
					if(err) {
						res.render('loginError');
					} else {
						res.render('welcome', {pageData: {
							"Username": req.param('Username'),
							"LastLogin": lastLogin }
						});
					}
				});
			}
		});
	} else {
		res.render('loginError');
	}
});

module.exports = app;
