/**
 * Market place Main application file
 */

var express = require("express"),
	app = express();

//Define routing variables
var login = require("./lib/login"),
	signup = require("./lib/signup"),
	database = require("./lib/database"),
	catalogs = require("./lib/catalogs"),
	products  = require("./lib/products"),
	catalogID = require("./lib/catalogID"),
	logout = require("./lib/logout"),
	addToCart = require("./lib/addToCart"),
	showCart = require("./lib/showCart"),
	removeFromCart = require("./lib/removeFromCart"),
	checkout = require("./lib/checkout"),
	//userPurchases = require("./lib/userPurchases"),
	home = require("./lib/home"),
	addCatalog = require("./lib/addCatalog"),
	euc=require("./lib/euc"),
	loglikely= require("./lib/loglikely");
	//addProduct = require("./lib/addProduct"),
//	removeCatalog = require("./lib/removeCatalog");
	//removeProduct = require("./lib/removeProduct");

//App configruation, environment configuration
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


//Make Routing variables available to webserver for redirection
app.use(login);
app.use(signup);
app.use(database);
app.use(catalogs);
app.use(products);
app.use(catalogID);
app.use(logout);
app.use(addToCart);
app.use(showCart);
app.use(removeFromCart);
app.use(checkout);
//app.use(userPurchases);
app.use(home);
app.use(addCatalog);
app.use(loglikely);
app.use(euc);
//app.use(addProduct);
//app.use(removeCatalog);
//app.use(removeProduct);

app.locals.updateRecommend = function(){
	var express = require("express");
	var app = express();
	database = require("./lib/database");
	var sql = '';
	var selectedVal='';
	var updateRecommend= function() {
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
}

//Redirect Default Page to Login Page
app.get('/', function(req, res) {
	res.redirect('/login');
});

//Start webserver
app.listen(3030);
console.log("listening on 3030..");