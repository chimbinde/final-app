const express = require("express");
const router = express.Router();
//const dados = require('./../model/Data'); 
//const bcrypt = require("bcryptjs");
//const {eAdmin} = require("../helpers/eAdmin");
const aluno= require('./../model/aluno.model');

router.get('/',(req,res)=>{
     res.render("aluno/index");

 });
 router.get('/cadastro',(req,res)=>{
    res.render("aluno/cadastro");
   // atualizacao_aluno
});
router.get('/pag_disciplinas',(req,res)=>{
   res.render("aluno/disciplinas");
  // atualizacao_aluno
});
router.get('/pag_avaliacao',(req,res)=>{
   res.render("aluno/avaliacao");
  // atualizacao_aluno
});
router.get('/resumo_avaliacao',(req,res)=>{
   res.render("aluno/resumo_avaliacao");
  // atualizacao_aluno
});
///aluno/resumo-avaliacao
router.post('/atualizacao',(req,res)=>{
    //res.render("aluno/cadastro");
   // atualizacao_aluno
 //  console.log(aluno.editar(req.body));
 var valor;
    console.log(aluno.editar(req.body, valor));
   //res.render("aluno/cadastro");
});
 module.exports = router;