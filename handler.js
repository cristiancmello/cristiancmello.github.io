'use strict';

const 
  fs = require('fs'),
  showdown = require('showdown')

module.exports.loadIndex = async event => {
  try {
    const 
      converter = new showdown.Converter(),
      eventPath = event.path
      
    let articlePath = 'articles/' +  eventPath.replace(/^\/|\/$/g, '')
      
    if (articlePath === 'articles/') {
      articlePath = 'articles/index.md'
    }
      
    let
      text = fs.readFileSync(articlePath).toString(),
      html = converter.makeHtml(text);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `<h1>Bad Request</h1>`
    };
  }
};