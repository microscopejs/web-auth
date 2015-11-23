// Import
import {Controller} from 'microscope-web';

class AuthController extends Controller {

	get baseUrl() {
		return '/auth';
	}

	get routes() {
		return {
			'get /login': ['login'],
			'get /register': ['register'],
			'post /signin': ['signin'],
			'post /signup': ['signup']
		}
	}

	// login action
	// GET /auth/login
	login(request, response) {
		response.render('auth/login');
	}

	// register action
	// GET /auth/register
	register(request, response) {
		response.render('auth/register');
	}

	// signin action
	// GET /auth/signin
	signin(request, response){
		response.send('authentication controller');
	}
	
	// signup action
	// GET /auth/signup
	signup(request, response){
		response.send('authentication controller');
	}
}

export default AuthController;