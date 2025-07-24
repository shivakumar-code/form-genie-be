const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getUserById } = require('../controllers/userController');
const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

// router.get('/app/:id', getUserById);
router.post('/send-otp',upload.single('file'), sendOtpHandler);
router.post('/verify-otp-fetch-data', verifyOtpAndFetchData);

module.exports = router;
