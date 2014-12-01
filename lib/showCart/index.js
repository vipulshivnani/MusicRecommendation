/**
 * Show cart summary
 */
var express = require("express");
var app = express();
var database = require("../database");
var sql = '';
var sql1='';
var first_query='';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/showCart', function(req, res) {
	if(req.session.user != null) {
	sql = 'select product.name as product_name, product.description as product_description, product.price as product_price, product.quantity as product_quantity, product.id as product_id from product where product.id in \(select product_id from shopping_cart where user_id = ' + req.session.user + '\)';
//	sql='select recommendation.userId as userId, recommendation.itemid as itemId, recommendation.recommendation as recommendation from recommendation' ;
		database.connectDB(sql, database.databasePool, function(err, rows) {
			 first_query=rows;
			 console.log(first_query);
			//console.log(rows.rows); comes to be 0 for now rows returned
			if(err || rows.rows == 0) {
				res.render('noCart');
			} else {
				
				sql1 = 'select recommendation.userId as userId, recommendation.itemid as itemId, recommendation.recommendation as recommendation from recommendation' ;
				//sql1='select product.name as product_name, product.description as product_description, product.price as product_price, product.quantity as product_quantity, product.id as product_id from product where product.id in \(select product_id from shopping_cart where user_id = ' + req.session.user + '\)';
				database.connectDB(sql1, database.databasePool, function(err2, rows2){
					console.log(rows2);
				res.render('showCart', {'json1' : first_query, 'json2':rows2	});
				});
			}	
			
		});
	} else {
		res.render('../login/restricted');
	}
});

module.exports = app;