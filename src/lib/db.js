import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection across hot reloads / serverless invocations so we don't
// exhaust the connection pool (the Next.js gotcha that Express doesn't have).
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
