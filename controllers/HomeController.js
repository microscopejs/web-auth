// Import
import {Controller} from 'microscope-web';

class HomeController extends Controller {
	
	get routes(){
		return {
			'get /': 'index',
			'get /home/about': 'about'
		}
	}

	// index action
	// GET /
	index(request, response){
		response.render('home/index');
	}

	// about action
	// GET /home/about
	about(request, response){
		response.render('home/about');
	}
}

export default HomeController;