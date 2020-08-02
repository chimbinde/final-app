
class Usuario {

    constructor() {

    }


    async listar() {

        var Client = require('node-rest-client').Client;
        var client = new Client();

        // registering remote methods
        client.registerMethod("jsonMethod", "http://localhost:3000/" + "pessoa/2", "GET");
       // this.dado=undefined;
        
        let  req =  client.methods.jsonMethod(function (data, response) {
      
          //  console.log(data);
            console.log('1');
          //  this.dado=data;
       //   let dado = JSON.parse(data);
           // return data;

        });
      //  await
        console.log('2');
        
      //  await this.dado;
         var d= "<h1>(faisca)uuuu1</h1>";
        return d;
    }
    getAll() {
        var fs = require('fs');
        let rawdata = fs.readFileSync('model/dbuser.json');
        let dado = JSON.parse(rawdata);
        return dado;
    }

    findEmail(id) {
        let obj = this.getAll();
        for (let index = 0; index < obj.length; index++) {
            if (obj[index].email == id) return obj[index];
        }
        return -1;

    }
    findId(id) {
        let obj = this.getAll();
        for (let index = 0; index < obj.length; index++) {
            if (obj[index].key == id) return obj[index];
        }
        return 0;
    }
    /*
        save(nome, email, senha, admin){
            let obj=this.getAll();
            let key =obj.length-1;
            if(key<0) 
                key =0; 
            else 
                key = obj[key].key+1;
            //console.log(key);
            var json_ ='{"key":'+key+',"nome":"'+nome+'","email":"'+email+'","senha":"'+senha+'", "admin":'+admin+'}';
            let elem = JSON.parse(json_);
            obj.push(elem);
           // console.log(obj);
            var json_1 =JSON.stringify(obj,null,2);
            var fs = require('fs');
            fs.writeFile('data/dbuser.json',json_1,function(){
                console.log('Inserido com sucesso..');
            });
        } */

}
const usuario = new Usuario();
module.exports = usuario;