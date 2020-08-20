const express = require("express");
const router = express.Router();
//const dados = require('./../model/Data'); 
const bcrypt = require("bcryptjs");
const {eAdmin} = require("../helpers/eAdmin");
const {is_pessoa} = require("../helpers/is_pessoa");
const {is_aluno} = require("../helpers/is_aluno");
const {is_professor} = require("../helpers/is_professor");
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',is_professor,(req,res)=>{
     res.render("professor/index");
    // res.send("Teste de routas admin");
 });
 router.get('/cadastro',(req,res)=>{
  //  res.render("admin/inicio");
  res.send("Teste de routas admin");
});
router.get('/meus_exames',is_professor,(req,res)=>{
    res.render("professor/meus_exames");
 // res.send("Teste de routas admin");
});
router.get('/questoes',is_professor,(req,res)=>{
  res.render("professor/perguntas");
// res.send("Teste de routas admin");
});
router.get('/minhas_disciplinas',is_professor,(req,res)=>{
  res.render("professor/minhas_disciplinas");
// res.send("Teste de routas admin");
});


 module.exports = router;