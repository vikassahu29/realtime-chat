var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: {unique: true},
    trim: true,
    match: new RegExp('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]' +
            '{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$')
  },
  password: {
    type: String,
    trim: true,
    validate: [/.{6,}/, 'Password should have atleast 6 characters']
  },
  createdAt: {type: Date, required: true},
  updatedAt: {type: Date, required: true}
});

userSchema.pre('validate', function(next) {
  var now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedAt = new Date();
  next();
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.methods.getPayload = function() {
  return {
    email: this.email,
    id: this.id,
    name: this.name
  };
};

var User = mongoose.model('User', userSchema);

module.exports = User;
