import moment from 'moment';
import db from '../db';

import validateRedflagInput from '../validation/incident';
import validateLocationInput from '../validation/incident-location';
import validateCommentInput from '../validation/incident-comment';

const RedflagController = {
  /**
   * Create a redflag record
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */
  async create(req, res) {
    // For validation
    const { errors, isValid } = validateRedflagInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    const createQuery = `INSERT INTO
      incidents(createdOn, createdBy, title, type, location, status, images, videos, comments)
      VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9)
      returning *`;

    const values = [
      moment(new Date()),
      req.user.id,
      req.body.title,
      'red-flag',
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comments
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: rows[0].id,
            message: 'Created red-flag record'
          }
        ]
      });
    } catch (error) {
      return res.status(400).json({ status: 400, errors });
    }
  },
  /**
   * Get All Intervention
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getAllRedflag(req, res) {
    const findAllQuery = 'SELECT * FROM incidents where type= $1';
    try {
      const { rows } = await db.query(findAllQuery, ['red-flag']);
      if (rows.length === 0) {
        return res.status(400).json({ status: 400, error: 'No red-flag Found' });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  /**
   * Get one intervention record
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getOneRedflag(req, res) {
    const text = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    try {
      const { rows } = await db.query(text, [req.params.redflag_id, 'red-flag']);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, errors: 'red-flag record not found' });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]]
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'An error occured. Try again!!!' });
    }
  },
  /**
   * Update an intervention location
   * @param {object} req
   * @param {object} res
   * @returns {object} updated intervention reponse
   */
  async updateRedflagLocation(req, res) {
    // For validation
    const { errors, isValid } = validateLocationInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const updateOneQuery = `UPDATE incidents SET location = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.redflag_id, 'red-flag']);

      if (!rows[0]) {
        return res.status(404).json({ status: 404, errors: 'red-flag record not found' });
      }

      const values = req.body.location || rows[0].location;
      const response = await db.query(updateOneQuery, [values, req.params.redflag_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated red-flag record’s location' }]
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  /**
   * Update an intervention comment
   * @param {object} req
   * @param {object} res
   * @returns {object} intervention reponse
   */
  async updateRedflagComment(req, res) {
    // For validation
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const updateOneQuery = `UPDATE incidents SET comments = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.redflag_id, 'red-flag']);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, errors: 'red-flag record not found' });
      }
      const values = req.body.comments || rows[0].comments;
      const response = await db.query(updateOneQuery, [values, req.params.redflag_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated red-flag record’s comment' }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete An Intervention record
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM incidents WHERE id = $1 AND type = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.redflag_id, 'red-flag']);
      if (!rows[0]) {
        return res.status(404).json({ message: 'red-flag record not found' });
      }
      return res.status(200).json({
        status: 200,
        data: [{ id: rows[0].id, message: 'red-flag record has been deleted' }]
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

export default RedflagController;
