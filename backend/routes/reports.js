const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, reportController.getMyReports);
router.get('/:id', authenticate, reportController.getReportById);
router.get('/:id/pdf', authenticate, reportController.downloadPdf);
router.post('/generate', authenticate, isAdmin, reportController.generateReport);

module.exports = router;
