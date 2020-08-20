module.exports={
    is_aluno: function(req,res,next){
        if(req.isAuthenticated()&& req.user.admin==1){
            return next();
        }
        req.flash("error_msg","Sem permissão para acessar essa página");
        res.redirect("/");
    }
}