"use strict";

var _express = _interopRequireDefault(require("express"));

var _incidentController = _interopRequireDefault(require("../../controllers/incidentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // @route GET api/red-flags


router.get('/', _incidentController.default.getRedflag); // @route GET api/red-flags/:redflagId

router.get('/:redflagid', _incidentController.default.getOneRedflag); // @route POST api/v1/red-flags

router.post('/', _incidentController.default.createRedflag); // @route PATCH api/v1/red-flags/:redflagId/location

router.patch('/:redflagid/location', _incidentController.default.updateLocation); // @route PATCH api/v1/red-flags/:redflagId/comment

router.patch('/:redflagid/comment', _incidentController.default.updateComment); // @route DELETE api/red-flags/:redflagId/:comment

router.delete('/:redflagid', _incidentController.default.deleteOneRedflag);
module.exports = router;