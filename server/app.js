const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing route files
const users = require('./routes/api/users');
const redflag = require('./routes/api/redflag');

// Init Express App.
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Use routes
app.use(cors());
app.use('/api/v1/users', users);
app.use('/api/v1/red-flags', redflag);

// Home page
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to iReporter Landing Page' });
});

// Deals with any route that is not specified in the route folder
app.all('*', (req, res) => {
  res.status(404).json({ message: "Wrong endpoint. Route doesn't Exists " });
});
// Init Server
const port = 5050 || process.env.port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});

export default app;
