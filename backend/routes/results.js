const express = require('express');
const resultController = require('../controllers/resultController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/:sampleId', authenticate, resultController.getResultBySample);
router.post('/', authenticate, isAdmin, resultController.createResult);
router.put('/:id', authenticate, isAdmin, resultController.updateResult);

module.exports = router;
