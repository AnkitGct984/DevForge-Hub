# 📝 BlogHub - Full Stack Blog Website

A complete, production-ready blog website built with **Node.js, Express, MongoDB, HTML5, CSS3, and JavaScript**. Features user authentication, CRUD operations, comments, likes, and more.

---

## 🎯 Features

### ✅ User Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- User profile management

### ✅ Blog Management
- Create, read, update, and delete blog posts
- Rich text content support
- Category organization (Technology, Programming, Travel, Food, Education, Sports, Business)
- Featured images
- Tags system
- View counter
- Draft and published status

### ✅ Comments System
- Add comments to blog posts
- Edit own comments
- Delete own comments
- Real-time comment display

### ✅ Like System
- Like/unlike blog posts
- Like counter
- Track user likes

### ✅ Search & Filtering
- Search blogs by title, content, and category
- Filter by category
- Pagination support
- Trending blogs

### ✅ User Dashboard
- View personal blog statistics
- Manage own blogs
- View total likes and views

### ✅ Responsive Design
- Mobile-friendly interface
- Tablet optimized
- Desktop responsive
- Dark mode support

---

## 🛠 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No framework dependencies
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

### Tools & Libraries
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Multer** - File upload handling
- **Express-validator** - Input validation

---

## 📂 Project Structure

```
blog-website/
├── client/                          # Frontend
│   ├── index.html                   # Main HTML file
│   ├── css/
│   │   ├── style.css               # Main styles
│   │   └── responsive.css          # Responsive design
│   └── js/
│       ├── api.js                  # API service calls
│       └── app.js                  # Application logic
│
├── server/                          # Backend
│   ├── config/
│   │   └── database.js             # Database connection
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── blogController.js       # Blog operations
│   │   └── commentController.js    # Comment operations
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication
│   ├── models/
│   │   ├── User.js                 # User model
│   │   ├── Blog.js                 # Blog model
│   │   └── Comment.js              # Comment model
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── blogRoutes.js           # Blog endpoints
│   │   └── commentRoutes.js        # Comment endpoints
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies
│   └── server.js                   # Server entry point
│
└── README.md                        # Documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Configure Environment Variables**
Create `.env` file in the `server` folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_website
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. **Start MongoDB**
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

4. **Start Backend Server**
```bash
npm start
# or with nodemon for development
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open Frontend**
Simply open the `client/index.html` file in your browser or use a live server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server client/
```

Frontend will run on `http://localhost:8000` or `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Blogs
- `GET /api/blogs` - Get all published blogs (with pagination)
- `GET /api/blogs?category=Technology` - Filter by category
- `GET /api/blogs?search=query` - Search blogs
- `GET /api/blogs/trending` - Get trending blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)
- `GET /api/blogs/user/blogs` - Get user's blogs (authenticated)
- `POST /api/blogs/:id/like` - Like/unlike blog (authenticated)

### Comments
- `GET /api/comments/:blogId` - Get blog comments
- `POST /api/comments/:blogId` - Add comment (authenticated)
- `PUT /api/comments/:commentId` - Update comment (authenticated)
- `DELETE /api/comments/:commentId` - Delete comment (authenticated)

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for secure authentication.

### Login Flow
1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Server validates token on each request

### Request Headers
```
Authorization: Bearer <your_jwt_token>
```

---

## 📝 Data Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  profilePicture: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  category: String,
  featuredImage: String,
  description: String,
  tags: [String],
  likes: Number,
  likedBy: [ObjectId],
  views: Number,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  user: ObjectId (ref: User),
  blog: ObjectId (ref: Blog),
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Features in Detail

### 1. User Registration
```javascript
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

### 2. Create Blog Post
```javascript
POST /api/blogs
Headers: Authorization: Bearer <token>
{
  "title": "Introduction to React",
  "content": "React is a JavaScript library...",
  "category": "Programming",
  "description": "Short description",
  "tags": ["react", "javascript"],
  "featuredImage": "https://image-url.com/image.jpg"
}
```

### 3. Search & Filter
```javascript
GET /api/blogs?search=react&category=Programming&page=1&limit=10
```

### 4. Like Blog
```javascript
POST /api/blogs/:id/like
Headers: Authorization: Bearer <token>
```

### 5. Add Comment
```javascript
POST /api/comments/:blogId
Headers: Authorization: Bearer <token>
{
  "message": "Great article!"
}
```

---

## 🎯 Usage Examples

### Example 1: Create and Publish a Blog

1. User logs in
2. Clicks "Create Blog"
3. Fills form with blog details
4. Submits to `POST /api/blogs`
5. Blog appears on homepage

### Example 2: Search for Blogs

1. User types in search bar
2. JavaScript calls `GET /api/blogs?search=query`
3. Results displayed in real-time
4. User can filter by category

### Example 3: Interact with Posts

1. User views blog detail page
2. Clicks like button
3. Frontend calls `POST /api/blogs/:id/like`
4. Like count updates
5. User can add comments
6. Comments appear below post

---

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large**: > 1024px

---

## 🔒 Security Features

✅ **Password Hashing** - bcrypt with salt rounds
✅ **JWT Tokens** - Secure token-based authentication
✅ **Input Validation** - Server-side validation
✅ **CORS** - Cross-origin protection
✅ **Protected Routes** - Auth middleware
✅ **Authorization** - Users can only modify their own content

---

## 🌟 Bonus Features

Consider adding these enhancements:

- ✨ **Dark Mode Toggle** - Complete dark theme support
- ✨ **Rich Text Editor** - TinyMCE or similar
- ✨ **Image Upload** - Upload to cloud storage
- ✨ **Social Sharing** - Share on social media
- ✨ **Email Notifications** - Comment notifications
- ✨ **Reading Time** - Auto-calculate read time
- ✨ **Draft Posts** - Save drafts
- ✨ **Related Articles** - Suggest similar posts
- ✨ **Analytics Dashboard** - Track blog performance
- ✨ **PWA Support** - Progressive Web App

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can register with valid email
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] User can create blog post
- [ ] User can edit own blog
- [ ] User cannot edit others' blogs
- [ ] User can delete own blog
- [ ] User can search blogs
- [ ] User can filter by category
- [ ] User can like/unlike blogs
- [ ] User can comment on blogs
- [ ] Comments display in real-time
- [ ] Website is responsive on mobile

---

## 📊 Database Queries

### Get trending blogs
```javascript
Blog.find({ published: true })
  .sort({ likes: -1, views: -1 })
  .limit(10)
```

### Search blogs
```javascript
Blog.find({ $text: { $search: "react" } })
```

### Get user's blogs
```javascript
Blog.find({ author: userId })
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel client/
```

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB is installed

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API_URL in `api.js`

### JWT Token Expired
- Token expires after 7 days
- User needs to login again
- Re-implemented auto-refresh (optional)

### Images Not Loading
- Ensure image URLs are valid
- Check CORS for external images
- Use HTTPS URLs where possible

---

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Explained](https://jwt.io)
- [React Documentation](https://react.dev)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💡 Tips for Development

- **Environment Variables** - Never commit `.env` files
- **Error Handling** - Add try-catch blocks
- **Validation** - Always validate user input
- **Testing** - Write tests for critical features
- **Documentation** - Keep code well-commented
- **Security** - Use HTTPS in production
- **Performance** - Optimize database queries
- **SEO** - Add meta tags and schema markup

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:
- ✅ Full-stack web development
- ✅ RESTful API design
- ✅ Database design with MongoDB
- ✅ User authentication with JWT
- ✅ CRUD operations
- ✅ Frontend-backend communication
- ✅ Responsive web design
- ✅ Security best practices

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console for errors
4. Search existing issues
5. Create a new issue with details

---

## 🙏 Acknowledgments

Thanks to all contributors and the open-source community for making this possible!

---

**Happy Blogging! 🚀📝**
