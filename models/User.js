import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var SALT_WORK_FACTOR = 10;

var User = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true },
    provider: String
});

User.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('User', User);