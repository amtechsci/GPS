const net = require('net');

const server = net.createServer((socket) => {
    console.log('Connection from', socket.remoteAddress, 'port', socket.remotePort);

    socket.on('data', (data) => {
        console.log('Data received:', data.toString());
        // Additional logic for data handling goes here
    });

    socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });

    socket.on('close', () => {
        console.log('Connection closed:', socket.remoteAddress, 'port', socket.remotePort);
    });
});

const PORT = 6000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});
