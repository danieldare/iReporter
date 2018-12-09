"use strict";

var validator = require('validator');

var isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
  var errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.othernames = !isEmpty(data.othernames) ? data.othernames : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.firstname, {
    min: 2,
    max: 30
  })) {
    errors.firstname = 'First Name must be between 2 and 30 characters';
  }

  if (!validator.isLength(data.lastname, {
    min: 2,
    max: 30
  })) {
    errors.lastname = 'Last Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = 'First Name field is required';
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last Name field is required';
  } // if (!/^[a-zA-Z ]+$/.test(data.firstname)) {
  //   errors.firstname = "First Name field cannot contain numbers and symbols";
  // }


  if (validator.isEmpty(data.othernames)) {
    errors.othernames = 'Other Names field is required';
  }

  if (validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = 'Phone Number field is required';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.username)) {
    errors.username = 'User name field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(data.password, {
    min: 6,
    max: 30
  })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};