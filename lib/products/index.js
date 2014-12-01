/**
 * Products page
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = 'select catalog.name as catalog_name, product.name as product_name, product.description as product_description, product.price as product_price, product.quantity as product_quantity, product.id as product_id from catalog, product, catalog_product where catalog.id= catalog_product.catalog_id and catalog_product.product_id = product.id order by catalog.name, product.name';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/products', function(req, res) {
	database.connectDB(sql, database.databasePool, function(err, rows) {
		//console.log(JSON.stringify(rows));
//		if (req.session.user != null) {
			res.render('productList', {
				json : rows
			});
//		} else {
//			res.render('../login/restricted');
//		}
	});
});

module.exports = app;