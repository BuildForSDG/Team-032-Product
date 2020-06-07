const Mailgen = require('mailgen');

const APP_NAME = '032 Product';

module.exports.getMailGenerator = (url) => new Mailgen({
  theme: 'salted',
  product: {
    name: APP_NAME,
    link: `${url}`
  }
});
