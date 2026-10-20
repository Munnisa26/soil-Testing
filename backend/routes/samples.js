const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const sampleController = require('../controllers/sampleController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|doc|docx/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) return cb(null, true);
    cb(new Error('Only images and documents allowed'));
  }
});

router.post(
  '/',
  authenticate,
  upload.single('document'),
  [
    body('soil_type').notEmpty().withMessage('Soil type is required'),
    body('test_type').notEmpty().withMessage('Test type is required'),
    body('sample_location').notEmpty().withMessage('Sample location is required')
  ],
  validate,
  sampleController.createSample
);

router.get('/', authenticate, sampleController.getMySamples);
router.get('/dashboard/stats', authenticate, sampleController.getDashboardStats);
router.get('/:id', authenticate, sampleController.getSampleById);
router.put('/:id', authenticate, sampleController.updateSample);
router.delete('/:id', authenticate, sampleController.deleteSample);

module.exports = router;
