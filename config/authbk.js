const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs")

const post = require('./../model/Usuario');
module.exports= function(passport){
    passport.use(new localStrategy({usernameField:'email',passwordField:"senha"},(email, senha,done)=>{
        var usuario = post.findEmail(email);
    console.log("0");
        if(usuario==0){
            console.log("-1");
            return done(null,false,{message:"Esta conta nao existe"})
           
        }else {
            console.log("1");
            bcrypt.compare(senha,usuario.senha,(erro,batem)=>{
               console.log("2"+usuario.email+'*'+batem);
               if(batem){
                   console.log(usuario);
                   console.log(usuario.key);

                   return done(null,usuario);
               } else{
                
                   return done(null, false,{message:"SENHA E NOME DE USUARIO ERRADAS"});
               }
            });
        }

    }));
   
    passport.serializeUser((usuario,done)=>{
        done(null, usuario.key);
    });
    passport.deserializeUser((id,done)=>{
       let usuario = post.findId(id);
       done(null,usuario);
    });
   
}