const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log('Data received from the GPS tracker: ');
    console.log(data.toString());
    // Here, add your data parsing and handling logic
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
  });
});

// Specify the port to listen on
const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Error handling
server.on('error', (err) => {
  throw err;
});
