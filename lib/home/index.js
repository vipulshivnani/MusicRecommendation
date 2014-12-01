/**
 * Home Page
 */
var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/home', function(req, res) {
	if(req.session.user != null) {
		res.render('home');
	} else {
		res.render('../login/restricted');
	}	
});

module.exports = app;
