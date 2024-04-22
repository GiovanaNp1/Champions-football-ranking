const { google } = require('googleapis');
const keys = require('./credentials.json');

require('dotenv').config()

const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
);

module.exports = client
