const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const specsPath = path.join(__dirname, '../..');
const mimeTypes = {
  'js': 'application/javascript',
  'html': 'text/html; charset=utf-8'
};

http.createServer((request, response) => {
  const pathName = url.parse(request.url).pathname;
  const type = pathName.split('.').pop();

  fs.readFile(specsPath + pathName, (error, data) => {
    if (error) {
      response.writeHead(404, { 'Content-type': 'text/plain' });
      response.write(JSON.stringify(error));
      response.end();
    } else {
      response.writeHead(200, { 'Content-type': mimeTypes[type] });
      response.write(data);
      response.end();
    }
  });
}).listen(8080);
