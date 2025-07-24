const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

const corsOptions = {
  origin: 'https://form-genie-fe-475414324273.europe-west1.run.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

router.options('/send-otp', cors(corsOptions));
router.post('/send-otp', cors(corsOptions), upload.single('file'), sendOtpHandler);

router.options('/verify-otp', cors(corsOptions));
router.post('/verify-otp', cors(corsOptions), verifyOtpAndFetchData);

module.exports = router;
