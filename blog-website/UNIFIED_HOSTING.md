<!-- Optional: Serve frontend as static files from Express -->
<!-- This file contains instructions for hosting frontend from the backend -->

# Unified Hosting Setup (Optional)

If you want to serve the frontend directly from Express backend:

## Steps:

### 1. Copy Frontend Files
```bash
# Copy client folder into server folder
cp -r client/public server/public
cp -r client/css server/public/css
cp -r client/js server/public/js
cp client/index.html server/public/index.html
```

### 2. Update server.js
Add this after middleware setup:

```javascript
// Serve static files
app.use(express.static('public'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
```

### 3. Update API URL in frontend
In `client/js/api.js` or `public/js/api.js`:
```javascript
const API_URL = '/api';  // Relative URL
```

### 4. Start Server
```bash
npm start
```

Access at: `http://localhost:5000`

---

## Benefits:
- Single server for frontend and backend
- Easier deployment
- No CORS issues
- One domain for both services

## Drawbacks:
- Frontend changes require server restart
- Larger server package
- No frontend caching benefits

---

## Production Setup

For production, consider:
1. Deploy frontend to CDN (Vercel, Netlify)
2. Deploy backend to cloud (Heroku, Railway, Render)
3. Use environment-specific API URLs
4. Enable CORS for domain
