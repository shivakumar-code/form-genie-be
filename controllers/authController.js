const { generateOTP, sendOTP, maskEmail, maskPhone } = require('../services/otpService');
const { getUserByCardNumber } = require('../services/userService');
const { createJWT } = require('../utils/jwt');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const data = require('../data/usersData.json')
let otpStore = {}; // Temporary in-memory store

const sendOtpHandler = async (req, res) => {
    const { cardNumber, imgSrc = '' } = req.body;
    const user = data.users.find(data => data.id == cardNumber);

    if (!imgSrc) return res.status(404).json({ success: false, message: 'Face Scan not found' });
    if (!user) return res.status(404).json({ success: false, message: 'Card not found' });

    // Extract base64 data img & refactor2: move to separate file to readFile function
    if (imgSrc.length > 1) {
        const base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
        const filePath = path.join(__dirname, '..', 'uploads', `screenshot_${Date.now()}.jpg`);
        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    }

  
    const otp = generateOTP();

    otpStore[cardNumber] = { otp, timestamp: Date.now(), user };
    await sendOTP(user.email, user.phone, otp);

    res.json({
        success: true,
        message: 'OTP sent to email and phone.',
        maskedMail: maskEmail(user.email) || '',
        maskedPhone: maskPhone(user.phone || ''),
        userData: user
    });


};

const verifyOtpAndFetchData = (req, res) => {
    const { cardNumber, otp } = req.body;
    const record = otpStore[cardNumber];
    const user = getUserByCardNumber(cardNumber);

    if (!record || record.otp !== otp) {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const token = createJWT({ cardNumber });

    const maskedUser = {
        ...user,
        email: maskEmail(user.email) || '',
        phone: maskPhone(user.phone) || ''
    };

    return res.json({ success: true, token, data: maskedUser });
};

module.exports = { sendOtpHandler, verifyOtpAndFetchData };
