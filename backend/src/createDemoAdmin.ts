import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

async function createDemoAdmin() {
  await mongoose.connect(MONGO_URI);
  const email = 'admin@demo.com';
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({ email, password: hash });
    console.log('Admin demo creado:', email, password);
  } else {
    console.log('El admin demo ya existe.');
  }
  await mongoose.disconnect();
}

createDemoAdmin();
