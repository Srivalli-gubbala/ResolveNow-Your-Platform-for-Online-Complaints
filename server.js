const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect('mongodb://localhost:27017/resolvenow');

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

// Real-time messaging
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });
    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(5000, () => console.log('Server running on port 5000'));
