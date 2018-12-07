import express from 'express';
import redFlagController from '../../controllers/incidentController';

const router = express.Router();

// @route GET api/red-flags
router.get('/', redFlagController.getRedflag);

// @route GET api/red-flags/:redflagId
router.get('/:redflagid', redFlagController.getOneRedflag);

// @route POST api/v1/red-flags
router.post('/', redFlagController.createRedflag);

// @route PATCH api/v1/red-flags/:redflagId/location
router.patch('/:redflagid/location', redFlagController.updateLocation);

// @route PATCH api/v1/red-flags/:redflagId/comment
router.patch('/:redflagid/comment', redFlagController.updateComment);

// @route DELETE api/red-flags/:redflagId/:comment
router.delete('/:redflagid', redFlagController.deleteOneRedflag);

module.exports = router;
