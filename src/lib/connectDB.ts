import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  
  try {
    const cnx = await mongoose.connect(mongoUri);
    cachedConnection = cnx.connection;
    console.log("Connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}