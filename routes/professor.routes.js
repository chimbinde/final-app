const express = require("express");
const router = express.Router();
//const dados = require('./../model/Data'); 
//const bcrypt = require("bcryptjs");
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',(req,res)=>{
     res.render("professor/index");
    // res.send("Teste de routas admin");
 });
 router.get('/cadastro',(req,res)=>{
  //  res.render("admin/inicio");
  res.send("Teste de routas admin");
});


 module.exports = router;