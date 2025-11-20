# MongoDB Atlas + Backend Quick Reference

## MongoDB Atlas Setup (FIRST DO THIS)

### 1. Create Account & Cluster

```
1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up → Create Project → Create Cluster (Free Tier)
3. Wait 2-3 minutes for cluster to deploy
```

### 2. Create Database User

```
1. Go to: Database Access → Add New Database User
2. Username: fitnessfreakuser
3. Password: YourStrongPassword123!
4. Database User Privileges: Read and write to any database
5. Click Add User
```

### 3. Whitelist IP Address

```
1. Go to: Network Access → Add IP Address
2. Click: Add Current IP Address
   OR
   Use: 0.0.0.0/0 (for development - less secure)
3. Click Confirm
```

### 4. Get Connection String

```
1. Click: Connect (next to cluster name)
2. Select: Connect Your Application
3. Driver: Node.js
4. Version: 4.0 or later
5. Copy the connection string
```

### 5. Connection String Format

```
mongodb+srv://fitnessfreakuser:PASSWORD@cluster0.mongodb.net/fitnessfreak?retryWrites=true&w=majority
```

Replace:

- `PASSWORD` → Your database user password
- `cluster0` → Your actual cluster name

---

## Backend Setup (AFTER MongoDB is ready)

### 1. Navigate to Backend

```bash
cd c:/Users/manmo/FitnessFreak/backend
```

### 2. Create .env File

```bash
cp .env.example .env
```

### 3. Edit .env with Your Values

```env
MONGODB_URI=mongodb+srv://fitnessfreakuser:PASSWORD@cluster0.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_random_secret_key_here_12345
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## Testing the Backend

### Check Server Health

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Signup (using Postman or curl)

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

---

## Common Issues & Solutions

| Issue              | Solution                                             |
| ------------------ | ---------------------------------------------------- |
| `ECONNREFUSED`     | Check MongoDB URI in .env, ensure cluster is running |
| `Bad credentials`  | Verify database user password in MongoDB Atlas       |
| `Timeout`          | Check IP is whitelisted in Network Access            |
| `CORS error`       | Ensure frontend is on `http://localhost:5173`        |
| `Module not found` | Run `npm install` in backend directory               |

---

## Project Structure

```
FitnessFreak/
├── FitnessFreak/          ← Frontend (React)
│   └── npm run dev
│
└── backend/               ← Backend (Node.js)
    ├── npm run dev        ← Start here
    ├── server.js
    ├── package.json
    ├── .env              ← Add your credentials here
    ├── models/           ← Database schemas
    ├── controllers/      ← Business logic
    ├── routes/           ← API endpoints
    └── config/           ← Database connection
```

---

## API Endpoints Cheat Sheet

### Auth

- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login (get token)
- `GET /api/auth/profile` - Get user info
- `PUT /api/auth/profile` - Update profile

### Workouts

- `POST /api/workouts` - Create
- `GET /api/workouts` - List all
- `PUT /api/workouts/:id` - Update
- `DELETE /api/workouts/:id` - Delete

### Progress

- `POST /api/progress` - Record
- `GET /api/progress` - Get all
- `GET /api/progress/latest` - Get latest

### Coaches

- `GET /api/coaches` - List all
- `POST /api/coaches` - Become coach
- `PUT /api/coaches` - Update profile

### Others

- `GET /api/supplements` - Browse supplements
- `POST /api/feedback` - Leave review

---

## Running Both Frontend + Backend

### Terminal 1: Backend

```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2: Frontend

```bash
cd FitnessFreak
npm run dev
# Runs on http://localhost:5173
```

---

## Key Credentials to Remember

```
MongoDB Atlas:
- Username: fitnessfreakuser
- Password: [Your password]
- Cluster: cluster0
- Database: fitnessfreak

JWT:
- Secret: [Random string in .env]
- Expiry: 7 days

Ports:
- Frontend: 5173
- Backend: 5000
```

---

## Documentation Files

After setup, read these files for details:

1. `backend/README.md` - Features overview
2. `backend/SETUP.md` - Detailed setup guide
3. `backend/API_TESTING.md` - All endpoints reference
4. `BACKEND_GUIDE.md` - Full integration guide

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Configure backend with .env
3. ✅ Start backend server (`npm run dev`)
4. ✅ Test with Postman or curl
5. 📝 Connect frontend to backend
6. 📝 Test full integration
7. 📝 Deploy to production

---

## Useful Commands

```bash
# Backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check if port 5000 is available
netstat -ano | findstr :5000
```

---

## Frontend Integration Example

```javascript
// In your React component
const signup = async () => {
  const response = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  console.log("Signed up:", data.user);
};
```

---

**Status:** ✅ Backend Ready | 🔄 MongoDB Configured | ⏳ Frontend Integration Next
