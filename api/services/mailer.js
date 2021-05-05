const nodemailer = require('nodemailer');

module.exports = class Mailer {
    constructor({ env, notFoundException }) {
        this.auth = {
            user: env.get('GMAIL_USER'),
            pass: env.get('GMAIL_PASSWORD'),
        };
        this.notFoundException = notFoundException;
    }

    async send (to, subject, message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: this.auth,
        });

        await transporter.sendMail({
            from: '"SEE ME"',
            to: to,
            subject: subject,
            html: message
        },(error) => {
            if (error) {
                return this.notFoundException(error);
            }
        });
    }
}
