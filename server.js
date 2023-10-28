const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Received request from ${req.socket.remoteAddress}:${req.socket.remotePort}`);

  // Process the request here...

  // Send a response back
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, world!\n');

  // The connection will automatically close after sending the response
});

server.listen(6000, () => {
  console.log('Server running on port 3000');
});
