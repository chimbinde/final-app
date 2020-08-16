const express = require("express");
const router = express.Router();
//===============
var dados = require('./../model/Usuario'); 
//==========================
const bcrypt = require("bcryptjs");
const {eAdmin} = require("../helpers/eAdmin");
const {is_pessoa} = require("../helpers/is_pessoa");

const passport = require("passport");

router.get('/',(req,res)=>{
    // res.render("admin/index");
     res.send("Teste de routas admin entrou");
 });
 router.get('/loginpage',(req,res)=>{
     res.render("login");
 });

 router.get('/teste',(req,res)=>{
    // res.render("admin/index");
    //var usuario = post.findEmail(email);
    var usuario = dados.listar();
    
    
     res.send("off"+usuario);
 });
 router.get('/teste1',(req,res)=>{
    //res.render("pessoa/login");

    res.send("bem feito...");
});
router.get('/login',(req,res)=>{
    res.render("pessoa/login");
});
//router.get('/info',eAdmin,(req,res)=>{
router.get('/info',is_pessoa,(req,res)=>{
    res.render("pessoa/info");
});
router.get('/logout',(req,res)=>{
   // res.render("usuario/login");
   req.logout();
   req.flash("success_msg","SAIU COM SUCESSO");
   res.redirect("/");
});
router.post("/login",(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/pessoa/loginpage",
        failureFlash: true
    })(req,res,next);
    //res.render("usuario/login");
});



 module.exports = router;