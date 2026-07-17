const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const { blogId } = req.params;

    if (!message) {
      return res.status(400).json({ message: 'Comment message is required' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = new Comment({
      user: req.user.id,
      blog: blogId,
      message,
    });

    await comment.save();
    await comment.populate('user', 'username profilePicture');

    res.status(201).json({
      message: 'Comment added successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Comments for Blog
exports.getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is comment author
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.message = message || comment.message;
    comment.updatedAt = Date.now();

    await comment.save();
    await comment.populate('user', 'username profilePicture');

    res.status(200).json({
      message: 'Comment updated successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is comment author
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
