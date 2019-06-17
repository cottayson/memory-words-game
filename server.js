let static = require('node-static');
let http = require('http')

let fileServer = new static.Server('./public');
let PORT = 3000;

console.log(`port: ${PORT}`)
http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(PORT);