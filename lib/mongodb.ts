/**
 * MongoDB Connection Utility
 * 
 * This file handles the connection to MongoDB Atlas (free tier).
 * 
 * Setup Instructions:
 * 1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
 * 2. Create a new cluster (free tier M0)
 * 3. Create a database user (Database Access > Add New User)
 * 4. Whitelist your IP address (Network Access > Add IP Address)
 * 5. Get your connection string (Connect > Connect your application)
 * 6. Add MONGODB_URI to your .env.local file
 * 
 * Example .env.local:
 * MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/roboway?retryWrites=true&w=majority
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
