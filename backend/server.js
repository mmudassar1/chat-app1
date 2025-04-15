import express from 'express';
import http from 'http';
import cors from 'cors';
import configureSocketServer from './socket/socket.js';

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Invalid JSON payload'
        });
    }
    next();
});

// Before other routes
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Server is running' });
});

app.post('/api/auth/logout', (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Add users route handler
app.get('/api/users', (req, res) => {
    try {
        // Add your user fetching logic here
        res.status(200).json({
            status: 'success',
            data: {
                users: [] // Replace with actual user data
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message || 'Something went wrong!'
        });
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});