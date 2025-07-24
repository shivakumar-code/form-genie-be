const { generateOTP, sendOTP, maskEmail, maskPhone } = require('../services/otpService');
const { getUserByCardNumber } = require('../services/userService');
const { createJWT } = require('../utils/jwt');

let otpStore = {}; // Temporary in-memory store

const sendOtpHandler = async (req, res) => {
    const { cardNumber } = req.body;
    const user = getUserByCardNumber(cardNumber);
    if (!user) return res.status(404).json({ success: false, message: 'Card not found' });

    const otp = generateOTP();
    otpStore[cardNumber] = { otp, timestamp: Date.now() };
    console.log(`[DEV-ONLY OTP] for ${cardNumber}:`, otp); // remove in production
    await sendOTP(user.email, user.phone, otp);

    res.json({
        success: true,
        message: 'OTP sent to email and phone.',
        maskedMail: maskEmail(user.email),
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
        email: maskEmail(user.email),
        phone: maskPhone(user.phone)
    };

    return res.json({ success: true, token, data: maskedUser });
};

module.exports = { sendOtpHandler, verifyOtpAndFetchData };
