// Import
import {Controller} from 'microscope-web';
import passport from 'passport';
import User from '../models/User';

var authenticate = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/auth/login'
});

// Authentication controller
class AuthController extends Controller {

	get baseUrl() {
		return '/auth';
	}

	get routes() {
		return {
			'get /login': 'login',
			'get /logout': 'logout',
			'get /register': 'register',
			'get /settings': 'settings',
			'post /update': 'update',
			'post /signin': [authenticate],
			'post /signup': 'signup'
		}
	}

	// login action
	// GET /auth/login
	login(request, response) {
		response.render('auth/login');
	}
	
	// login action
	// GET /auth/login
	logout(request, response) {
		request.logout();
		response.redirect('/');
	}

	// register action
	// GET /auth/register
	register(request, response) {
		response.render('auth/register');
	}

	settings(request, response) {
		response.render('auth/settings');
	}

	update(request, response) {
		User.findOne({ username: request.user.username }, (err, user) => {
			if (err) {
				response.send(err);
			} else {
				user.password = request.body.password;
				user.email = request.body.email;
				user.save((err) => {
					if (err) {
						response.send(err);
					}
					response.redirect('/');
				});
			}
		});
	}

	// signin action
	// GET /auth/signin
	signin(request, response) {
		response.send('authentication controller');
	}
	
	// signup action
	// GET /auth/signup
	signup(request, response) {
		let user = new User({
			username: request.body.username,
			email: request.body.email,
			password: request.body.password,
			provider: 'local'
		});

		user.save((err) => {
			if (err) {
				response.send(err.errmsg);
			} else {
				response.redirect('/auth/login');
			}
		});
	}
}

export default AuthController;