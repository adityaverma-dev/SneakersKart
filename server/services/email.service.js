const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const registerEmail = async (useremail, user) => {
    try {
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Sneakers",
                link: `${process.env.EMAIL_MAINURL}`
            }
        });

        const email = {
            body: {
                name: useremail,
                intro: 'Welcome to SneakersKart',
                action: {
                    instructions: 'To validate your account, click here',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate your Account',
                        link: `${process.env.SITE_DOMAIN}/verification?t=${emailToken}`
                    }
                },
                outro: 'Have any question?, Reach us to NOW!'
            }
        };

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: useremail,
            subject: "Welcome to SneakersKart",
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerEmail
};