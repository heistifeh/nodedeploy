import express from 'express';
import collection from './mongo.js';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 80;
const SECRET_KEY = 'your_jwt_secret_key'; // Use a secure secret key

const users = [
  { id: 1, username: 'drizzy', password: bcrypt.hashSync('hawktuah2024', 8) }
];

// CORS configuration
const corsOptions = JSON.parse(fs.readFileSync('./cors.json', 'utf-8'));
const allowedOrigins = corsOptions[0].origin;
const allowedMethods = corsOptions[0].method;

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
    credentials: true,
    maxAge: corsOptions[0].maxAgeSeconds,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route to fetch gift cards
app.get('/giftcards', authenticateJWT, async (req, res) => {
  try {
    const giftcards = await collection.find({});
    res.json(giftcards);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).send('Error fetching gift cards');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
