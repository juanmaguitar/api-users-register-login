const User = process.getModel('user');

function getPerId(req, res) {
  const userId = req.params.user_id;
  User.findById(userId, (err, user) => {
    if (err) return res.send(err);
    res.json(user);
  });
}

export default getPerId;