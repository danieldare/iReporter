import incidentDb from '../model/Incident';

// Load Input Validation
import validateRedflagInput from '../validation/red-flags';
import validateRedflagLocationInput from '../validation/red-flag-location';
import validateRedflagCommentInput from '../validation/red-flag-comment';

/**
 * Incident Controller class
 *
 * @class IncidentController
 */
class IncidentController {
  /**
   * Get Red flag method
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns response
   * @memberof IncidentController
   */
  static getRedflag(req, res) {
    const errors = {};
    if (incidentDb.length === 0) {
      errors.msg = 'No red-flag record Found';
      return res.status(404).json({ status: 404, errors });
    }
    return res.status(200).json({ status: 200, data: incidentDb });
  }

  /**
   * Create a red flag Method
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns response
   * @memberof IncidentController
   */
  static createRedflag(req, res) {
    // For validation
    const { errors, isValid } = validateRedflagInput(req.body);
    const { latitude, longitude } = req.body;
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }

    // New Incident
    const newIncident = {
      id: incidentDb.length + 1,
      createdOn: new Date().toLocaleString(),
      createdBy: 89,
      title: req.body.title,
      type: req.body.type,
      location: `${latitude}, ${longitude}`,
      status: req.body.status,
      images: [req.body.images],
      videos: [req.body.videos],
      comments: req.body.comments
    };

    if (typeof req.body.images !== 'undefined' || null) {
      // Images - split into array
      newIncident.images = req.body.images.split(',');
    }

    // Videos - split into array
    if (typeof req.body.videos !== 'undefined' || null) {
      newIncident.videos = req.body.videos.split(',');
    }

    incidentDb.push(newIncident);
    return res.status(200).json({
      status: 200,
      data: [{ id: newIncident.id, message: 'Created Intervention record' }]
    });
  }

  /**
   * Get One Redflag record.
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns response
   * @memberof IncidentController
   */
  static getOneRedflag(req, res) {
    const errors = {};
    const { redflagid } = req.params;

    const datas = incidentDb.find(data => data.id === +redflagid);

    if (datas == null) {
      incidentDb.filter(data => data.id !== +redflagid);
      errors.msg = 'Page not Found';
      return res.status(404).json({ status: 404, errors });
    }
    return res.status(200).json({ status: 200, data: [datas] });
  }

  // @desc update the location
  static updateLocation(req, res) {
    // For validation
    const { errors, isValid } = validateRedflagLocationInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const { redflagid } = req.params;

    const filteredRecord = incidentDb.find(recordObj => recordObj.id === +redflagid);

    if (filteredRecord == null) {
      errors.msg = 'Ooops , no record with such id exists';
      return res.status(404).json({ status: 404, errors });
    }

    // Updating the location
    const { latitude, longitude } = req.body;
    const location = `${latitude}, ${longitude}`;
    filteredRecord.location = location;

    return res.status(200).json({
      status: 200,
      data: [
        {
          id: redflagid,
          message: "Updated red-flag record's location"
        }
      ]
    });
  }

  /**
   * Update a red flag Comment
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns response
   * @memberof IncidentController
   */
  static updateComment(req, res) {
    // For validation
    const { errors, isValid } = validateRedflagCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json({ status: 400, errors });
    }
    const { redflagid } = req.params;

    const filteredRecord = incidentDb.find(recordObj => recordObj.id === +redflagid);
    const { comments } = req.body;
    if (filteredRecord == null) {
      errors.msg = 'Ooops , no record with such id exists';
      return res.status(404).json({ status: 404, errors });
    }

    //  Updating the comment section
    filteredRecord.comments = comments;

    return res.status(200).json({
      status: 200,
      data: [
        {
          id: redflagid,
          message: "Updated red-flag record's comment"
        }
      ]
    });
  }

  /**
   * Delete a redflag record.
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns response
   * @memberof IncidentController
   */
  static deleteOneRedflag(req, res) {
    const { redflagid } = req.params;
    const errors = {};

    const removeIndex = incidentDb.findIndex(recordObj => recordObj.id === +redflagid);

    if (removeIndex === +'-1') {
      errors.msg = 'Ooops , no record with such id exists';
      return res.status(404).json({ status: 404, errors });
    }

    const remove = incidentDb.findIndex(recordObj => recordObj.id === +redflagid);
    // Splice out of array
    incidentDb.splice(remove, 1);
    return res.status(200).json({
      status: 200,
      data: [
        {
          id: redflagid,
          message: 'red-flag record has been deleted'
        }
      ]
    });
  }
}

export default IncidentController;
