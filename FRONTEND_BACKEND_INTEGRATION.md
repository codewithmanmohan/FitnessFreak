# Frontend-Backend Integration Guide

## Overview

The FitnessFreak frontend (React + Vite) is now fully integrated with the backend (Node.js + Express). All API calls are centralized in the `utils/api.js` file.

## Architecture

### API Service Layer (`src/utils/api.js`)

- **Base URL**: `http://localhost:5000/api` (configurable via `.env`)
- **Authentication**: Uses JWT tokens stored in `localStorage`
- **Request Format**: JSON
- **Response Format**: JSON

### Key Components Updated

1. **Login.jsx** - User authentication with token storage
2. **Signup.jsx** - User registration
3. **Coaches.jsx** - Fetch and display coaches from database
4. **Supplements.jsx** - Fetch and display supplements with filtering
5. **Feedback.jsx** - Submit user feedback

## How to Use

### 1. **Making API Calls**

Import the API functions you need:

```javascript
import { authAPI, coachesAPI, supplementsAPI } from "../utils/api";

// Login
const response = await authAPI.login({ email, password });
localStorage.setItem("authToken", response.token);

// Fetch coaches
const data = await coachesAPI.getAll();

// Create booking
await bookingsAPI.create({ coachId, date, time });
```

### 2. **Authentication Flow**

```javascript
// 1. Login/Register - Get token
const response = await authAPI.login(credentials);
localStorage.setItem("authToken", response.token);

// 2. Make authenticated requests
const profile = await authAPI.getProfile(); // Automatically sends token

// 3. Logout
localStorage.removeItem("authToken");
```

### 3. **Error Handling**

```javascript
try {
  const data = await coachesAPI.getAll();
  setCoaches(data.data);
} catch (err) {
  setError(err.message);
  console.error(err);
}
```

## Available API Endpoints

### Authentication (`authAPI`)

- `login(credentials)` - POST /users/login
- `register(userData)` - POST /users/register
- `getProfile()` - GET /users/profile (requires auth)
- `updateProfile(userData)` - PUT /users/profile (requires auth)
- `logout()` - Clears local storage

### Coaches (`coachesAPI`)

- `getAll()` - GET /coaches
- `getById(id)` - GET /coaches/:id
- `create(coachData)` - POST /coaches (admin only)
- `update(id, coachData)` - PUT /coaches/:id (admin only)
- `delete(id)` - DELETE /coaches/:id (admin only)

### Workouts (`workoutsAPI`)

- `getAll()` - GET /workouts
- `getById(id)` - GET /workouts/:id
- `create(workoutData)` - POST /workouts (requires auth)
- `update(id, workoutData)` - PUT /workouts/:id (requires auth)
- `delete(id)` - DELETE /workouts/:id (requires auth)
- `logWorkout(workoutData)` - POST /workouts/log (requires auth)

### Memberships/Plans (`plansAPI`)

- `getAll()` - GET /plans
- `getById(id)` - GET /plans/:id
- `create(planData)` - POST /plans (admin only)
- `subscribe(planId)` - POST /plans/:id/subscribe (requires auth)

### Supplements (`supplementsAPI`)

- `getAll()` - GET /supplements
- `getById(id)` - GET /supplements/:id
- `create(supplementData)` - POST /supplements (admin only)
- `update(id, supplementData)` - PUT /supplements/:id (admin only)
- `delete(id)` - DELETE /supplements/:id (admin only)

### Bookings (`bookingsAPI`)

- `getAll()` - GET /bookings (requires auth)
- `getById(id)` - GET /bookings/:id (requires auth)
- `create(bookingData)` - POST /bookings (requires auth)
- `update(id, bookingData)` - PUT /bookings/:id (requires auth)
- `delete(id)` - DELETE /bookings/:id (requires auth)
- `getAvailableSlots(coachId)` - GET /bookings/slots/:coachId

### Progress (`progressAPI`)

- `getProgress()` - GET /progress (requires auth)
- `log(progressData)` - POST /progress (requires auth)
- `getById(id)` - GET /progress/:id (requires auth)
- `update(id, progressData)` - PUT /progress/:id (requires auth)
- `delete(id)` - DELETE /progress/:id (requires auth)

### Feedback (`feedbackAPI`)

- `submit(feedbackData)` - POST /feedback (requires auth)
- `getAll()` - GET /feedback (admin only)
- `delete(id)` - DELETE /feedback/:id (admin only)

## Environment Configuration

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend `.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## Running Both Services

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Server runs on: `http://localhost:5000`

### Terminal 2: Frontend

```bash
cd FitnessFreak
npm run dev
```

App runs on: `http://localhost:5173`

## Troubleshooting

### CORS Errors

If you see CORS errors, ensure:

1. Backend is running on `http://localhost:5000`
2. Frontend is running on `http://localhost:5173`
3. Backend `.env` has `CORS_ORIGIN=http://localhost:5173`
4. Backend has CORS middleware configured

### Authentication Failures

1. Verify MongoDB is connected: Check backend logs for "MongoDB Connected"
2. Check token is stored: `localStorage.getItem('authToken')` in console
3. Ensure API endpoint exists: Check backend logs for routes

### Component Not Loading Data

1. Check console for API errors
2. Verify MongoDB is populated with test data
3. Check network tab in Dev Tools for API requests
4. Ensure user is authenticated if endpoint requires auth

## Next Steps

1. **Update more components**:

   - Availability.jsx - Book coaches
   - Plans.jsx - View membership plans
   - BpmMeter.jsx - Log workouts

2. **Add state management** (optional):

   - Consider Redux or Context API for global auth state
   - Store user data globally for use across components

3. **Add form validation**:

   - Email validation
   - Password strength checking
   - Required field validation

4. **Implement payment integration**:
   - Add Stripe/PayPal for subscription payments
   - Handle payment confirmations

## Testing

### Test Login

1. Click "Login" button
2. Use valid credentials (must be registered in MongoDB)
3. Check browser console for token storage
4. Verify "MongoDB Connected" in backend logs

### Test API Calls

In browser console:

```javascript
// Test API
fetch("http://localhost:5000/api/health")
  .then((r) => r.json())
  .then((d) => console.log(d));
```

### Test with Postman

1. Create POST request to `http://localhost:5000/api/users/login`
2. Add JSON body: `{ "email": "test@example.com", "password": "password" }`
3. Copy token from response
4. Use Bearer token in Authorization header for other requests
