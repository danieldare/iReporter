import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id, isadmin, username, email) {
    const token = jwt.sign(
      {
        id,
        isadmin,
        username,
        email
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
    return token;
  }
};

export default Helper;
