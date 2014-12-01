/**
 * Catalog ID page. Browse all products in a catalog
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/catalogID/:id', function(req, res) {
	sql = 'select catalog.name as catalog_name, product.name as product_name, product.description as product_description, product.price as product_price, product.quantity as product_quantity, product.id as product_id from catalog, product, catalog_product where catalog.id= catalog_product.catalog_id and catalog_product.product_id = product.id and catalog.id = ' + req.params.id + ' order by catalog.name, product.name';
	database.connectDB(sql, database.databasePool, function(err, rows) {
		//console.log(JSON.stringify(rows));
		if(req.session.user != null) {
			res.render('catalogID', {json: rows});
		} else {
			res.render('../login/restricted');
		}
	});
});

module.exports = app;