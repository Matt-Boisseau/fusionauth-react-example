const express = require('express');
const router = express.Router();

const { FusionAuthClient } = require('@fusionauth/node-client');
const clientID = '5603c20d-3e32-4971-b7eb-8e9f023fc524';
const clientSecret = 'viCMOPW73hlUVyE4ja_sOdL5rGEU4GuVFY_yuy8rJ7A';
const redirectURI = 'http://localhost:9000/oauth-redirect';
const client = new FusionAuthClient(clientID, 'http://localhost:9011');

router.get('/', function(req, res) {
	client.exchangeOAuthCodeForAccessToken(req.query.code, clientID, clientSecret, redirectURI)
		.then((response) => {
			return client.retrieveUserUsingJWT(response.successResponse.access_token);
		})
		.then((response) => {
			debugger;
			req.session.user = response.successResponse.user;
			//req.session.save();
			//res.setCookie('testCookieName', 'testCookieValue');
			console.log(req.cookies);
			debugger;
			//console.log(document.cookie);
			res.redirect(302, 'http://localhost:3000');
		})
		.catch((e) => {
			console.error(e);
		});
});

module.exports = router;
