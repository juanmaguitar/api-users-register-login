const express = require('express');

const addUser = require('./handlers/addUser.js')
const getAll = require('./handlers/getAll.js')

const getPerId = require('./handlers/getPerId.js')
const updatePerId = require('./handlers/updatePerId.js')
const deletePerId = require('./handlers/deletePerId.js')

let router = express.Router();

router.use( (req, res, next) => {
	console.log('Somebody just came to our app!');
	next();
});

router.route('/users')
	.post( addUser )
	.get( getAll )

router.route('/users/:user_id')
	.get( getPerId )
	.put( updatePerId )
	.delete( deletePerId )

module.exports = router;