const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, isAdmin);

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/status', adminController.updateUserStatus);
router.get('/samples', adminController.getAllSamples);
router.put('/samples/:id/status', adminController.updateSampleStatus);
router.get('/contact-messages', adminController.getContactMessages);
router.put('/contact-messages/:id/read', adminController.markMessageRead);

module.exports = router;
