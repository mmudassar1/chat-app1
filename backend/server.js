import express from 'express';
import http from 'http';
import configureSocketServer from './socket/socket.js';

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = configureSocketServer(server);

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});