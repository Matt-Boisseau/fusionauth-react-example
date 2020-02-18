/*
NOTE: to send cookies with fetch:

1. set credentials to 'include' in the fetch params
2. require the 'cors' node module
3. set origin and credentials to true in the cors params

React:

fetch(path-back-to-express-server, {
	credentials: 'include'
});

Express:

const cors = require('cors');
app.use(cors({
	origin: true,
	credentials: true
}));

is configuring express-session necessary?
here's what the settings were when it worked:

app.use(expressSession({
	name: 'fusionauth-node-example',
	secret: 'fusionauth-node-example',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: "auto", httpOnly: true, maxAge: 3600000 },
	store: new RedisStore({ client: redisClient }) 
}));
*/

var cookieParser = require('cookie-parser');
var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var expressSession = require('express-session');
var logger = require('morgan');
var path = require('path');

var indexRouter = require('./routes/index');
var oauthRedirectRouter = require('./routes/oauth-redirect');
var profileRouter = require('./routes/profile');
var usersRouter = require('./routes/users');

var app = express();

const redis = require('redis');
let RedisStore = require('connect-redis')(expressSession);
let redisClient = redis.createClient();

// view engine setup
//TODO: replace with react pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(cors({
	origin: true,
	credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
	name: 'fusionauth-node-example',
	secret: 'fusionauth-node-example',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: "auto", httpOnly: true, maxAge: 3600000 },
	store: new RedisStore({ client: redisClient }) 
}));
app.use(logger('dev'));

// app.use('/', indexRouter);
// app.use('/oauth-redirect', oauthRedirectRouter);
// app.use('/profile', profileRouter);
// app.use('/users', usersRouter);

//////////////

const { FusionAuthClient } = require('@fusionauth/node-client');
const clientID = '5603c20d-3e32-4971-b7eb-8e9f023fc524';
const clientSecret = 'viCMOPW73hlUVyE4ja_sOdL5rGEU4GuVFY_yuy8rJ7A';
const redirectURI = 'http://localhost:9000/oauth-redirect';
const client = new FusionAuthClient(clientID, 'http://localhost:9011');

app.use('/oauth-redirect', function(req, res) {
	client.exchangeOAuthCodeForAccessToken(req.query.code, clientID, clientSecret, redirectURI)
		.then((response) => {
			return client.retrieveUserUsingJWT(response.successResponse.access_token);
		})
		.then((response) => {
			req.session.user = response.successResponse.user;
			// req.session.save();
			debugger;
			res.redirect('/middle-check');
		})
		.catch((e) => {
			console.error(e);
		});
});

app.use('/middle-check', (req, res) => {
	debugger;
	res.redirect('http://localhost:3000');
});

app.use('/profile', function(req, res) {
	
	// req.session.reload();
	if (req.session.user != null) {
		res.send('logged in!');
	}
	else {
		res.send('u logged out');
	}
	debugger;
});

////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
