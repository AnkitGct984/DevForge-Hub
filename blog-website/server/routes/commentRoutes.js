const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get comments (public)
router.get('/:blogId', commentController.getBlogComments);

// Add comment (protected)
router.post('/:blogId', authMiddleware, commentController.addComment);

// Update comment (protected)
router.put('/:commentId', authMiddleware, commentController.updateComment);

// Delete comment (protected)
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
