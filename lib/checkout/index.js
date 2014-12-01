/**
 * Check out page
 */
var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/checkout', function(req, res) {
	if(req.session.user != null) {
		res.render('checkoutForm');	
	} else {
		res.render('../login/restricted');
	}
});

app.post('/checkout', function(req, res) {
	if(req.session.user != null) {
		if(!req.param('CCNumber') || req.param('CCNumber').length < 16) {
			res.render('checkoutError');
		} else {
			//Reduce quantity of each product by 1.
			//Remove from shopping cart
			//Insert in user purchases
			sql = 'update product set quantity = quantity - 1 where id in \(select product_id from shopping_cart where user_id = ' + req.session.user + '\)';
			database.connectDB(sql, database.databasePool, function(err, rows) {
				if(err || rows == null) {
					throw err;
				} else {
					sql = 'insert into user_purchases select user_id, product_id from shopping_cart where user_id = ' + req.session.user;
					database.connectDB(sql, database.databasePool, function(err, rows) {
						if(err || rows == null) {
							throw err;
						} else {
							sql = 'delete from shopping_cart where user_id = ' + req.session.user;
							database.connectDB(sql, database.databasePool, function(err, rows) {
								if(err || rows == null) {
									throw err;
								} else {
									sql = 'select product.name as product_name, product.description as product_description, product.price as product_price, product.id as product_id from product where product.id in \(select product_id from user_purchases where user_id = ' + req.session.user + '\)';
									database.connectDB(sql, database.databasePool, function(err, rows) {
										if(err || rows == null) {
											throw err;
										} else {
											res.render('checkout', {json: rows});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	} else {
		res.render('../login/restricted');
	}	
});

module.exports = app;