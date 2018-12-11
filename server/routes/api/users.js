import logger from 'console';
import express from 'express';
import cors from 'cors';
import UserController from '../../controllers/UserController';
// Load Input Validation
import validateLoginInput from '../../validation/login';
import usersData from '../../model/user';

const router = express.Router();

// Use cors
router.use(cors());

// @route GET api/users
// @desc Get users Route
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  if (usersData.length === 0) {
    errors.msg = 'No User found';
    return res.status(404).json({ status: 404, errors });
  }
  return res.status(200).json({ status: 200, usersData });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', UserController.create);

module.exports = router;
