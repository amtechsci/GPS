const http = require('http');
const mysql = require('mysql');

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername', // Replace with your MySQL username
  password: 'yourPassword', // Replace with your MySQL password
  database: 'exampleDB'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Create server
const server = http.createServer((req, res) => {
  console.log(`Received request from ${req.socket.remoteAddress}:${req.socket.remotePort}`);

  // Prepare data for saving
  const remoteAddress = req.socket.remoteAddress;
  const remotePort = req.socket.remotePort;
  const requestData = JSON.stringify(req.headers);

  // Save data to MySQL
  const query = 'INSERT INTO requests (remoteAddress, remotePort, requestData) VALUES (?, ?, ?)';
  connection.query(query, [remoteAddress, remotePort, requestData], (err, results) => {
    if (err) throw err;
    console.log('Data saved to MySQL, ID:', results.insertId);
  });

  // Send response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

server.listen(6000, () => {
  console.log('Server running on port 6000');
});
