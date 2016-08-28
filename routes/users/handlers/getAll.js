const User = process.getModel('user');

function getAll(req, res) {
		User.find(function(err, users) {
			if (err) return res.send(err);

			// return the users
			res.json(users);
		});
	}

module.exports = getAll;