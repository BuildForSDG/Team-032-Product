const Mailgen = require('mailgen');

const APP_NAME = 'Power Sophia';

module.exports.getMailGenerator = (url) => new Mailgen({
  theme: 'salted',
  product: {
    name: APP_NAME,
    link: `${url}`
  }
});
