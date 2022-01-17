import mongoose from 'mongoose';
import { app } from './core/App';

(async function main() {

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI not avaliable")
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not avaliable")
    }
    const connection = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connected to ${connection.connections[0].name}`);
    await app.listen(5000);
    console.log('listening on port 5000');
  } catch (err) {
    console.error(err);
  }
})();

