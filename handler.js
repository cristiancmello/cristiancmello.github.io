'use strict';

const fs = require('fs')

module.exports.loadIndex = async event => {
  //const indexPageHtml = fs.readFileSync('index.html').toString();

  try {
    const showdown = require('showdown'),
      converter = new showdown.Converter(),
      text = fs.readFileSync(event.path.replace(/^\/|\/$/g, '')).toString(),
      html = converter.makeHtml(text);

    const response = {
      statusCode: 200,
      body: { message: 'hello' },
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html
    };
  }
  catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: error
        },
        null,
        2
      ),
    };
  }
};
