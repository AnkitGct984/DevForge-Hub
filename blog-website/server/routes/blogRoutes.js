const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/trending', blogController.getTrendingBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes (require authentication)
router.post('/', authMiddleware, blogController.createBlog);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);
router.get('/user/blogs', authMiddleware, blogController.getUserBlogs);
router.post('/:id/like', authMiddleware, blogController.likeBlog);

module.exports = router;
