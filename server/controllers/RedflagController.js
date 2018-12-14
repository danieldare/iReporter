import moment from 'moment';
import jwt from 'jsonwebtoken';
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
   * Get All Redflag
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
   * Get one redflag record
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
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Red-flag record id not Found' });
    }
  },
  /**
   * Update a reflag location
   * @param {object} req
   * @param {object} res
   * @returns {object} updated redflag reponse
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
      // Checking for Unauthorized User
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }

      const values = req.body.location || rows[0].location;
      const response = await db.query(updateOneQuery, [values, req.params.redflag_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated red-flag record’s location' }]
      });
    } catch (err) {
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Red-flag record id not Found' });
    }
  },
  /**
   * Update a redflag comment
   * @param {object} req
   * @param {object} res
   * @returns {object} redflag reponse
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
      // Checking for Unauthorized User
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }
      const values = req.body.comments || rows[0].comments;
      const response = await db.query(updateOneQuery, [values, req.params.redflag_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated red-flag record’s comment' }]
      });
    } catch (err) {
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Red-flag record id not Found' });
    }
  },
  /**
   * Delete A redflag record
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 200
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM incidents WHERE id = $1 AND type = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.redflag_id, 'red-flag']);
      if (!rows[0]) {
        return res.status(404).json({ message: 'red-flag record not found' });
      }
      // Checking for Unauthorized Using
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }
      return res.status(200).json({
        status: 200,
        data: [{ id: rows[0].id, message: 'red-flag record has been deleted' }]
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: 404, message: 'An errror just occured! Red-flag record id not Found' });
    }
  }
};

export default RedflagController;
