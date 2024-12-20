import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle real-time events (e.g., new note, like, comment)
  socket.on('newNote', (note) => {
    io.emit('newNote', note);
  });

  socket.on('likeNote', (noteId) => {
    io.emit('likeNote', noteId);
  });

  socket.on('newComment', (comment) => {
    io.emit('newComment', comment);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

