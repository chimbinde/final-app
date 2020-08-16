module.exports={
    is_professor: function(req,res,next){
        if(req.isAuthenticated()&& req.user.admin==0){
            return next();
        }
        req.flash("error_msg","Sem permissão para acessar essa página");
        res.redirect("/");
    }
}