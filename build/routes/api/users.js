"use strict";

/* eslint-disable consistent-return */
var express = require('express');

var cors = require('cors');

var router = express.Router(); // Load Input Validation

var validateRegisterInput = require('../../validation/register');

var validateLoginInput = require('../../validation/login'); // Use cors


router.use(cors()); // Store House

var usersData = [{
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
}, {
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
}, {
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
}]; // @route GET api/users
// @desc Get users Route
// @access Public

router.get('/', function (req, res) {
  var errors = {};
  usersData.forEach(function () {
    return res.status(200).json({
      status: 200,
      usersData: usersData
    });
  });
  errors.msg = 'No red-flag record Found';
  return res.status(404).json({
    status: 404,
    errors: errors
  });
}); // @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', function (req, res) {
  // For validation
  var _validateRegisterInpu = validateRegisterInput(req.body),
      errors = _validateRegisterInpu.errors,
      isValid = _validateRegisterInpu.isValid; // Check Validation


  if (!isValid) {
    return res.status(400).json({
      errors: errors
    });
  } // eslint-disable-next-line consistent-return


  usersData.forEach(function (data) {
    if (data.email === req.body.email) {
      errors.email = 'Email already exists';
      return res.status(400).json({
        status: 404,
        errors: errors
      }); // email: "Email Already exists"
    }
  });
  var newUser = {
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
  }; // Store in user Array

  usersData.push(newUser);
  res.status(200).json({
    status: 200,
    data: usersData
  });
}); // @route POST api/users/login
// @desc Login user
// @access Public

router.post('/login', function (req, res) {
  // For validation
  var _validateLoginInput = validateLoginInput(req.body),
      errors = _validateLoginInput.errors,
      isValid = _validateLoginInput.isValid; // Check Validation


  if (!isValid) {
    return res.status(400).json({
      errors: errors
    });
  }

  var password = req.body.password;
  usersData.forEach(function (data) {
    if (data.email === req.body.email) {
      if (data.password === password) {
        return res.status(200).json({
          status: 200,
          data: data
        }); // email: "User can Login"
      }

      errors.password = 'Password incorrect';
      return res.status(400).json({
        status: 400,
        errors: errors
      }); // errors: "password Incorrect"
    }
  });
  usersData.forEach(function (data) {
    if (data.email !== req.body.email) {
      errors.email = 'User not found';
      return res.status(404).json({
        status: 404,
        errors: errors
      });
    }
  });
});
module.exports = router;