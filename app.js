import express from 'express';
import collection from './mongo.js';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
const SECRET_KEY = 'your_jwt_secret_key'; // Use a secure secret key

// Hardcoded user for testing
const users = [
  { id: 1, username: 'drizzy', password: bcrypt.hashSync('hawktuah2024', 8) }
];

// Enable CORS with default setup for testing purposes
app.use(cors({
  origin: '*', // Allow all origins for testing (can be restricted to your frontend URL later)
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root route to confirm backend is running
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user info to request object
    next(); // Call the next middleware or route handler
  });
};

// Login route to authenticate users
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' }); // Generate JWT
  res.json({ token }); // Send token back to client
});

// Protected route to fetch gift cards
app.get('/giftcards', authenticateJWT, async (req, res) => {
  try {
    const giftcards = await collection.find({}); // Fetch gift cards from database
    res.json(giftcards);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).send('Error fetching gift cards');
  }
});

// Protected route to insert gift card data
app.post('/giftcards', authenticateJWT, async (req, res) => {
  try {
    const { giftCardType, amount, email, frontImage, backImage } = req.body;

    const data = { giftCardType, amount, email, frontImage, backImage };

    await collection.insertMany([data]); // Insert new gift card into the database
    res.status(201).send('Gift card inserted successfully');
  } catch (err) {
    console.error('Error inserting gift card:', err);
    res.status(500).send('Error inserting gift card');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
