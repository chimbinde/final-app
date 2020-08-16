module.exports={
    is_pessoa: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg","Sem permissão para acessar essa página");
        res.redirect("/");
    }
}