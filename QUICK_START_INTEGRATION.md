# Quick Start: Frontend-Backend Integration

## 🚀 Start Both Servers

### Backend

```bash
cd backend
npm run dev
```

✅ Watch for: `Server is running on port 5000`
✅ Watch for: `MongoDB Connected: cluster0.xxxxx.mongodb.net`

### Frontend

```bash
cd FitnessFreak
npm run dev
```

✅ Open: `http://localhost:5173`

## ✅ What's Connected

| Component   | API Endpoint         | Status  |
| ----------- | -------------------- | ------- |
| Login       | POST /users/login    | ✅ Done |
| Signup      | POST /users/register | ✅ Done |
| Coaches     | GET /coaches         | ✅ Done |
| Supplements | GET /supplements     | ✅ Done |
| Feedback    | POST /feedback       | ✅ Done |

## 🧪 Test It

### 1. Register New User

- Go to `http://localhost:5173/signup`
- Fill form and submit
- Should redirect to home if successful

### 2. Login

- Go to `http://localhost:5173/login`
- Use credentials from signup
- Check localStorage for `authToken`

### 3. View Coaches

- Go to `http://localhost:5173/coaches`
- Should see coaches from MongoDB
- Click "Book" to book a session

### 4. Browse Supplements

- Go to `http://localhost:5173/supplements`
- Search and filter products
- Add to cart

### 5. Submit Feedback

- Go to `http://localhost:5173/feedback`
- Rate and submit feedback
- See success message

## 🔧 API Usage

### In Your Components

```javascript
// Import API functions
import { authAPI, coachesAPI, supplementsAPI } from "../utils/api";

// Fetch data
useEffect(() => {
  coachesAPI
    .getAll()
    .then((res) => setCoaches(res.data))
    .catch((err) => setError(err.message));
}, []);

// Post data with authentication
await feedbackAPI.submit({ rating: 5, message: "Great app!" });

// Login
await authAPI.login({ email, password });
localStorage.setItem("authToken", response.token);
```

## 📝 Environment Setup

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend `.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitnessfreak
PORT=5000
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

## ⚡ Key Features

✅ **JWT Authentication** - Secure token-based auth
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Spinners for async operations
✅ **Protected Routes** - Check authentication before booking
✅ **Real Data** - Fetches from MongoDB
✅ **Search & Filter** - Supplements with live search

## 📂 Key Files

| File                             | Purpose                  |
| -------------------------------- | ------------------------ |
| `src/utils/api.js`               | Central API client (NEW) |
| `src/components/Login.jsx`       | Login with real API      |
| `src/components/Signup.jsx`      | Register with real API   |
| `src/components/Coaches.jsx`     | Fetch coaches list       |
| `src/components/Supplements.jsx` | Fetch supplements        |
| `src/components/Feedback.jsx`    | Submit feedback          |
| `.env`                           | Frontend config (NEW)    |

## 🐛 Troubleshooting

### Backend not connecting to MongoDB?

```
Error: querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net
```

**Solution:** Update `backend/.env` with valid MongoDB URI from Atlas

### CORS error?

```
Access to XMLHttpRequest blocked by CORS
```

**Solution:**

1. Ensure backend is running
2. Check `CORS_ORIGIN=http://localhost:5173` in backend `.env`
3. Restart backend

### API returns 404?

**Solution:** Verify backend routes exist in `backend/routes/`

### Token not working?

**Solution:**

1. Check localStorage for `authToken`
2. Try logging in again
3. Check backend JWT_SECRET in .env

## 📚 Documentation

- **Full API Docs**: `FRONTEND_BACKEND_INTEGRATION.md`
- **Integration Details**: `FRONTEND_INTEGRATION_SUMMARY.md`
- **Backend Setup**: `MONGODB_SETUP.md`

## 🎯 Next Steps

- [ ] Test all 5 connected components
- [ ] Add test data to MongoDB
- [ ] Update Availability.jsx with booking API
- [ ] Update Plans.jsx with membership API
- [ ] Add loading skeletons
- [ ] Implement toast notifications

---

**Everything is ready!** Start the servers and test. 🚀
