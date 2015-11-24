// Imports
import {HttpApplication} from 'microscope-web';
import HomeController from './controllers/HomeController';
import AuthController from './controllers/AuthController';
import {commons, engine} from './middlewares/commons';
import {authentication} from './middlewares/authentication';

class Application extends HttpApplication {
	
	get configurations(){
		return {
			'view engine': 'html',
			'view cache': false,
			'views':  __dirname + '/views'
		};
	}
	
	get middlewares(){
		return [commons, engine, authentication];
	}

	get controllers(){
		return [HomeController, AuthController];
	}
}

export default Application;