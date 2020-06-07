const {
  generateToken
} = require('../utils/tokenHandler');

const {
  getMailGenerator
} = require('./config');

const emailTemplate = (url) => ({
  body: {
    intro: 'Welcome to 032!',
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

const generateVerificationEmail = (payload) => {
  const url = process.env.FRONT_END_HOST;
  const token = generateToken(payload);
  const mailGenerator = getMailGenerator(url);
  const email = emailTemplate(`${url}/teachers/verify?token=${token}`);
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};

module.exports = generateVerificationEmail;