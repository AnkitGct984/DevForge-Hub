// API Configuration
const API_URL = 'http://localhost:5000/api';

// API Service
const apiService = {
  // Auth endpoints
  register: async (username, email, password, confirmPassword) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  updateProfile: async (token, username, bio, profilePicture) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ username, bio, profilePicture }),
    });
    return response.json();
  },

  // Blog endpoints
  getAllBlogs: async (category = '', search = '', page = 1) => {
    let url = `${API_URL}/blogs?page=${page}&limit=10`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    const response = await fetch(url);
    return response.json();
  },

  createBlog: async (token, blogData) => {
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
    return response.json();
  },

  getBlogById: async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    return response.json();
  },

  updateBlog: async (token, id, blogData) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
    return response.json();
  },

  deleteBlog: async (token, id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getUserBlogs: async (token) => {
    const response = await fetch(`${API_URL}/blogs/user/blogs`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getTrendingBlogs: async () => {
    const response = await fetch(`${API_URL}/blogs/trending`);
    return response.json();
  },

  likeBlog: async (token, id) => {
    const response = await fetch(`${API_URL}/blogs/${id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Comment endpoints
  getComments: async (blogId) => {
    const response = await fetch(`${API_URL}/comments/${blogId}`);
    return response.json();
  },

  addComment: async (token, blogId, message) => {
    const response = await fetch(`${API_URL}/comments/${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    return response.json();
  },

  updateComment: async (token, commentId, message) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    return response.json();
  },

  deleteComment: async (token, commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};
