const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');

const { sendOtpHandler, verifyOtpAndFetchData } = require('../controllers/authController');

const corsOptions = {
  origin: 'https://form-genie-fe-475414324273.europe-west1.run.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
const app = express();  
app.use(cors({
  origin: 'https://form-genie-fe-475414324273.europe-west1.run.app', // frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));




const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

//  Handle preflight OPTIONS request for /send-otp
// router.options('/send-otp', cors(corsOptions));

//  Apply CORS to the actual POST request
router.post('/send-otp', upload.single('file'), sendOtpHandler);

//  Handle preflight for /verify-otp (optional if you're using headers here too)
// router.options('/verify-otp', cors(corsOptions));

//  Apply CORS to /verify-otp too
router.post('/verify-otp', verifyOtpAndFetchData);

module.exports = router;
