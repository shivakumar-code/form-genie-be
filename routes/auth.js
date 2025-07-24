const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');
const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

router.get('/app/:id', getUserById);
router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp-fetch-data', verifyOtpAndFetchData);

module.exports = router;
