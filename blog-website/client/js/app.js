// Global state
let currentUser = null;
let currentBlog = null;
let currentPage = 1;
let currentCategory = '';
let currentSearch = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadUserFromStorage();
  updateAuthUI();
  loadLatestBlogs();
  loadTrendingBlogs();
  setupHamburger();
});

// Storage management
const saveUserToStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  currentUser = user;
};

const loadUserFromStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser = JSON.parse(user);
  }
};

const removeUserFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  currentUser = null;
};

const getToken = () => localStorage.getItem('token');

// UI functions
const showSection = (sectionId) => {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
};

const updateAuthUI = () => {
  const authLink = document.getElementById('authLink');
  const userLink = document.getElementById('userLink');
  const searchSection = document.getElementById('searchSection');

  if (currentUser) {
    authLink.style.display = 'none';
    userLink.style.display = 'block';
    document.getElementById('userName').textContent = currentUser.username;
    searchSection.style.display = 'block';
  } else {
    authLink.style.display = 'block';
    userLink.style.display = 'none';
    searchSection.style.display = 'none';
  }
};

const showToast = (message, type = 'success') => {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// Page navigation
const showHome = () => {
  showSection('homeSection');
  document.querySelector('.hero').scrollIntoView();
};

const showAuth = () => {
  if (currentUser) {
    showDashboard();
  } else {
    showSection('authSection');
  }
};

const showBlogs = () => {
  showSection('blogsSection');
  loadAllBlogs(1);
};

const showCategories = () => {
  showSection('categoriesSection');
};

const showDashboard = () => {
  if (!currentUser) {
    showToast('Please login first', 'error');
    showAuth();
    return;
  }
  showSection('dashboardSection');
  loadUserDashboard();
};

const showProfile = () => {
  if (!currentUser) {
    showToast('Please login first', 'error');
    showAuth();
    return;
  }
  showSection('profileSection');
  loadProfile();
};

const createBlogPage = () => {
  if (!currentUser) {
    showToast('Please login first', 'error');
    showAuth();
    return;
  }
  showSection('createBlogSection');
  document.getElementById('blogForm').reset();
};

// Authentication functions
const toggleAuthForm = () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authTitle = document.getElementById('authTitle');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    authTitle.textContent = 'Login';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    authTitle.textContent = 'Register';
  }
};

const login = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const data = await apiService.login(email, password);

  if (data.token) {
    saveUserToStorage(data.user, data.token);
    updateAuthUI();
    showToast(data.message, 'success');
    showHome();
  } else {
    showToast(data.message || 'Login failed', 'error');
  }
};

const register = async () => {
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirm').value;

  if (!username || !email || !password || !confirmPassword) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const data = await apiService.register(username, email, password, confirmPassword);

  if (data.token) {
    saveUserToStorage(data.user, data.token);
    updateAuthUI();
    showToast(data.message, 'success');
    showHome();
  } else {
    showToast(data.message || 'Registration failed', 'error');
  }
};

const logout = () => {
  removeUserFromStorage();
  updateAuthUI();
  showToast('Logged out successfully', 'success');
  showHome();
};

// Blog functions
const loadLatestBlogs = async () => {
  const blogs = await apiService.getAllBlogs('', '', 1);
  const container = document.getElementById('latestBlogs');
  renderBlogs(blogs.blogs, container);
};

const loadTrendingBlogs = async () => {
  const data = await apiService.getTrendingBlogs();
  const container = document.getElementById('trendingBlogs');
  renderBlogs(data.blogs, container);
};

const loadAllBlogs = async (page) => {
  const blogs = await apiService.getAllBlogs(currentCategory, currentSearch, page);
  const container = document.getElementById('allBlogs');
  renderBlogs(blogs.blogs, container);
  renderPagination(blogs.pagination);
};

const renderBlogs = (blogs, container) => {
  if (!blogs || blogs.length === 0) {
    container.innerHTML = '<p class="no-blogs">No blogs found</p>';
    return;
  }

  container.innerHTML = blogs.map(blog => `
    <div class="blog-card" onclick="viewBlog('${blog._id}')">
      <img src="${blog.featuredImage}" alt="${blog.title}" class="blog-image">
      <div class="blog-card-content">
        <span class="category-badge">${blog.category}</span>
        <h3>${blog.title}</h3>
        <p>${blog.description || blog.content.substring(0, 100)}...</p>
        <div class="blog-meta">
          <span>By ${blog.author.username}</span>
          <span>${new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="blog-stats">
          <span>❤️ ${blog.likes}</span>
          <span>👁️ ${blog.views}</span>
        </div>
      </div>
    </div>
  `).join('');
};

const renderPagination = (pagination) => {
  const container = document.getElementById('pagination');
  let html = '';

  for (let i = 1; i <= pagination.pages; i++) {
    html += `<button class="page-btn ${i === pagination.page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  container.innerHTML = html;
};

const goToPage = (page) => {
  currentPage = page;
  loadAllBlogs(page);
};

const viewBlog = async (blogId) => {
  const data = await apiService.getBlogById(blogId);
  currentBlog = data.blog;
  showBlogDetail(currentBlog);
};

const showBlogDetail = (blog) => {
  showSection('blogDetailSection');

  document.getElementById('detailTitle').textContent = blog.title;
  document.getElementById('detailAuthor').textContent = `By ${blog.author.username}`;
  document.getElementById('detailDate').textContent = new Date(blog.createdAt).toLocaleDateString();
  document.getElementById('detailCategory').textContent = blog.category;
  document.getElementById('detailViews').textContent = `${blog.views} views`;
  document.getElementById('detailImage').src = blog.featuredImage;
  document.getElementById('detailContent').innerHTML = blog.content.replace(/\n/g, '<br>');
  document.getElementById('likeCount').textContent = blog.likes;

  // Show comment form if logged in
  if (currentUser) {
    document.getElementById('commentForm').style.display = 'block';
  } else {
    document.getElementById('commentForm').style.display = 'none';
  }

  loadComments(blog._id);
};

// Blog creation
const submitBlog = async (event) => {
  event.preventDefault();

  if (!currentUser) {
    showToast('Please login first', 'error');
    return;
  }

  const blogData = {
    title: document.getElementById('blogTitle').value,
    content: document.getElementById('blogContent').value,
    description: document.getElementById('blogDescription').value,
    category: document.getElementById('blogCategory').value,
    tags: document.getElementById('blogTags').value.split(',').map(t => t.trim()),
    featuredImage: document.getElementById('blogImage').value || 'https://via.placeholder.com/800x400',
  };

  const data = await apiService.createBlog(getToken(), blogData);

  if (data.blog) {
    showToast('Blog published successfully', 'success');
    document.getElementById('createBlogSection').querySelector('.blog-form').reset();
    showHome();
  } else {
    showToast(data.message || 'Failed to create blog', 'error');
  }
};

// Comments
const loadComments = async (blogId) => {
  const data = await apiService.getComments(blogId);
  const container = document.getElementById('commentsList');

  if (!data.comments || data.comments.length === 0) {
    container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    return;
  }

  container.innerHTML = data.comments.map(comment => `
    <div class="comment">
      <div class="comment-header">
        <strong>${comment.user.username}</strong>
        <span>${new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p>${comment.message}</p>
      ${currentUser && currentUser.id === comment.user._id ? `
        <div class="comment-actions">
          <button class="comment-btn" onclick="editComment('${comment._id}')">Edit</button>
          <button class="comment-btn" onclick="deleteComment('${comment._id}')">Delete</button>
        </div>
      ` : ''}
    </div>
  `).join('');
};

const submitComment = async () => {
  const message = document.getElementById('commentText').value;

  if (!message) {
    showToast('Please write a comment', 'error');
    return;
  }

  const data = await apiService.addComment(getToken(), currentBlog._id, message);

  if (data.comment) {
    showToast('Comment added successfully', 'success');
    document.getElementById('commentText').value = '';
    loadComments(currentBlog._id);
  } else {
    showToast(data.message || 'Failed to add comment', 'error');
  }
};

const deleteComment = async (commentId) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    const data = await apiService.deleteComment(getToken(), commentId);
    if (data.message) {
      showToast('Comment deleted successfully', 'success');
      loadComments(currentBlog._id);
    }
  }
};

const editComment = (commentId) => {
  // Implementation for editing comments
  showToast('Edit comment feature coming soon', 'info');
};

// Like blog
const toggleLike = async () => {
  if (!currentUser) {
    showToast('Please login to like', 'error');
    return;
  }

  const data = await apiService.likeBlog(getToken(), currentBlog._id);
  if (data.blog) {
    document.getElementById('likeCount').textContent = data.blog.likes;
    showToast(data.message, 'success');
  }
};

// Search and filter
const searchBlogs = () => {
  currentSearch = document.getElementById('searchInput').value;
  currentPage = 1;
  loadAllBlogs(1);
};

const filterByCategory = (category) => {
  currentCategory = category;
  currentPage = 1;
  showBlogs();
};

// Dashboard
const loadUserDashboard = async () => {
  const data = await apiService.getUserBlogs(getToken());
  const myBlogs = data.blogs || [];

  document.getElementById('myBlogsCount').textContent = myBlogs.length;

  const totalViews = myBlogs.reduce((sum, blog) => sum + blog.views, 0);
  document.getElementById('totalViews').textContent = totalViews;

  const container = document.getElementById('myBlogs');
  if (myBlogs.length === 0) {
    container.innerHTML = '<p class="no-blogs">You haven\'t created any blogs yet.</p>';
  } else {
    container.innerHTML = myBlogs.map(blog => `
      <div class="dashboard-blog-card">
        <h3>${blog.title}</h3>
        <p>${blog.description || blog.content.substring(0, 100)}...</p>
        <div class="dashboard-blog-stats">
          <span>👁️ ${blog.views} views</span>
          <span>❤️ ${blog.likes} likes</span>
          <span>${blog.published ? '✅ Published' : '⏸️ Draft'}</span>
        </div>
        <div class="dashboard-blog-actions">
          <button class="btn btn-small" onclick="viewBlog('${blog._id}')">View</button>
          <button class="btn btn-small" onclick="editBlog('${blog._id}')">Edit</button>
          <button class="btn btn-small btn-danger" onclick="deleteBlog('${blog._id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }
};

const deleteBlog = async (blogId) => {
  if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
    const data = await apiService.deleteBlog(getToken(), blogId);
    if (data.message) {
      showToast('Blog deleted successfully', 'success');
      loadUserDashboard();
    }
  }
};

const editBlog = (blogId) => {
  showToast('Edit blog feature coming soon', 'info');
};

// Profile
const loadProfile = async () => {
  const data = await apiService.getProfile(getToken());
  const user = data.user;

  document.getElementById('profilePicture').src = user.profilePicture;
  document.getElementById('profileUsername').textContent = user.username;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profileBio').textContent = user.bio || 'No bio added yet';
};

const editProfile = () => {
  document.getElementById('profileCard').style.display = 'none';
  const form = document.getElementById('editProfileForm');
  form.style.display = 'block';

  document.getElementById('editUsername').value = document.getElementById('profileUsername').textContent;
  document.getElementById('editBio').value = document.getElementById('profileBio').textContent;
  document.getElementById('editProfilePicture').value = document.getElementById('profilePicture').src;
};

const saveProfile = async () => {
  const username = document.getElementById('editUsername').value;
  const bio = document.getElementById('editBio').value;
  const profilePicture = document.getElementById('editProfilePicture').value;

  const data = await apiService.updateProfile(getToken(), username, bio, profilePicture);

  if (data.user) {
    currentUser = data.user;
    saveUserToStorage(currentUser, getToken());
    updateAuthUI();
    showToast('Profile updated successfully', 'success');
    cancelEditProfile();
    loadProfile();
  }
};

const cancelEditProfile = () => {
  document.getElementById('profileCard').style.display = 'block';
  document.getElementById('editProfileForm').style.display = 'none';
};

// Share article
const shareArticle = () => {
  if (navigator.share) {
    navigator.share({
      title: currentBlog.title,
      text: currentBlog.description,
      url: window.location.href,
    });
  } else {
    showToast('Share URL: ' + window.location.href, 'info');
  }
};

// Hamburger menu
const setupHamburger = () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
};

const toggleUserMenu = () => {
  document.getElementById('userDropdown').classList.toggle('show');
};

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
  const userLink = document.getElementById('userLink');
  if (!userLink.contains(e.target)) {
    document.getElementById('userDropdown').classList.remove('show');
  }
});
