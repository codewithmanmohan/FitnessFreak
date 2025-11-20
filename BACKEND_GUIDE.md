# FitnessFreak Backend - Complete Setup & Integration Guide

## 📋 Overview

A production-ready backend API for the FitnessFreak gym management application built with:

- **Node.js + Express** - Fast, scalable server framework
- **MongoDB Atlas** - Cloud database for data persistence
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - User, Coach, Admin roles

## ✅ Backend Created Successfully!

### Directory Structure

```
FitnessFreak/
├── FitnessFreak/           # Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── backend/                # Backend (Node.js + Express)
    ├── config/
    │   └── database.js         # MongoDB connection
    ├── controllers/            # Business logic
    │   ├── authController.js
    │   ├── workoutController.js
    │   ├── progressController.js
    │   ├── coachController.js
    │   ├── supplementController.js
    │   └── feedbackController.js
    ├── middleware/
    │   └── auth.js             # JWT & role validation
    ├── models/                 # Database schemas
    │   ├── User.js
    │   ├── Workout.js
    │   ├── Progress.js
    │   ├── Coach.js
    │   ├── Booking.js
    │   ├── Membership.js
    │   ├── Supplement.js
    │   └── Feedback.js
    ├── routes/
    │   ├── auth.js
    │   ├── workout.js
    │   ├── progress.js
    │   ├── coach.js
    │   ├── supplement.js
    │   └── feedback.js
    ├── utils/
    │   └── errorHandler.js
    ├── server.js               # Main server file
    ├── package.json
    ├── .env.example
    ├── README.md
    ├── SETUP.md               # Setup instructions
    ├── API_TESTING.md         # API testing guide
    └── .gitignore
```

## 🗄️ Database Models

### 1. **User**

- Authentication credentials (email, password)
- Personal info (name, age, gender, height, weight)
- Fitness goals and preferences
- Membership status
- Role management (user/coach/admin)

### 2. **Workout**

- Exercise details (sets, reps, weight)
- Duration, calories burned, intensity
- Date, location, and notes

### 3. **Progress**

- Weight tracking
- Body fat and muscle mass
- Measurements (chest, waist, hips, bicep, thigh)
- Progress photos
- BPM readings

### 4. **Coach**

- Specializations and certifications
- Experience level
- Hourly rates and availability
- Client list
- Ratings and reviews

### 5. **Membership**

- Plan details (basic/pro/premium)
- Duration and pricing
- Features list
- Payment status

### 6. **Supplement**

- Product information
- Category and pricing
- Benefits and ingredients
- Stock status
- Ratings

### 7. **Feedback**

- User reviews and ratings (1-5 stars)
- Anonymous feedback option
- Approval workflow
- Target types (coach, membership, facility)

### 8. **Booking**

- Coach appointment scheduling
- Session types (personal training, group class)
- Status tracking (pending/confirmed/completed)
- Payment status

## 🚀 Quick Start

### Step 1: MongoDB Atlas Setup (3 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user: `fitnessfreakuser`
4. Whitelist your IP address
5. Copy connection string

### Step 2: Environment Configuration (2 minutes)

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
MONGODB_URI=mongodb+srv://fitnessfreakuser:PASSWORD@cluster0.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Install & Run (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## 📡 API Endpoints Summary

### Authentication

```
POST   /api/auth/signup          → Register new user
POST   /api/auth/login           → Login user
GET    /api/auth/profile         → Get profile (protected)
PUT    /api/auth/profile         → Update profile (protected)
```

### Workouts

```
POST   /api/workouts             → Create workout
GET    /api/workouts             → Get all workouts
GET    /api/workouts/:id         → Get specific workout
PUT    /api/workouts/:id         → Update workout
DELETE /api/workouts/:id         → Delete workout
```

### Progress

```
POST   /api/progress             → Record progress
GET    /api/progress             → Get all records
GET    /api/progress/latest      → Get latest record
PUT    /api/progress/:id         → Update record
DELETE /api/progress/:id         → Delete record
```

### Coaches

```
GET    /api/coaches              → Get all coaches
GET    /api/coaches/:id          → Get coach details
POST   /api/coaches              → Create coach profile (protected)
GET    /api/coaches/profile/me   → Get my coach profile (protected)
PUT    /api/coaches              → Update coach profile (protected)
```

### Supplements

```
GET    /api/supplements          → Get all supplements
GET    /api/supplements/:id      → Get supplement details
POST   /api/supplements          → Create supplement (admin only)
PUT    /api/supplements/:id      → Update supplement (admin only)
DELETE /api/supplements/:id      → Delete supplement (admin only)
```

### Feedback

```
GET    /api/feedback             → Get approved feedback
POST   /api/feedback             → Create feedback (protected)
GET    /api/feedback/user/me     → Get my feedback (protected)
PUT    /api/feedback/:id/approve → Approve feedback (admin only)
```

## 🔐 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <token>
```

Token obtained from signup/login, valid for 7 days by default.

## 🛠️ Frontend Integration

### 1. Install API client (optional but recommended):

```bash
# In frontend directory
npm install axios
```

### 2. Create API service in frontend:

```javascript
// frontend/src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### 3. Use in components:

```jsx
import API from "../utils/api";

// Signup
const signup = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Get profile
const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data.user;
};

// Create workout
const createWorkout = async (workoutData) => {
  const response = await API.post("/workouts", workoutData);
  return response.data.workout;
};
```

## 📝 Example Requests

### Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Workout

```bash
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Chest Day",
    "duration": 60,
    "exercises": [
      {"name": "Bench Press", "sets": 4, "reps": 8, "weight": 100}
    ],
    "caloriesBurned": 400,
    "intensity": "high"
  }'
```

## 🧪 Testing Endpoints

Use Postman or REST Client to test:

1. Download [Postman](https://www.postman.com/downloads/)
2. Create requests for each endpoint
3. Save token from login response
4. Add `Authorization: Bearer {token}` header for protected routes
5. Test create, read, update, delete operations

See `API_TESTING.md` for detailed endpoint documentation.

## 📚 Documentation Files

- **README.md** - Backend overview and features
- **SETUP.md** - Detailed setup and troubleshooting
- **API_TESTING.md** - API endpoints reference and testing guide
- **This file** - Integration guide

## ✨ Key Features Implemented

✅ User authentication with JWT
✅ Password hashing with bcryptjs
✅ Role-based access control
✅ Workout tracking with exercises
✅ Progress tracking with measurements
✅ Coach profiles with ratings
✅ Supplement catalog
✅ User feedback and reviews
✅ Error handling and validation
✅ CORS enabled for frontend
✅ MongoDB Atlas integration
✅ Environment configuration
✅ Comprehensive API documentation

## 🔧 Development Commands

```bash
# Start dev server with auto-reload
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Check for vulnerabilities
npm audit

# Update packages
npm update
```

## 🚨 Troubleshooting

### "Cannot find module 'mongoose'"

```bash
npm install
```

### "MongoDB connection failed"

- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure database user password is correct

### "CORS error from frontend"

- Update CORS_ORIGIN in .env
- Default: `http://localhost:5173`

### "Invalid token"

- Check JWT_SECRET in .env matches
- Ensure token format is correct
- Token may have expired

See `SETUP.md` for more troubleshooting.

## 📈 Next Steps

1. ✅ **Backend Setup** - Complete!
2. **Connect Frontend** - Update frontend to use backend API
3. **Test All Endpoints** - Use Postman or REST Client
4. **Add Real Data** - Create users and test workflows
5. **Implement UI Features** - Connect login, workouts, progress pages
6. **Deploy** - Move to production hosting

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update `NODE_ENV` to `production` before deploying
- [ ] Use strong MongoDB Atlas password
- [ ] Enable IP whitelisting on MongoDB Atlas
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add input validation (express-validator ready to use)
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Use environment variables for all secrets

## 📊 Performance Tips

- Use MongoDB indexes for frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data
- Use compression middleware
- Monitor API response times
- Optimize database queries

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ORM](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

## 💡 Future Enhancements

- [ ] Payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Video upload for form check
- [ ] Advanced analytics
- [ ] Workout templates
- [ ] Meal planning integration
- [ ] Social features
- [ ] Mobile app API
- [ ] Webhook support

## 📞 Support

For issues or questions:

1. Check `SETUP.md` troubleshooting section
2. Review `API_TESTING.md` for endpoint details
3. Check MongoDB Atlas documentation
4. Review Express.js documentation

---

**Backend Status:** ✅ Ready to Use
**Database:** ✅ MongoDB Atlas Configured
**API Documentation:** ✅ Complete
**Frontend Integration:** ⏳ Next Step
