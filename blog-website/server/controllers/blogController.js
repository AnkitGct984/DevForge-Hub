const Blog = require('../models/Blog');
const User = require('../models/User');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, description, tags, featuredImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      category: category || 'Other',
      description,
      tags: tags || [],
      featuredImage: featuredImage || 'https://via.placeholder.com/800x400',
      author: req.user.id,
      published: true,
    });

    await blog.save();
    await blog.populate('author', 'username email profilePicture');

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    let query = { published: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username email profilePicture bio')
      .populate({
        path: 'likedBy',
        select: 'username',
      });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, content, category, description, tags, featuredImage } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.description = description || blog.description;
    blog.tags = tags || blog.tags;
    blog.featuredImage = featuredImage || blog.featuredImage;
    blog.updatedAt = Date.now();

    await blog.save();
    await blog.populate('author', 'username email profilePicture');

    res.status(200).json({
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User's Blogs
exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .populate('author', 'username email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Trending Blogs
exports.getTrendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('author', 'username email profilePicture')
      .sort({ likes: -1, views: -1 })
      .limit(10);

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like Blog
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const alreadyLiked = blog.likedBy.includes(req.user.id);

    if (alreadyLiked) {
      blog.likedBy = blog.likedBy.filter(id => id.toString() !== req.user.id);
      blog.likes = Math.max(0, blog.likes - 1);
    } else {
      blog.likedBy.push(req.user.id);
      blog.likes += 1;
    }

    await blog.save();

    res.status(200).json({
      message: alreadyLiked ? 'Like removed' : 'Blog liked successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
