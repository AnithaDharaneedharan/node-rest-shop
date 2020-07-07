const http = require('http'); // provides fn to spin up a server
const app = require('./app')// express application qualifies as req handler

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port); //