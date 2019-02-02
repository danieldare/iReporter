const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateStatusInput(data) {
  const errors = {};

  data.status = !isEmpty(data.status) ? data.status : '';

  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  const status = ['draft', 'under-investigation', 'rejected', 'resolved'];
  if (!status.includes(data.status)) {
    errors.status = 'Status not valid!!!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
