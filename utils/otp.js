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

  console.log(`📧 OTP sent to ${email}`);
  console.log(`📱 OTP would also be sent to phone: ${phone} (SMS integration needed)`);
}

const maskEmail = (email) =>{
  const [user, domain] = email.split('@');
  if(user.length <= 2)
    {
      return '*'.repeat(user.length)+ '@' + domain;
    } 

  const firstTwo = user.slice(0, 2);
  const lastTwo = user.slice(-2);
  const masked = "*".repeat(user.length - 4);
  return `${firstTwo}${masked}${lastTwo}@${domain}`;

}

const maskPhone = (phoneNumber) =>{
   if (!phoneNumber || phoneNumber.length < 10) {
    return 'Invalid phone number';
  }

  const countryCode = '+91';
  const firstFour = phoneNumber.slice(0, 4);
  const masked = 'X'.repeat(6);

  return `${countryCode} ${firstFour}-${masked}`;
}

module.exports = { generateOTP, sendOTP, maskEmail, maskPhone };
