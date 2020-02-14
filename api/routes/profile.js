var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	// debugger;
	// req.session.reload();
	debugger;
	if (req.session.user != null) {
		res.send('logged in!');
	}
	else {
		res.send('u logged out');
	}
});

module.exports = router;
