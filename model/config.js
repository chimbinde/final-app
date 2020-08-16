//const post = require('./../model/Usuario');

class Config {

    constructor() {
    }
    getURL() {
        return "http://localhost:3000/";
    }
}
const config = new Config();
module.exports = config;