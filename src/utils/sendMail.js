const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

/**
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @param {string} from
 * @return {string} emailResponse
 */
const sendMail = (to, subject, html, from = 'noreply@powersophia.com') => {
  const msg = {
    to, from, subject, html
  };

  switch (process.env.NODE_ENV) {
    case 'production':
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      return sgMail.send(msg);
    default:
      return nodemailer.createTransport(
        {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_SMTP_USERNAME,
            pass: process.env.MAILTRAP_SMTP_PASSWORD
          }
        }
      ).sendMail(msg);
  }
};

module.exports = sendMail;
