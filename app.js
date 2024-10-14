import express from 'express';
import collection from './mongo.js';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs'; // Import fs to read cors.json

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 80; // Use PORT from environment or default to 80

// Load CORS configuration from cors.json
const corsOptions = JSON.parse(fs.readFileSync('./cors.json', 'utf-8'));

// Extract origins and methods from corsOptions
const allowedOrigins = corsOptions[0].origin;
const allowedMethods = corsOptions[0].method;

// Configure CORS dynamically
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: allowedMethods,
    maxAge: corsOptions[0].maxAgeSeconds,
    credentials: true, // Enable credentials (for cookies or auth headers)
  })
);

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Test route to check server status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

// GET route to fetch all gift cards from MongoDB
app.get('/giftcards', async (req, res) => {
  try {
    const giftcards = await collection.find({});
    res.status(200).json(giftcards);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).json({ error: 'Error fetching gift cards' });
  }
});

// POST route to handle form submission and image upload
app.post('/', async (req, res) => {
  try {
    const { giftCardType, amount, email, frontImage, backImage } = req.body;

    // Validate required fields
    if (!giftCardType || !amount || !email || !frontImage || !backImage) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const data = { giftCardType, amount, email, frontImage, backImage };
    const result = await collection.insertMany([data]);

    console.log('Insert result:', result);
    res.status(201).json({ message: 'Data and images inserted successfully', result });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
