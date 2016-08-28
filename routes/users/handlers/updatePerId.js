const User = process.getModel('user');

function updatePerId(req, res) {
  User.findById(req.params.user_id, function(err, user) {

    if (err) return res.send(err);

    // set the new user information if it exists in the request
    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;

    // save the user
    user.save(function(err) {
      if (err) return res.send(err);

      // return a message
      res.json({ message: 'User updated!' });
    });

  });
}

module.exports = updatePerId;