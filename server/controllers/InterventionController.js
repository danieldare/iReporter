import jwt from 'jsonwebtoken';
import moment from 'moment';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import db from '../db';

import validateRedflagInput from '../validation/incident';
import validateLocationInput from '../validation/incident-location';
import validateCommentInput from '../validation/incident-comment';

const IncidentController = {
  /**
   * Create an Intervention
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

    let insertImage = null;
    if (req.files.length >= 1) {
      insertImage = [];
      req.files.forEach(data => {
        insertImage.push(data.url);
      });
      insertImage = insertImage.join();
    }

    const createQuery = `INSERT INTO
      incidents(createdon, createdby, title, type, location, status, images, videos, comments)
      VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9)
      returning *`;
    const values = [
      new Date().toLocaleString(),
      req.user.id,
      req.body.title,
      'intervention',
      req.body.location,
      'draft',
      insertImage,
      req.body.videos,
      req.body.comments
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(200).json({
        status: 201,
        data: [
          {
            id: rows[0].id,
            message: 'Created intervention record'
          }
        ]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Intervention
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getAllIntervention(req, res) {
    const findAllQuery = 'SELECT * FROM incidents where type= $1';
    try {
      const { rows } = await db.query(findAllQuery, ['intervention']);
      if (rows.length === 0) {
        return res.status(400).json({ errors: 'No intervention Found' });
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
   * Get AllUser intervention
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getAllUserIntervention(req, res) {
    const findAllQuery = 'SELECT * FROM incidents WHERE type = $1 AND createdby = $2';
    try {
      // Checking for Unauthorized User
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(findAllQuery, ['intervention', decoded.id]);
      if (rows.length === 0) {
        return res.status(400).json({ status: 400, error: 'No Intervention Found' });
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
  async getOneIntervention(req, res) {
    const text = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    try {
      const { rows } = await db.query(text, [req.params.intervention_id, 'intervention']);
      if (!rows[0]) {
        return res.status(404).send({ message: 'intervention record not found' });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]]
      });
    } catch (error) {
      return res
        .status(404)
        .send({ status: 404, message: 'An errror just occured! Intervention record id not Found' });
    }
  },
  /**
   * Update an intervention location
   * @param {object} req
   * @param {object} res
   * @returns {object} updated intervention reponse
   */
  async updateInterventionLocation(req, res) {
    // For validation
    const { errors, isValid } = validateLocationInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const updateOneQuery = `UPDATE incidents SET location = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.intervention_id, 'intervention']);
      if (!rows[0]) {
        return res.status(404).send({ message: 'intervention not found' });
      }
      // Checking for Unauthorized User
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }

      const values = req.body.location || rows[0].location;
      const response = await db.query(updateOneQuery, [values, req.params.intervention_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated intervention record’s location' }]
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
  async updateInterventionComment(req, res) {
    // For validation
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const findOneQuery = 'SELECT * FROM incidents WHERE id = $1 AND type = $2';
    const updateOneQuery = `UPDATE incidents SET comments = $1 WHERE id = $2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.intervention_id, 'intervention']);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, errors: 'intervention not found' });
      }
      // Checking for Unauthorized User
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }
      const values = req.body.comments || rows[0].comments;
      const response = await db.query(updateOneQuery, [values, req.params.intervention_id]);
      return res.status(200).json({
        status: 200,
        data: [{ id: response.rows[0].id, message: 'Updated intervention record’s comment' }]
      });
    } catch (err) {
      return res
        .status(400)
        .send({ status: 404, message: 'An errror just occured! Intervention record id not Found' });
    }
  },
  /**
   * Delete An Intervention record
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 AND type = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.intervention_id, 'intervention']);
      if (!rows[0]) {
        return res.status(404).json({ message: 'incident not found' });
      }
      // Checking for Unauthorized Using
      const token = req.headers['x-access-token'];
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.id !== rows[0].createdby) {
        return res.status(403).json({ status: 403, errors: 'Not authorized to do this operation' });
      }
      return res.status(200).json({
        status: 200,
        data: [{ id: rows[0].id, message: 'intervention record has been deleted' }]
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: 404, message: 'An errror just occured! Intervention record id not Found' });
    }
  }
};

export default IncidentController;
