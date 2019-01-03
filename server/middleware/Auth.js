import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .json({ status: 401, errors: 'Unauthorized!, you have to login first' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);

      if (!rows[0]) {
        return res.status(403).send({ status: 403, errors: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
};

export default Auth;
