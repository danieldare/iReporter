import express from 'express';
import cors from 'cors';
import UserController from '../../controllers/UserController';

const router = express.Router();

// Use cors
router.use(cors());

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/signup', UserController.create);

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', UserController.login);
router.get('/current', UserController.getCurrentUser);

module.exports = router;
