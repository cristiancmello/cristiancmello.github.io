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
      
    let htmlDoc = `
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <div id="container">${html}</div>
    `

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlDoc
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