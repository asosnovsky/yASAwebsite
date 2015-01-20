var express = require('express')
	, morgan = require('morgan')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, app = express()
	, port = process.env.PORT || 3000
	, router = express.Router();

app.use(express.static(__dirname + '/dist')); // set the static files location for the static html
app.use(express.static(__dirname + '/dist/views'));
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT

app.get('*',function(req,res,next){
	if(req.headers['x-forwarded-proto']!='https'){
		res.redirect('http://api.tumblr.com'+req.url);
	}else{
		next() /* Continue to other routes if we're not redirecting */
	}
});

router.get('/', function(req, res, next) {
	res.render('index.html');
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port);