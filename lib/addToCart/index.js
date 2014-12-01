/**
 * Add to Cart page
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/addToCart/:number', function(req, res) {
	if (req.session.user != null) {
		//req.params.number is Product Number, req.session.user is userID
		sql = 'insert into shopping_cart values (' + req.session.user + ', ' + req.params.number + ')';
		database.connectDB(sql, database.databasePool, function(err, rows) {
			if(err) {
				throw err;
			} else {
				res.render('addToCart');
			}
		});
	} else {
		res.render('../login/restricted');
	}
});

module.exports = app;