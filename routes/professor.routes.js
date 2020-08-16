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
router.get('/meus_exames',(req,res)=>{
    res.render("professor/meus_exames");
 // res.send("Teste de routas admin");
});
router.get('/questoes',(req,res)=>{
  res.render("professor/perguntas");
// res.send("Teste de routas admin");
});
router.get('/minhas_disciplinas',(req,res)=>{
  res.render("professor/minhas_disciplinas");
// res.send("Teste de routas admin");
});


 module.exports = router;