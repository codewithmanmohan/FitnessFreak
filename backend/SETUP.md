# Backend Setup Guide

## Quick Start

### 1. MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Create a cluster (select free tier)
5. Create a database user:

   - Go to Database Access
   - Click "Add New Database User"
   - Username: `fitnessfreakuser`
   - Password: Create a strong password
   - Database User Privileges: "Read and write to any database"

6. Whitelist your IP:

   - Go to Network Access
   - Click "Add IP Address"
   - Click "Add Current IP Address" or use "0.0.0.0/0" for development

7. Get connection string:
   - Click "Connect"
   - Select "Connect your application"
   - Choose "Node.js" driver
   - Copy the connection string

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update `.env` with your values:

```env
MONGODB_URI=mongodb+srv://fitnessfreakuser:YOUR_PASSWORD@cluster0.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

Replace:

- `YOUR_PASSWORD` - Your MongoDB Atlas password
- `cluster0` - Your actual cluster name
- `your_super_secret_key_change_this_in_production` - Generate a random secret key

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Server

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

### 5. Verify Setup

Test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Should return:

```json
{
  "success": true,
  "message": "Server is running"
}
```

## MongoDB Atlas Connection Issues

If you get connection errors:

1. **Check IP Whitelist:**

   - Make sure your IP is whitelisted in Network Access
   - For development, you can use `0.0.0.0/0` (allow all IPs)

2. **Check Credentials:**

   - Verify username and password in connection string
   - Special characters in password need URL encoding

3. **Check Network:**

   - Ensure you have internet connection
   - Check if firewall is blocking connections

4. **Test Connection:**

```bash
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.log('✗ Connection failed:', err.message));
"
```

## Frontend Integration

Update your frontend API calls to use the backend:

```javascript
// Set API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Example: Signup
const response = await fetch(`${API_BASE_URL}/auth/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firstName, lastName, email, password }),
});

// Example: With JWT token
const response = await fetch(`${API_BASE_URL}/auth/profile`, {
  headers: { Authorization: `Bearer ${token}` },
});
```

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── middleware/      # Auth, error handling
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── utils/           # Helper functions
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env.example     # Environment variables template
└── README.md        # API documentation
```

## Creating Sample Data

Create a `seed.js` file to populate the database:

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Supplement from "./models/Supplement.js";

dotenv.config();

const seedDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing data
  await User.deleteMany({});
  await Supplement.deleteMany({});

  // Create sample supplements
  const supplements = await Supplement.create([
    {
      name: "Whey Protein",
      description: "High-quality whey protein powder",
      category: "protein",
      brand: "Gold Standard",
      price: 39.99,
      servingSize: "30g",
      servingsPerContainer: 30,
      benefits: ["Muscle growth", "Recovery", "Strength"],
      ingredients: ["Whey protein isolate", "Cocoa", "Sugar"],
      rating: 4.5,
    },
  ]);

  console.log("✓ Database seeded successfully");
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
```

Run with: `node seed.js`

## Debugging

Enable MongoDB debug logging:

```bash
DEBUG=mongoose:* npm run dev
```

Check server logs for errors and warnings.

## Production Deployment

### For Heroku:

1. Install Heroku CLI
2. Set environment variables:

```bash
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
```

3. Deploy:

```bash
git push heroku main
```

### For other platforms:

- Set environment variables in your hosting platform
- Use `NODE_ENV=production`
- Use a production-grade database

## Common Errors

| Error               | Solution                                       |
| ------------------- | ---------------------------------------------- |
| `ECONNREFUSED`      | MongoDB not running or connection string wrong |
| `ValidationError`   | Check required fields in request body          |
| `CastError`         | Invalid MongoDB ObjectId format                |
| `JsonWebTokenError` | Token expired or invalid JWT secret            |
| `CORS error`        | Update CORS_ORIGIN in .env                     |

## Next Steps

1. ✅ Backend setup complete
2. Connect frontend to backend APIs
3. Test all endpoints with Postman
4. Implement additional features
5. Deploy to production
