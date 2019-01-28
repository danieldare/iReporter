/* eslint-disable no-param-reassign */
const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRedflagInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  // data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
  // data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
  data.comments = !isEmpty(data.comments) ? data.comments : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if (!validator.isLength(data.comments, { min: 5, max: 500 })) {
    errors.comments = 'Comments must be between 10 and 500 characters';
  }

  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (
    !/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(data.location)
  ) {
    errors.location = 'Location is invalid';
  }

  if (!validator.isLength(data.title, { min: 2, max: 500 })) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (validator.isEmpty(data.comments)) {
    errors.comments = 'Comments field is required';
  }

  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  const status = ['under-investigation', 'rejected', 'resolved', 'draft'];
  if (!status.includes(data.status)) {
    errors.status = 'Status not valid!!!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
