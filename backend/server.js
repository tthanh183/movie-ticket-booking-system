import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectDB } from './lib/db.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
