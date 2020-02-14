const express = require('express');
const router = express.Router();

const { FusionAuthClient } = require('@fusionauth/node-client');
const clientID = 'ce8b4b31-f7f9-48d5-bbb1-5ced1720340f';
const clientSecret = 'E3xlYeIBqbDlyVhB3zSwAoHba6T3_u60uL5CtFaJOo4';
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
			req.session.save();
			debugger;
			res.redirect(302, 'http://localhost:3000#test');
		})
		.catch(console.log);
	
});

module.exports = router;
