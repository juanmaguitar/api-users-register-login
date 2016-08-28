const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userDef = {
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false }
};

const UserSchema = new Schema(userDef);

UserSchema.pre('save', (next) => {
  const user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = (password) => {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = UserSchema;
