import mongoose from 'mongoose';
import { logger } from './logger';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error('MONGODB_URI is not defined in environment variables');
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    logger.info('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    logger.info('Initializing new database connection...');
    logger.debug('MongoDB Connection URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        logger.info('Successfully connected to MongoDB');
        logger.debug('MongoDB connection details:', {
          host: mongoose.connection.host,
          port: mongoose.connection.port,
          name: mongoose.connection.name,
          models: Object.keys(mongoose.models),
        });
        return mongoose;
      })
      .catch((error) => {
        logger.error('MongoDB connection error:', {
          message: error.message,
          code: error.code,
          name: error.name,
        });
        throw error;
      });
  } else {
    logger.info('Using existing database connection promise');
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    logger.error('Failed to establish database connection:', {
      error: e.message,
      stack: e.stack,
    });
    throw e;
  }

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB connection reestablished');
  });

  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      logger.error('Error during MongoDB connection closure:', err);
      process.exit(1);
    }
  });

  return cached.conn;
}

export default connectDB;
