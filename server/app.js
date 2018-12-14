import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

// Importing route files
import users from './routes/api/users';
import incident from './routes/api/index';

import doc from '../swagger.json';

// Init Express App.
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
