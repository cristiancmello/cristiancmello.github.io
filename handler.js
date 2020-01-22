'use strict';

const fs = require('fs')

module.exports.loadIndex = async event => {
  const indexPageHtml = fs.readFileSync('index.html').toString();

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: indexPageHtml,
  };

  return response
};
