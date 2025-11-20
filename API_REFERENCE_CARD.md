# API Reference Card - Quick Lookup

## 🔗 API Base URL

```
http://localhost:5000/api
```

## 🔐 Authentication

### Login

```javascript
await authAPI.login({ email, password });
// Returns: { token, user }
// Response Code: 200
```

### Register

```javascript
await authAPI.register({ name, email, password });
// Returns: { token, user }
// Response Code: 201
```

### Get Profile (requires auth)

```javascript
await authAPI.getProfile();
// Returns: { user }
// Response Code: 200
```

### Logout

```javascript
authAPI.logout();
// Clears localStorage
```

---

## 👥 Coaches Endpoints

### Get All Coaches

```javascript
await coachesAPI.getAll();
// Returns: { data: [{_id, name, specialty, hourlyRate, ...}] }
// Response Code: 200
```

### Get Coach by ID

```javascript
await coachesAPI.getById(coachId);
// Returns: { data: {coach object} }
// Response Code: 200
```

### Create Coach (admin only)

```javascript
await coachesAPI.create({
  name,
  specialty,
  bio,
  hourlyRate,
  experience,
});
// Returns: { data: {coach object} }
// Response Code: 201
```

---

## 🏋️ Supplements Endpoints

### Get All Supplements

```javascript
await supplementsAPI.getAll();
// Returns: { data: [{_id, name, price, category, ...}] }
// Response Code: 200
```

### Get Supplement by ID

```javascript
await supplementsAPI.getById(supplementId);
// Returns: { data: {supplement object} }
// Response Code: 200
```

### Create Supplement (admin only)

```javascript
await supplementsAPI.create({
  name,
  price,
  category,
  description,
  stock,
});
// Returns: { data: {supplement object} }
// Response Code: 201
```

---

## 💪 Workouts Endpoints

### Get All Workouts

```javascript
await workoutsAPI.getAll();
// Returns: { data: [{_id, name, exercises, duration, ...}] }
// Response Code: 200
```

### Log Workout (requires auth)

```javascript
await workoutsAPI.logWorkout({
  workoutName,
  duration,
  caloriesBurned,
  exercises,
});
// Returns: { data: {logged workout} }
// Response Code: 201
```

### Get User Progress (requires auth)

```javascript
await progressAPI.getProgress();
// Returns: { data: [{date, weight, measurements, ...}] }
// Response Code: 200
```

---

## 📅 Bookings Endpoints

### Get Available Slots (requires auth)

```javascript
await bookingsAPI.getAvailableSlots(coachId);
// Returns: { data: [{date, time, available}] }
// Response Code: 200
```

### Create Booking (requires auth)

```javascript
await bookingsAPI.create({
  coachId,
  date,
  time,
  duration,
});
// Returns: { data: {booking} }
// Response Code: 201
```

### Get User Bookings (requires auth)

```javascript
await bookingsAPI.getAll();
// Returns: { data: [{_id, coachId, date, time, ...}] }
// Response Code: 200
```

### Cancel Booking (requires auth)

```javascript
await bookingsAPI.delete(bookingId);
// Returns: { success: true }
// Response Code: 200
```

---

## 💳 Plans/Memberships Endpoints

### Get All Plans

```javascript
await plansAPI.getAll();
// Returns: { data: [{_id, name, price, duration, features}] }
// Response Code: 200
```

### Get Plan by ID

```javascript
await plansAPI.getById(planId);
// Returns: { data: {plan object} }
// Response Code: 200
```

### Subscribe to Plan (requires auth)

```javascript
await plansAPI.subscribe(planId);
// Returns: { data: {subscription} }
// Response Code: 201
```

---

## 💬 Feedback Endpoints

### Submit Feedback (requires auth)

```javascript
await feedbackAPI.submit({
  rating,
  message,
});
// Returns: { data: {feedback} }
// Response Code: 201
```

### Get All Feedback (admin only)

```javascript
await feedbackAPI.getAll();
// Returns: { data: [{_id, userId, rating, message, date}] }
// Response Code: 200
```

### Delete Feedback (admin only)

```javascript
await feedbackAPI.delete(feedbackId);
// Returns: { success: true }
// Response Code: 200
```

---

## 🔍 Health Check

### Check Server Status

```javascript
await healthCheck();
// Returns: { success: true, message: "Server is running" }
// Response Code: 200
```

---

## 🎯 Response Formats

### Success Response (200/201)

```json
{
  "success": true,
  "data": {
    /* response object */
  },
  "message": "Operation successful"
}
```

### Error Response (400/500)

```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType"
}
```

---

## 🔑 Authentication Header

All authenticated requests include:

```
Authorization: Bearer {JWT_TOKEN}
```

Token is automatically added by `apiCall()` function when `requiresAuth: true`

---

## 📊 Common Request Bodies

### Login/Register

```javascript
{
  email: "user@example.com",
  password: "securePassword123"
}
```

### Create Booking

```javascript
{
  coachId: "coach_id_here",
  date: "2024-12-25",
  time: "10:00 AM",
  duration: 60
}
```

### Submit Feedback

```javascript
{
  rating: 5,
  message: "Great experience!"
}
```

### Log Workout

```javascript
{
  workoutName: "Chest Day",
  duration: 60,
  caloriesBurned: 400,
  exercises: ["Bench Press", "Incline Dumbbell Press"]
}
```

---

## ✅ Status Codes

| Code | Meaning      | Common Cause             |
| ---- | ------------ | ------------------------ |
| 200  | OK           | Successful GET/PUT       |
| 201  | Created      | Successful POST          |
| 400  | Bad Request  | Invalid input            |
| 401  | Unauthorized | Missing/invalid token    |
| 403  | Forbidden    | Insufficient permissions |
| 404  | Not Found    | Resource doesn't exist   |
| 409  | Conflict     | Email already registered |
| 500  | Server Error | Database/server issue    |

---

## 💡 Usage Examples

### Example 1: Login Flow

```javascript
import { authAPI } from "../utils/api";

const handleLogin = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    localStorage.setItem("authToken", response.token);
    navigate("/home");
  } catch (error) {
    setError(error.message);
  }
};
```

### Example 2: Fetch with Error Handling

```javascript
import { coachesAPI } from "../utils/api";

useEffect(() => {
  coachesAPI
    .getAll()
    .then((res) => setCoaches(res.data))
    .catch((err) => setError(err.message));
}, []);
```

### Example 3: Protected Request

```javascript
import { feedbackAPI } from "../utils/api";

const submitFeedback = async (rating, message) => {
  try {
    await feedbackAPI.submit({ rating, message });
    // Token automatically included
    showSuccess("Feedback submitted!");
  } catch (error) {
    showError(error.message);
  }
};
```

### Example 4: Bookmark Check

```javascript
// Check if authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Get user data
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name); // Access user info
```

---

## 🚨 Error Handling Pattern

```javascript
try {
  const data = await apiFunction();
  setData(data.data);
} catch (error) {
  console.error("API Error:", error);
  setError(error.message);
  // Show error to user
}
```

---

## 📝 Notes

- All dates should be in `YYYY-MM-DD` format
- Times should be in `HH:MM` or `HH:MM AM/PM` format
- Prices are in USD
- Rating scale: 1-5 stars
- Page numbers start at 1
- Limit defaults to 10 items

---

## 🔗 Quick Links

- API Service: `src/utils/api.js`
- Full Docs: `FRONTEND_BACKEND_INTEGRATION.md`
- Examples: Component files with `useEffect` hooks
- Troubleshooting: `QUICK_START_INTEGRATION.md`

---

**Print this card for quick reference!** 🖨️
