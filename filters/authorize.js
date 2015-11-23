// authorize  filter
export function authorize(req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/auth/login');
	}
};