/**
 * Catalogs Page
 */

var express = require("express");
var app = express();
var database = require("../database");
var sql = 'select name, id from catalog order by  name;';

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/catalogs', function(req, res) {
	database.connectDB(sql, database.databasePool, function(err, rows) {
		//console.log(JSON.stringify(rows));
		if(req.session.user != null) {
			res.render('catalogList', {json: rows});
		} else {
			res.render('../login/restricted');
		}
	});
});

module.exports = app;