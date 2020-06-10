const {
  generateToken
} = require('../utils/tokenHandler');

const {
  getMailGenerator
} = require('./config');

const emailTemplate = (url) => ({
  body: {
    intro: 'Welcome to Power Sophia!',
    action: {
      instructions: "You're almost there. To finish activating your account please click the link below.",
      button: {
        color: '#48cfad',
        text: 'Activate Account',
        link: `${url}`
      }
    },
    outro: 'If you did not initiate this request, please ignore this mail.'
  }
});

const generateVerificationEmail = (payload, route) => {
  const url = process.env.ACCESS_CONTROL_ALLOW_ORIGIN;
  const token = generateToken(payload);
  const mailGenerator = getMailGenerator(url);
  const email = emailTemplate(`${url}/${route}/create?token=${token}`);
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};

module.exports = generateVerificationEmail;
