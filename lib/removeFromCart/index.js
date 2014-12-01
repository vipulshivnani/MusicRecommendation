/**
 * Remove from cart page
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/removeFromCart/:number', function(req, res) {
	if (req.session.user != null) {
		//req.params.number is Product Number, req.session.user is userID
		sql = 'delete from shopping_cart where user_id = ' + req.session.user + ' and product_id = ' + req.params.number;
		database.connectDB(sql, database.databasePool, function(err, rows) {
			if(err || rows == null) {
				throw err;
			} else {
				res.render('removeFromCart');
			}
		});
	} else {
		res.render('../login/restricted');
	}
});

module.exports = app;