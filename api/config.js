const dotenv = require('dotenv');
dotenv.config();

module.exports = class Config {
    constructor() {
        this.PORT = process.env.PORT;
        this.HOST = process.env.HOST;
        this.USER = process.env.USER;
        this.PASSWORD = process.env.PASSWORD;
        this.DATABASE = process.env.DATABASE;
        this.SECRET = process.env.SECRET;
        this.EXPIRESIN = process.env.EXPIRESIN;
    }
    getConfig( param ){
        switch ( param ){
            case 'PORT': return this.PORT;
            case 'CONNECTION': return {
                host: this.HOST,
                user: this.USER,
                password: this.PASSWORD,
                database: this.DATABASE
            };
            case 'AUTH': return {
                secret: this.SECRET,
                expiresIn: this.EXPIRESIN,
            };
        }
    }
}
