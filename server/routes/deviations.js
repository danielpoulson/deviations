const express = require('express');
const router = express.Router();
const deviations = require('../controllers/deviations');

router.get('/userdashboard/:user', deviations.getUserDashboard);
router.get('/graphdata', deviations.getGraphData);
router.get('/:status/:cust', deviations.getDeviations);
router.get('/:id', deviations.getDeviationById);
router.put('/:id', deviations.updateDeviation);
router.post('/export', deviations.dumpDeviations);

router.post('/', deviations.createDeviation);

module.exports = router;