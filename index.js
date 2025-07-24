const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Allow frontend origin
app.use(cors({
  origin: 'https://form-genie-fe-475414324273.europe-west1.run.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// ✅ Register routes after CORS
app.use('/api/auth', authRoutes);

// ✅ Cloud Run expects this
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
