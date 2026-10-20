const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', authenticate, isAdmin, blogController.createPost);
router.put('/:id', authenticate, isAdmin, blogController.updatePost);
router.delete('/:id', authenticate, isAdmin, blogController.deletePost);

module.exports = router;
