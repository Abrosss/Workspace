exports.isUser = function(req, res, next){
    if(req.isAuthenticated()){
        next()
    } else {
        req.flash('danger', 'Please log in')
        res.redirect('/login')
    }
}
exports.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && res.locals.user.admin==true){
        next()
    } else {
        req.flash('danger', 'access denied')
        res.redirect('/')
    }
}