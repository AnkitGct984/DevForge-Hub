# Blog Website - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Start MongoDB
If using local MongoDB:
```bash
mongod
```

Or update `.env` with MongoDB Atlas connection string.

### Step 3: Start Backend Server
```bash
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 4: Open Frontend
Open `client/index.html` in your browser or use:
```bash
# Using Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Step 5: Test the Application

1. **Register a new account**
   - Click "Login"
   - Click "Register here"
   - Fill in username, email, password
   - Click "Register"

2. **Create a blog post**
   - Click "📝 Create Blog" in user dropdown
   - Fill in title and content
   - Select category
   - Click "Publish Blog"

3. **View and interact**
   - Click on any blog to view
   - Click heart icon to like
   - Add comments
   - Search for blogs

---

## 📝 Default Categories
- Technology
- Programming
- Travel
- Food
- Education
- Sports
- Business

---

## 🔑 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/blogs` | Get all blogs |
| POST | `/api/blogs` | Create blog |
| GET | `/api/blogs/:id` | Get single blog |
| POST | `/api/comments/:blogId` | Add comment |

---

## ⚙️ Environment Variables

**server/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_website
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 🎨 Customization

### Change Colors
Edit `client/css/style.css`:
```css
/* Primary color: #667eea */
/* Secondary color: #764ba2 */
```

### Change API URL
Edit `client/js/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Change Database
Edit `server/.env`:
```
MONGODB_URI=your_mongodb_connection_string
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Backend not starting | Check if port 5000 is free |
| MongoDB connection error | Ensure MongoDB is running |
| Frontend can't connect | Check API_URL in api.js |
| CORS error | Verify backend CORS config |

---

## 📦 What's Included

✅ Complete backend with Express.js
✅ Full frontend with vanilla JS
✅ Database models for users, blogs, comments
✅ Authentication with JWT
✅ Responsive design
✅ Search and filter functionality
✅ Like and comment system
✅ User dashboard
✅ Comprehensive documentation

---

## 🚀 Next Steps

1. Read full README.md for detailed information
2. Explore the code structure
3. Try creating blogs and comments
4. Customize styling and features
5. Deploy to production

---

## 💬 Need Help?

Check the main README.md for troubleshooting and detailed documentation.

Happy blogging! 📝✨
