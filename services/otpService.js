const nodemailer = require('nodemailer');
const twilio = require('twilio');

const {twilioAuthKey, twilioPassKey} = require('../data/constants')

const twilioClient = twilio(twilioAuthKey, twilioPassKey);
const TWILIO_PHONE = "+12489636787";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email, phone, otp) {
  if (email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "autofillgenie@gmail.com",
      pass: "jlgt nsmz jrzz oelq",
    },
  });

  await transporter.sendMail({
    from: '"OTP Service" <no-reply@example.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });
}

  if (phone && phone.trim()) {
    try {
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}`,
        from: TWILIO_PHONE,
        to: `+91${phone}`
      });
    }catch (err) {
      console.error('Twilio SMS failed:', err.message);
    }
  }
}

function maskEmail(email) {
  if(!email) return;
  const [user, domain] = email.split('@');
  if (user.length <= 2) return '*'.repeat(user.length) + '@' + domain;
  const first = user[0];
  const last = user.slice(-2);
  const masked = '*'.repeat(user.length - 3);
  return `${first}${masked}${last}@${domain}`;
}

function maskPhone(phone) {
  if(!phone) return
  return phone.replace(/.(?=.{2})/g, '*');
}

module.exports = { generateOTP, sendOTP, maskEmail, maskPhone };
