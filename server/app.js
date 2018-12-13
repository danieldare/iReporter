const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing route files
const users = require('./routes/api/users');
const incident = require('./routes/api/index');

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
