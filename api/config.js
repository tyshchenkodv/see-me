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
        this.FRONTHOST = process.env.FRONTHOST;
        this.GMAIL_USER = process.env.GMAIL;
        this.GMAIL_PASSWORD = process.env.GMAILPASSWORD;
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
            case 'NODE_HOST': return this.HOST + ':' + this.PORT;
            case 'FRONT_HOST': return this.FRONTHOST;
            case 'MAILER_USER': return {
                user: this.GMAIL_USER,
                pass: this.GMAIL_PASSWORD,
            };
            case 'AUTH': return {
                secret: this.SECRET,
                expiresIn: this.EXPIRESIN,
            };
        }
    }
}
