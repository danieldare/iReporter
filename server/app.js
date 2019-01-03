import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multipath from 'connect-multiparty';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';

// Importing route files
import users from './routes/api/users';
import incident from './routes/api/index';

import doc from '../swagger.json';

// Init Express App.
const app = express();

dotenv.config();
// const storage = multer.diskStorage({
//   destination: '../../public/images/',
//   filename: (req, file, callback) => {
//     callback(
//       null,
//       `${file.fieldname}-${new Date().toISOString()}${path.extname(file.originalname)}`
//     );
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage }).array('images', 5));

// Use routes
app.use(cors());
app.use('/api/v1/auth', users);
app.use('/api/v1', incident);

// Home page
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to iReporter Landing Page' });
});

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));

// Deals with any route that is not specified in the route folder
app.all('*', (req, res) => {
  res.status(404).json({ message: "Wrong endpoint. Route doesn't Exists " });
});

// Init Server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});

export default app;
