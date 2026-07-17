const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['Technology', 'Programming', 'Travel', 'Food', 'Education', 'Sports', 'Business', 'Other'],
    default: 'Other',
  },
  featuredImage: {
    type: String,
    default: 'https://via.placeholder.com/800x400',
  },
  description: {
    type: String,
    default: '',
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  views: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for search functionality
BlogSchema.index({ title: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('Blog', BlogSchema);
