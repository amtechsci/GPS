const http = require('http');
const mysql = require('mysql');
const url = require('url');

// MySQL pool setup
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust the connection limit as needed
  host: '217.21.95.154',
  user: 'u623876688_axs', // Replace with your MySQL username
  password: 'q1F|/X9wL[N', // Replace with your MySQL password
  database: 'u623876688_axs'
});
// Helper function to parse POST body
function parsePostBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(body);
  });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse query parameters
  const queryData = JSON.stringify(parsedUrl.query);

  parsePostBody(req, postBody => {
    console.log(`Received request from ${req.socket.remoteAddress}:${req.socket.remotePort}`);

    const remoteAddress = req.socket.remoteAddress;
    const remotePort = req.socket.remotePort;
    const requestData = JSON.stringify(req.headers);
    const requestBody = postBody;

    // Using a pool to manage MySQL interactions
    pool.query('INSERT INTO requests (remoteAddress, remotePort, requestData, requestBody, queryData) VALUES (?, ?, ?, ?, ?)', 
      [remoteAddress, remotePort, requestData, requestBody, queryData], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server encountered an internal error');
        } else {
          console.log('Data saved to MySQL, ID:', results.insertId);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Hello, world!\n');
        }
      });
  });
});

server.listen(6000, () => {
  console.log('Server running on port 6000');
});
