const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const bookingRoutes = require('./routes/bookingRoutes');
const truckRoutes = require('./routes/truckRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/booking', bookingRoutes);
app.use('/api/truck', truckRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Welcome to the TranspoGo API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚛 Server running on http://localhost:${PORT}`);
});