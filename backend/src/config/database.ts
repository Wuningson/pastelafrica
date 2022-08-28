import mongoose from 'mongoose';
import env from './env';

export default async function () {
  try {
    console.log('Connecting to database');

    await mongoose.connect(env.databaseUrl);

    console.log('Connected to database');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
