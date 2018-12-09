"use strict";

var validator = require('validator');

var isEmpty = require('./is_empty');

module.exports = function validateRedflagCommentInput(data) {
  var errors = {};
  data.comments = !isEmpty(data.comments) ? data.comments : '';

  if (!validator.isLength(data.comments, {
    min: 25,
    max: 500
  })) {
    errors.comments = 'Comments must be between 25 and 500 characters';
  }

  if (validator.isEmpty(data.comments)) {
    errors.comments = 'Comments field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};