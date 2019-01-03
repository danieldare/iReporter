const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRedflagLocationInput(data) {
  const errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';

  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (
    /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(data.location)
  ) {
    errors.location = 'Location is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
