/**
 * Add Catalog Page
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = '';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/addCatalog', function(req, res) {
	if (req.session.user != null) {
		//req.params.number is Product Number, req.session.user is userID
		sql = 'select admin_flag as admin_flag from users where id = ' + req.session.user;
		database.connectDB(sql, database.databasePool, function(err, rows) {
			if(err) {
				throw err;
			} else if(rows[0]["admin_flag"] == 1){
				res.render('addCatalog');
			} else {
				res.render('adminRestricted');
			}
		});
	} else {
		res.render('../login/restricted');
	}
});

app.post('/addCatalog', function(req, res) {
	sql = 'select max(id)+1 as newId from catalog';
	database.connectDB(sql, database.databasePool, function(err, rows) {
		newCatalogId = rows[0].newId;
		if(err || rows == null) {
			throw err;
		} else {
			sql = 'insert into catalog values \(' + newCatalogId + ', \'' + req.param('Catalog Name') + '\'\)';
			database.connectDB(sql, database.databasePool, function(err, rows) {
				if(err || rows == null) {
					throw err;
				} else {
					res.render('addedCatalog', {pageData: {
						"CatalogName": req.param('Catalog Name')
					}});
				}
			});
		}
	});
});
app.locals.updateRecommend= function()
{
	
		sql='';
		console.log("hi");
		if (req.session.user != null) {
			var x = document.getElementsByName("recommendation_filter");
			var i;
			for (i = 0; i < x.length; i++) {
			    if(x[i].checked == true){
			    	selectedVal=x[i].value;	
			    }
			}
			sql = 'update rcmndation_type set rcd = ' + selectedVal ;
			database.connectDB(sql, database.databasePool, function(err, rows) {
			});
		} 
	

}
module.exports = app;