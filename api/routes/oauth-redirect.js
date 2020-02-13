const express = require('express');
const { FusionAuthClient } = require('@fusionauth/node-client');

const router = express.Router();

const clientID = '656c1aaf-bf79-4538-bc36-854aace7de58';
const clientSecret = 'N_TzjajitNdQNrjqtITAzuKOBk5zT5M08eDLGpPsBGk';
const redirectURI = 'http://localhost:3000/oauth-redirect';
const client = new FusionAuthClient(clientID, 'http://localhost:9011');

router.get('/', function(req, res, next) {
	/*
		Hanging on exchangeOAuthCodeForAccessToken...
	*/
	client.exchangeOAuthCodeForAccessToken(req.query.code, clientID, clientSecret, redirectURI)
		.then((response) => {
			return client.retrieveUserUsingJWT(response.successResponse.access_token);
		})
		.then((response) => {
			req.session.user = response.successResponse.user;
		})
		.then(() => {
			res.redirect(302, '/');
		});
});

module.exports = router;
