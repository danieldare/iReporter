'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require('express'));

var _bodyParser = _interopRequireDefault(require('body-parser'));

var _cors = _interopRequireDefault(require('cors'));

var _users = _interopRequireDefault(require('./routes/api/users'));

var _redflag = _interopRequireDefault(require('./routes/api/redflag'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Importing route files
// Init Express App.
var app = (0, _express.default)(); // Body Parser middleware

app.use(
  _bodyParser.default.urlencoded({
    extended: false
  })
);
app.use(_bodyParser.default.json()); // Enable cors

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // Use routes

app.use((0, _cors.default)());
app.use('/api/v1/users', _users.default);
app.use('/api/v1/red-flags', _redflag.default); // Home page

app.get('/', function(req, res) {
  res.status(200).json({
    message: 'Welcome to iReporter Landing Page'
  });
}); // Deals with any route that is not specified in the route folder

app.all('*', function(req, res) {
  res.status(404).json({
    message: "Wrong endpoint. Route doesn't Exists "
  });
}); // Init Server

var port = 3060 || process.env.port;
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log('Server running on port '.concat(port));
});
var _default = app;
exports.default = _default;
