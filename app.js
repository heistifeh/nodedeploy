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

// Configure CORS dynamically and allow preflight requests
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    methods: allowedMethods,
    credentials: true, // Allow credentials (cookies, headers)
    maxAge: corsOptions[0].maxAgeSeconds, // Cache preflight responses
  })
);

// Handle preflight requests for all routes
app.options('*', cors()); 

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// GET route to fetch all gift cards from MongoDB
app.get('/giftcards', async (req, res) => {
  try {
    const giftcards = await collection.find({});
    res.json(giftcards);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).send('Error fetching gift cards');
  }
});

// POST route to handle form submission and image upload
app.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const { giftCardType, amount, email, frontImage, backImage } = req.body;
    const data = { giftCardType, amount, email, frontImage, backImage };

    await collection.insertMany([data]);
    res.status(200).send('Data and images inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
