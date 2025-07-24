const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/send-otp',upload.single('file'), sendOtpHandler);
router.post('/verify-otp', verifyOtpAndFetchData);

module.exports = router;
