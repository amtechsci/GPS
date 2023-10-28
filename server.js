const http = require('http');
const mysql = require('mysql');
const url = require('url');

// MySQL connection setup
const connection = mysql.createConnection({
  host: '217.21.95.154',
  user: 'u623876688_axs', // Replace with your MySQL username
  password: 'q1F|/X9wL[N', // Replace with your MySQL password
  database: 'u623876688_axs'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Helper function to parse POST body
function parsePostBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    callback(body);
  });
}

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // true to get query as object
  const queryData = JSON.stringify(parsedUrl.query);

  parsePostBody(req, (postBody) => {
    // Logging
    console.log(`Received request from ${req.socket.remoteAddress}:${req.socket.remotePort}`);
    
    // Prepare data for saving
    const remoteAddress = req.socket.remoteAddress;
    const remotePort = req.socket.remotePort;
    const requestData = JSON.stringify(req.headers);
    const requestBody = postBody;

    // Save data to MySQL
    const query = 'INSERT INTO requests (remoteAddress, remotePort, requestData, requestBody, queryData) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [remoteAddress, remotePort, requestData, requestBody, queryData], (err, results) => {
      if (err) throw err;
      console.log('Data saved to MySQL, ID:', results.insertId);
    });

    // Send response
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, world!\n');
  });
});

server.listen(6000, () => {
  console.log('Server running on port 6000');
});
