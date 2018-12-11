import moment from 'moment';
import uuid from 'uuid';
import db from '../db';
import Helper from './helper';
// Load Input Validation
import validateRegisterInput from '../validation/register';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async create(req, res) {
    // // For validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO users(id, firstname, lastname, email, phonenumber, username,  password, registered, isadmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

    const values = [
      uuid(),
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phonenumber,
      req.body.username,
      hashPassword,
      moment(new Date()),
      false
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({ token, user: values });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'User already exist' });
      }
      return res.status(400).json({ error });
    }
  }
};

export default User;
