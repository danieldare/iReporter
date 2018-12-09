"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isEmpty = function isEmpty(val) {
  return val === undefined || val == null || _typeof(val) === 'object' && Object.keys(val).length === 0 || typeof val === 'string' && val.trim().length === 0;
};

module.exports = isEmpty;