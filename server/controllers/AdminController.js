import db from '../db';
import sendEmail from '../helper/sendEmail';
import sendSms from '../helper/sendSms';
import validateStatusInput from '../validation/incident-status';

const AdminController = {
  /**
   * Get All Incident
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getAllIncident(req, res) {
    const findAllQuery = 'SELECT * FROM incidents';
    try {
      const { rows } = await db.query(findAllQuery);
      if (rows.length === 0) {
        return res.status(400).json({ errors: 'No incident Found' });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Update an status
   * @param {object} req
   * @param {object} res
   * @returns {object} intervention reponse
   */
  async updateInterventionStatus(req, res) {
    // For validation
    const { errors, isValid } = validateStatusInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const findOneUser = 'SELECT * FROM users WHERE id = $1';
    const updateOneQuery = `UPDATE incidents SET status = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.intervention_id, 'intervention']);
      if (!rows[0]) {
        return res.status(404).send({ message: 'intervention not found' });
      }
      const values = req.body.status || rows[0].status;
      const response = await db.query(updateOneQuery, [values, req.params.intervention_id]);
      const user = await db.query(findOneUser, [response.rows[0].createdby]);

      const emailPayload = {
        firstname: user.rows[0].firstname,
        email: user.rows[0].email,
        status: req.body.status
      };
      // Sends email to User
      await sendEmail(emailPayload);
      // Sends Sms to User
      sendSms(
        `234${user.rows[0].phonenumber.slice(1)}`,
        `Hello ${user.rows[0].firstname},  Your Intervention record status has been updated to ${
          req.body.status
        }`
      );
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated intervention record’s status' }]
      });
    } catch (err) {
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Intervention record id not Found' });
    }
  },
  /**
   * Update an intervention comment
   * @param {object} req
   * @param {object} res
   * @returns {object} intervention reponse
   */
  async updateRedflagStatus(req, res) {
    // For validation
    const { errors, isValid } = validateStatusInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const findOneUser = 'SELECT * FROM users WHERE id = $1';
    const updateOneQuery = `UPDATE incidents SET status = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.redflag_id, 'red-flag']);
      if (!rows[0]) {
        return res
          .status(404)
          .send({ status: 404, errors: 'red-flag record not found with given ID' });
      }
      const values = req.body.status || rows[0].status;
      const response = await db.query(updateOneQuery, [values, req.params.redflag_id]);
      const user = await db.query(findOneUser, [response.rows[0].createdby]);

      const emailPayload = {
        firstname: user.rows[0].firstname,
        email: user.rows[0].email,
        status: req.body.status
      };
      // Sends email to User
      await sendEmail(emailPayload);
      // Sends Sms to User
      sendSms(
        `234${user.rows[0].phonenumber.slice(1)}`,
        `Hello ${user.rows[0].firstname},  Your red-flag record status has been updated to ${
          req.body.status
        }`
      );

      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated red-flag record’s status' }]
      });
    } catch (err) {
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Red-flag record id not Found' });
    }
  }
};

export default AdminController;
