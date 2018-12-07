/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');

const router = express.Router();

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Use cors
router.use(cors());
// Store House
const usersData = [
  {
    id: 1,
    firstname: 'Dodo',
    lastname: 'Dede',
    othernames: 'Dada',
    email: 'Dodeda@gmail.com',
    phonenumber: '09023291',
    username: 'Dodeda',
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: '1234562'
  },
  {
    id: 2,
    firstname: 'Dodo1',
    lastname: 'Dede1',
    othernames: 'Dada1',
    email: 'Dodeda1@gmail.com',
    phonenumber: '09023291',
    username: 'Dodeda1',
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: '1234561'
  },
  {
    id: 3,
    firstname: 'Dodo2',
    lastname: 'Dede2',
    othernames: 'Dada2',
    email: 'Dodeda2@gmail.com',
    phonenumber: '09023291',
    username: 'Dodeda2',
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: '1234562'
  }
];

// @route GET api/users
// @desc Get users Route
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  usersData.forEach(() => res.status(200).json({ status: 200, usersData }));
  errors.msg = 'No red-flag record Found';
  return res.status(404).json({ status: 404, errors });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // For validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // eslint-disable-next-line consistent-return
  usersData.forEach(data => {
    if (data.email === req.body.email) {
      errors.email = 'Email already exists';
      return res.status(400).json({ status: 404, errors }); // email: "Email Already exists"
    }
  });

  const newUser = {
    id: 3 + Math.floor(Math.random() * 1550),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othernames: req.body.othernames,
    email: req.body.email,
    phoneNumber: req.body.phonenumber,
    username: req.body.username,
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: req.body.password
  };

  // Store in user Array
  usersData.push(newUser);
  res.status(200).json({ status: 200, data: usersData });
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', (req, res) => {
  // For validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const { password } = req.body;

  usersData.forEach(data => {
    if (data.email === req.body.email) {
      if (data.password === password) {
        return res.status(200).json({ status: 200, data }); // email: "User can Login"
      }
      errors.password = 'Password incorrect';
      return res.status(400).json({ status: 400, errors }); // errors: "password Incorrect"
    }
  });

  usersData.forEach(data => {
    if (data.email !== req.body.email) {
      errors.email = 'User not found';
      return res.status(404).json({ status: 404, errors });
    }
  });
});

module.exports = router;
