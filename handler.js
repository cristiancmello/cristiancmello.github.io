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
      
      <div id="container">${html}</div>
    `

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        </head>
        
        <body>
          <div id="container">
            <div id="root">
              <h1>Row</h1>
            </div>
          </div>
        </body>
        
        </html>
      `
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