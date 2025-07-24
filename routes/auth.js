const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 🔒 No need to use cors() here again
router.post('/send-otp', upload.single('file'), sendOtpHandler);
router.post('/verify-otp', verifyOtpAndFetchData);

module.exports = router;
