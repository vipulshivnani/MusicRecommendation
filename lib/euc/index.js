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

app.get('/euc', function(req, res) {
	if(req.session.user != null) {
	//sql = 'select product.name as product_name, product.description as product_description, product.price as product_price, product.quantity as product_quantity, product.id as product_id from product where product.id in \(select product_id from shopping_cart where user_id = ' + req.session.user + '\)';
sql='select euc.userId as userId, euc.itemid as itemId, euc.recommendation as recommendation from euc' ;
		database.connectDB(sql, database.databasePool, function(err, rows) {
			
			if(err || rows.rows == 0) {
				res.render('norec');
			} else {
				
				res.render('euc', {'json1' :rows	});
		
			}	
			
		});
	} else {
		res.render('../login/restricted');
	}
});

module.exports = app;