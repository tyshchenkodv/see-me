const dotenv = require('dotenv');
dotenv.config();

module.exports = class Config {
    constructor() {
        this.PORT = process.env.PORT;
    }
    get getPort(){
        return this.PORT;
    }
}