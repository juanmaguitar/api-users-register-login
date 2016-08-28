const User = process.getModel('user');

function deletePerId(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) return res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
}

export default deletePerId;