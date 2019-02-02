import express from 'express';
import interventionController from '../../controllers/InterventionController';
import redflagController from '../../controllers/RedflagController';
import Auth from '../../middleware/Auth';
import isAdmin from '../../middleware/isAdmin';
import AdminController from '../../controllers/AdminController';

const router = express.Router();

// Intervention
router.get('/interventions', Auth.verifyToken, interventionController.getAllUserIntervention);
router.get(
  '/interventions/:intervention_id',
  Auth.verifyToken,
  interventionController.getOneIntervention
);
router.post('/interventions', Auth.verifyToken, interventionController.create);
router.patch(
  '/interventions/:intervention_id/location',
  Auth.verifyToken,
  interventionController.updateInterventionLocation
);
router.patch(
  '/interventions/:intervention_id/comment',
  Auth.verifyToken,
  interventionController.updateInterventionComment
);
router.delete('/interventions/:intervention_id', Auth.verifyToken, interventionController.delete);

// Redflag
router.get('/all-incidents', Auth.verifyToken, isAdmin, redflagController.getAll);
router.get('/red-flags', Auth.verifyToken, redflagController.getAllUserRedflag);
router.get('/red-flags/:redflag_id', Auth.verifyToken, redflagController.getOneRedflag);
router.get('/incident', Auth.verifyToken, redflagController.getAllUserIncident);
router.post('/red-flags', Auth.verifyToken, redflagController.create);
router.patch(
  '/red-flags/:redflag_id/location',
  Auth.verifyToken,
  redflagController.updateRedflagLocation
);
router.patch(
  '/red-flags/:redflag_id/comment',
  Auth.verifyToken,
  redflagController.updateRedflagComment
);

router.patch(
  '/red-flags/:redflag_id/comment',
  Auth.verifyToken,
  redflagController.updateRedflagComment
);
router.delete('/red-flags/:redflag_id', Auth.verifyToken, redflagController.delete);

// Admin
router.patch(
  '/interventions/:intervention_id/status',
  isAdmin,
  AdminController.updateInterventionStatus
);
router.patch('/red-flags/:redflag_id/status', isAdmin, AdminController.updateRedflagStatus);
router.patch('/all-incidents/:id/status', isAdmin, AdminController.updateAllIncidentStatus);

router.get('/incidents', Auth.verifyToken, AdminController.getAllIncident);

module.exports = router;
