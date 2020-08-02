
var http = require('http');
class Aluno {
    urll = "";
    aluno_dado = null;
    constructor() {
        this.urll = "http://localhost:3000/";
    }

    getAll() {
      
        var fs = require('fs');
        let rawdata = fs.readFileSync('model/dbuser.json');
        let dado = JSON.parse(rawdata);
        return dado; 
    }
    editar1(aluno1, result) {
        var Request = require("request");

        Request.get("http://localhost:3000/pessoa", (error, response, body) => {
            if (error) {
                return console.log(error);
            }
           // console.dir(JSON.parse(body));
            console.log(JSON.parse(body));
        });

        //  const response = await client.get('http://localhost:3000/pessoa');

    }
    editar(aluno1, result) {

        var Client = require('node-rest-client').Client;

        var client = new Client();
        // registering remote methods
        client.registerMethod("jsonMethod", this.urll + "pessoa/" + aluno1.idpessoa, "GET");

        var req = client.methods.jsonMethod(function (data, response) {

            console.log(data);
            // raw response
            console.log(response);
            // return data;
        });

        // console.log(this.aluno_dado);

        return "<h1>(faisca)</h1>" + req.body;
    }

}
const aluno = new Aluno();
module.exports = aluno;