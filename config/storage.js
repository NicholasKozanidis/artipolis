const CLOUD_NAME = 'freakolas';
const API_KEY = '618414258757733';
const API_SECRET = 'cHWMmiB7W0xiY1bgaXjRWWtoNn8';

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Create storage engine
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowedFormats: ['jpg', 'png'],

    format: async (req, file) => file.contentType, // supports promises as well
    public_id: (req, file) => file.id,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
