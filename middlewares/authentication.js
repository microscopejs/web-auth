import passport from 'passport';
import {Strategy} from 'passport-local';
import session from 'express-session';
import User from '../models/User';

// Use local strategy
passport.use(new Strategy(
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			return user.comparePassword(password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Incorrect password.' });
				}
			});
		});
	}
));

// serialize user
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// deserialize user
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

// register middlewares 
export function authentication(app) {
	app.use(session({ secret: 'microscopejs', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(function (req, res, next) {
		res.locals.user = req.user;
		next();
	});
}