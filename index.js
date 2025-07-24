const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

const corsOptions = {
  origin: 'https://form-genie-fe-475414324273.europe-west1.run.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));         
app.options('*', cors(corsOptions));



app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));