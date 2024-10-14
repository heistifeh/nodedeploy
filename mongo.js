import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Use MONGO_CONNECTION_STRING from environment variables
const MONGO_URI = `${process.env.MONGO_CONNECTION_STRING}?retryWrites=true&w=majority`;

// MongoDB Connection Options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // 50 seconds timeout for server selection
};

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process if connection fails
  });

// Define the GiftCard Schema
const giftCardSchema = new mongoose.Schema(
  {
    giftCardType: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create the GiftCard Model
const GiftCard = mongoose.model('GiftCard', giftCardSchema, 'giftcards');

export default GiftCard;
