//carregando modulos para usar
const express = require("express");
const path = require("path"); 
// configuracao para o formulario
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

//var cors = require('cors');
const app = express();

//app.use(cors());


//criacao de routas
const admin = require('./routes/admin.routes');
const aluno = require('./routes/aluno.routes');
const professor = require('./routes/professor.routes');
const pessoa = require('./routes/pessoa.routes');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
require('./config/auth')(passport);
//========================================================
app.use(session({
  secret:"trabalhomaster",
  resave:true,
  saveUninitialized:true
}));
//configuracao da sessao
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());
//criacao de um midleware
app.use((req,res,next)=>{
  console.log("midle em acao..");

  res.locals.success_msg=req.flash("success_msg");
  res.locals.error_msg=req.flash("error_msg");
  res.locals.error=req.flash('error');
   //res.locals.sms="bbbbb";
   res.locals.user=req.user||null;
 
  next(); 
}); 

//configuracao de bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars'); 


app.use('/admin',admin);
app.use('/aluno',aluno);
app.use('/professor',professor);
app.use('/pessoa',pessoa);

//public folder config
app.use(express.static(path.join(__dirname,"public")));


//rotas nativas
app.get("/",function(req,res){
    res.render('index');
   // res.send("Pagina Inicial");
});
app.get("/inicio",function(req,res){
  res.render('index');
 // res.send("Pagina Inicial");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log("servidor rodando:port:"+PORT);
}); 