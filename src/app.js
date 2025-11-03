
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.json({ message: 'Thrwah Backend API is running!' });
});


app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});


app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(` it is working:  http://localhost:${PORT}`);
});

module.exports = app;