const nodemailer = require('nodemailer');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email, phone, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS_KEY,
    },
  });

  await transporter.sendMail({
    from: '"OTP Service" <no-reply@example.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });
}

function maskEmail(email) {
  const [user, domain] = email.split('@');
  if (user.length <= 2) return '*'.repeat(user.length) + '@' + domain;
  const first = user[0];
  const last = user.slice(-2);
  const masked = '*'.repeat(user.length - 3);
  return `${first}${masked}${last}@${domain}`;
}

function maskPhone(phone) {
  return phone.replace(/.(?=.{2})/g, '*');
}

module.exports = { generateOTP, sendOTP, maskEmail, maskPhone };
