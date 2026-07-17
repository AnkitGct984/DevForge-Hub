# Deployment Guide - Blog Website

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Frontend**
```bash
cd client
vercel
```

3. **Configure Environment**
   - Set API URL to your backend URL
   - Update `js/api.js` with backend endpoint

### Option 2: Deploy to Netlify

1. **Connect GitHub Repository**
   - Push to GitHub
   - Go to netlify.com
   - Connect your repository

2. **Build Settings**
   - Build command: (leave empty)
   - Publish directory: `client`

3. **Environment Variables**
   - Set `REACT_APP_API_URL` if needed

### Option 3: Deploy to GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/blog-website",
"deploy": "gh-pages -d client"

npm run deploy
```

---

## Backend Deployment

### Option 1: Deploy to Render

1. **Push code to GitHub**

2. **Create Render Account**
   - Go to render.com
   - Sign in with GitHub

3. **Create New Web Service**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`

4. **Environment Variables**
   - Add all `.env` variables in Render dashboard
   - Include MongoDB connection string

5. **Deploy**
   - Render automatically deploys on push

### Option 2: Deploy to Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Deploy**
```bash
railway up
```

3. **Set Environment Variables**
```bash
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set JWT_SECRET="your_jwt_secret"
```

### Option 3: Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm i -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create App**
```bash
heroku create your-app-name
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
```

5. **Deploy**
```bash
git push heroku main
```

---

## Database Deployment

### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to mongodb.com/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier
   - Select region
   - Create cluster

3. **Create Database User**
   - Set username and password
   - Note the password

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/blog_website?retryWrites=true&w=majority
   ```

5. **Update `.env`**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_website
   ```

### Option 2: Self-Hosted MongoDB

1. **Set up MongoDB server**
2. **Update connection string**
```
MONGODB_URI=mongodb://username:password@host:27017/blog_website
```

---

## CORS Configuration for Deployed Sites

Update `server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:8000',
    'https://yourdomain.com',
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

---

## Production Checklist

- [ ] Update JWT_SECRET to strong random string
- [ ] Set NODE_ENV to production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Enable error logging
- [ ] Set up monitoring/alerting
- [ ] Update API URL in frontend
- [ ] Test all features on deployed site
- [ ] Set up SSL certificate
- [ ] Configure custom domain
- [ ] Enable rate limiting
- [ ] Set up CI/CD pipeline

---

## Performance Optimization

### Frontend
- Minify CSS and JavaScript
- Compress images
- Enable gzip compression
- Use CDN for static files
- Lazy load images
- Cache static assets

### Backend
- Enable caching
- Optimize database queries
- Use indexes
- Implement pagination
- Compress responses
- Use load balancing

---

## Monitoring & Logging

### Recommended Services
- **Sentry** - Error tracking
- **LogRocket** - Frontend monitoring
- **New Relic** - Performance monitoring
- **DataDog** - Infrastructure monitoring
- **Cloudflare** - CDN and DDoS protection

---

## Domain Setup

1. **Register Domain**
   - GoDaddy, Namecheap, etc.

2. **Configure DNS**
   - Point to deployment platform

3. **SSL Certificate**
   - Usually automatic with deployment

4. **Email Setup**
   - Configure MX records if needed

---

## Backup & Recovery

- Enable automated MongoDB backups
- Regular code repository backups
- Document recovery procedures
- Test recovery process monthly

---

## Security Measures

- Use strong passwords
- Enable 2FA
- Regularly update dependencies
- Security audit quarterly
- Monitor for vulnerabilities
- Rate limit API endpoints
- Validate all user inputs
- Use environment variables

---

## Post-Deployment

1. Monitor application logs
2. Track error rates
3. Monitor performance metrics
4. User feedback collection
5. Regular maintenance
6. Security patches
7. Feature updates
8. Performance optimization

---

## Rollback Plan

If deployment fails:
```bash
# Render
git revert <commit-hash>
git push

# Heroku
heroku rollback

# Railway
railway redeploy
```

---

## Support & Resources

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://railway.app/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Node.js Production](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
