import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Use MONGO_CONNECTION_STRING from environment variables
const MONGO_URI = process.env.MONGO_CONNECTION_STRING + "Database";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process on failure
  });

const newSchema = new mongoose.Schema({
  giftCardType: { type: String, required: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  frontImage: { type: String, required: true },
  backImage: { type: String, required: true },
});

const collection = mongoose.model("GiftCard", newSchema, 'giftcards');

export default collection;
