const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/profile', authenticate, userController.getProfile);

router.put(
  '/profile',
  authenticate,
  [
    body('full_name').optional().trim().isLength({ min: 2 }),
    body('mobile').optional().isMobilePhone('any'),
    body('user_type').optional().isIn(['Farmer', 'Student', 'Researcher', 'Other'])
  ],
  validate,
  userController.updateProfile
);

router.put(
  '/change-password',
  authenticate,
  [
    body('current_password').notEmpty(),
    body('new_password').isLength({ min: 6 })
  ],
  validate,
  userController.changePassword
);

module.exports = router;
