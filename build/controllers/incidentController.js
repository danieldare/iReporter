"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Incident = _interopRequireDefault(require("../model/Incident"));

var _redFlags = _interopRequireDefault(require("../validation/red-flags"));

var _redFlagLocation = _interopRequireDefault(require("../validation/red-flag-location"));

var _redFlagComment = _interopRequireDefault(require("../validation/red-flag-comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IncidentController =
/*#__PURE__*/
function () {
  function IncidentController() {
    _classCallCheck(this, IncidentController);
  }

  _createClass(IncidentController, null, [{
    key: "getRedflag",
    // @desc Get red flags Route
    value: function getRedflag(req, res) {
      var errors = {};

      if (_Incident.default.length === 0) {
        errors.msg = 'No red-flag record Found';
        return res.status(404).json({
          status: 404,
          errors: errors
        });
      }

      return res.status(200).json({
        status: 200,
        data: _Incident.default
      });
    } // @desc Create a  red flag

  }, {
    key: "createRedflag",
    value: function createRedflag(req, res) {
      // For validation
      var _validateRedflagInput = (0, _redFlags.default)(req.body),
          errors = _validateRedflagInput.errors,
          isValid = _validateRedflagInput.isValid;

      var _req$body = req.body,
          latitude = _req$body.latitude,
          longitude = _req$body.longitude; // Check Validation

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors: errors
        });
      } // New Incident


      var newIncident = {
        id: _Incident.default.length + 1,
        createdOn: new Date().toLocaleString(),
        createdBy: 89,
        title: req.body.title,
        type: req.body.type,
        location: "".concat(latitude, ", ").concat(longitude),
        status: req.body.status,
        images: [req.body.images],
        videos: [req.body.videos],
        comments: req.body.comments
      };

      if (typeof req.body.images !== 'undefined' || null) {
        // Images - split into array
        newIncident.images = req.body.images.split(',');
      } // Videos - split into array


      if (typeof req.body.videos !== 'undefined' || null) {
        newIncident.videos = req.body.videos.split(',');
      }

      _Incident.default.push(newIncident);

      return res.status(200).json({
        status: 200,
        data: [{
          id: newIncident.id,
          message: 'Created Intervention record'
        }]
      });
    } // @desc Get one red flag record

  }, {
    key: "getOneRedflag",
    value: function getOneRedflag(req, res) {
      var errors = {};
      var redflagid = req.params.redflagid;

      var datas = _Incident.default.find(function (data) {
        return data.id === +redflagid;
      });

      if (datas == null) {
        _Incident.default.filter(function (data) {
          return data.id !== +redflagid;
        });

        errors.msg = 'Page not Found';
        return res.status(404).json({
          status: 404,
          errors: errors
        });
      }

      return res.status(200).json({
        status: 200,
        data: [datas]
      });
    } // @desc update the location

  }, {
    key: "updateLocation",
    value: function updateLocation(req, res) {
      // For validation
      var _validateRedflagLocat = (0, _redFlagLocation.default)(req.body),
          errors = _validateRedflagLocat.errors,
          isValid = _validateRedflagLocat.isValid; // Check Validation


      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors: errors
        });
      }

      var redflagid = req.params.redflagid;

      var filteredRecord = _Incident.default.find(function (recordObj) {
        return recordObj.id === +redflagid;
      });

      if (filteredRecord == null) {
        errors.msg = 'Ooops , no record with such id exists';
        return res.status(404).json({
          status: 404,
          errors: errors
        });
      } // Updating the location


      var _req$body2 = req.body,
          latitude = _req$body2.latitude,
          longitude = _req$body2.longitude;
      var location = "".concat(latitude, ", ").concat(longitude);
      filteredRecord.location = location;
      return res.status(200).json({
        status: 200,
        data: [{
          id: redflagid,
          message: "Updated red-flag record's location"
        }]
      });
    } // @desc update the comment

  }, {
    key: "updateComment",
    value: function updateComment(req, res) {
      // For validation
      var _validateRedflagComme = (0, _redFlagComment.default)(req.body),
          errors = _validateRedflagComme.errors,
          isValid = _validateRedflagComme.isValid; // Check Validation


      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors: errors
        });
      }

      var redflagid = req.params.redflagid;

      var filteredRecord = _Incident.default.find(function (recordObj) {
        return recordObj.id === +redflagid;
      });

      var comments = req.body.comments;

      if (filteredRecord == null) {
        errors.msg = 'Ooops , no record with such id exists';
        return res.status(404).json({
          status: 404,
          errors: errors
        });
      } //  Updating the comment section


      filteredRecord.comments = comments;
      return res.status(200).json({
        status: 200,
        data: [{
          id: redflagid,
          message: "Updated red-flag record's comment"
        }]
      });
    } // @desc delete a specified red-flag record

  }, {
    key: "deleteOneRedflag",
    value: function deleteOneRedflag(req, res) {
      var redflagid = req.params.redflagid;
      var errors = {};

      var removeIndex = _Incident.default.findIndex(function (recordObj) {
        return recordObj.id === +redflagid;
      });

      if (removeIndex === +'-1') {
        errors.msg = 'Ooops , no record with such id exists';
        return res.status(404).json({
          status: 404,
          errors: errors
        });
      }

      var remove = _Incident.default.findIndex(function (recordObj) {
        return recordObj.id === +redflagid;
      }); // Splice out of array


      _Incident.default.splice(remove, 1);

      return res.status(200).json({
        status: 200,
        data: [{
          id: redflagid,
          message: 'red-flag record has been deleted'
        }]
      });
    }
  }]);

  return IncidentController;
}();

var _default = IncidentController;
exports.default = _default;