# API Test Examples

## Base URL
```
http://localhost:5000/api
```

## 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 3. Create Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "title": "Introduction to Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8...",
    "category": "Programming",
    "description": "A beginner guide to Node.js",
    "tags": ["nodejs", "javascript"],
    "featuredImage": "https://example.com/image.jpg"
  }'
```

## 4. Get All Blogs
```bash
curl -X GET "http://localhost:5000/api/blogs?page=1&limit=10"
```

## 5. Get Blogs by Category
```bash
curl -X GET "http://localhost:5000/api/blogs?category=Programming"
```

## 6. Search Blogs
```bash
curl -X GET "http://localhost:5000/api/blogs?search=javascript"
```

## 7. Get Single Blog
```bash
curl -X GET http://localhost:5000/api/blogs/507f1f77bcf86cd799439011
```

## 8. Like Blog
```bash
curl -X POST http://localhost:5000/api/blogs/507f1f77bcf86cd799439011/like \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## 9. Add Comment
```bash
curl -X POST http://localhost:5000/api/comments/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "message": "Great article!"
  }'
```

## 10. Get Comments
```bash
curl -X GET http://localhost:5000/api/comments/507f1f77bcf86cd799439011
```

## 11. Update Profile
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "username": "john_doe_updated",
    "bio": "JavaScript developer",
    "profilePicture": "https://example.com/profile.jpg"
  }'
```

## 12. Update Blog
```bash
curl -X PUT http://localhost:5000/api/blogs/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "title": "Updated Title",
    "content": "Updated content..."
  }'
```

## 13. Delete Blog
```bash
curl -X DELETE http://localhost:5000/api/blogs/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## 14. Delete Comment
```bash
curl -X DELETE http://localhost:5000/api/comments/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Error Responses

### Validation Error
```json
{
  "message": "All fields are required"
}
```

### Authentication Error
```json
{
  "message": "Invalid token"
}
```

### Authorization Error
```json
{
  "message": "Not authorized to update this blog"
}
```

### Not Found Error
```json
{
  "message": "Blog not found"
}
```

---

## Tips
- Always include `Authorization` header with token for protected routes
- Token format: `Bearer <your_jwt_token>`
- Replace dummy IDs and tokens with real ones
- Test using Postman, Insomnia, or curl commands
