import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  await mongoose.set('strictQuery', true);
  if (connected) {
    console.log('MongoDB is connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully!');
    connected = true;
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
