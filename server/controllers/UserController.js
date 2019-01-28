import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../db';
import Helper from './helper';
// Load Input Validation
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async create(req, res) {
    //  For validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO users(firstname, lastname, email, phonenumber, username,  password, registered, isadmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phonenumber,
      req.body.username,
      hashPassword,
      moment(new Date()),
      req.body.isadmin || false
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(
        rows[0].id,
        rows[0].isadmin,
        rows[0].username,
        rows[0].email
      );
      return res.status(201).json({ status: 201, data: [{ token, user: rows[0] }] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ status: 400, errors: 'User already exist' });
      }
      return res.status(400).json({ status: 400, errors });
    }
  },

  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    // For validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ status: 400, errors: 'User not Found' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res
          .status(400)
          .json({ status: 400, errors: 'The credentials you provided are incorrect' });
      }

      const token = Helper.generateToken(
        rows[0].id,
        rows[0].isadmin,
        rows[0].username,
        rows[0].email
      );
      return res.status(200).json({ status: 200, data: [{ token, user: rows[0] }] });
    } catch (error) {
      return res.status(400).json({ status: 400, errors });
    }
  },
  async getCurrentUser(req, res) {
    try {
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);

      if (rows[0]) {
        return res.json({
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          number: rows[0].phonenumber
        });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
};

export default User;
