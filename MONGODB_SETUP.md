🔧 MONGODB ATLAS SETUP - STEP BY STEP GUIDE
═══════════════════════════════════════════════════════════════════════

✅ ISSUE FIXED:

- Removed deprecated MongoDB driver options (useNewUrlParser, useUnifiedTopology)
- Updated .env.example with proper template

⚠️ CURRENT ISSUE:

- MongoDB connection failed: ENOTFOUND \_mongodb.\_tcp.cluster0.mongodb.net
- This means your .env file doesn't have a valid MongoDB URI
- You need to set up MongoDB Atlas and add the connection string

📋 MONGODB ATLAS SETUP (Follow These Steps):
═════════════════════════════════════════════════════════════════════

STEP 1: Create MongoDB Atlas Account
──────────────────────────────────────

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or Sign Up
3. Create an account with your email
4. Verify your email address
5. Complete the welcome survey (optional)

STEP 2: Create a New Project
─────────────────────────────

1. Click "New Project"
2. Enter project name: "FitnessFreak"
3. Select billing details
4. Click "Create Project"

STEP 3: Create a Cluster
────────────────────────

1. Click "Build a Database"
2. Select "M0 Free" (Always Free tier)
3. Choose your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Select region closest to you
5. Click "Create Cluster"
6. ⏳ Wait 2-3 minutes for cluster to deploy

STEP 4: Create Database User
──────────────────────────────

1. In MongoDB Atlas, go to: Database Access
2. Click "Add New Database User"
3. Fill in:
   - Username: fitnessfreakuser
   - Password: Choose a strong password (or use autogenerate)
   - Copy and save the password safely!
4. Database User Privileges: "Read and write to any database"
5. Click "Add User"

STEP 5: Whitelist Your IP Address
───────────────────────────────────

1. Go to: Network Access
2. Click "Add IP Address"
3. Either:
   Option A: Click "Add Current IP Address" (recommended)
   Option B: Enter "0.0.0.0/0" (less secure - allow all IPs)
4. Click "Confirm"

STEP 6: Get Your Connection String
────────────────────────────────────

1. Go to: Databases (or Clusters)
2. Click "Connect" next to your cluster
3. Select "Connect Your Application"
4. Choose:
   - Driver: Node.js
   - Version: 4.0 or later
5. Copy the connection string
6. The string will look like:
   mongodb+srv://fitnessfreakuser:PASSWORD@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

STEP 7: Update Your .env File
──────────────────────────────

1. Open: backend/.env (create it from .env.example if it doesn't exist)
2. Find the line: MONGODB_URI=
3. Replace with your connection string
4. Replace:
   - PASSWORD → Your actual database user password
   - /myFirstDatabase → /fitnessfreak
5. Final URL should look like:
   mongodb+srv://fitnessfreakuser:YourPassword123@cluster0.xxxxx.mongodb.net/fitnessfreak?retryWrites=true&w=majority

✅ FINAL VERIFICATION:
═════════════════════════════════════════════════════════════════════

Your .env file should have:
────────────────────────────
MONGODB_URI=mongodb+srv://fitnessfreakuser:YourPassword@cluster0.xxxxx.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173

🚀 START THE SERVER:
═════════════════════════════════════════════════════════════════════

1. Make sure you're in the backend directory:
   cd backend

2. Start the server:
   npm run dev

3. You should see:
   ✓ MongoDB Connected: cluster0.xxxxx.mongodb.net
   ✓ Server is running on port 5000
   ✓ Environment: development

🧪 TEST THE CONNECTION:
═════════════════════════════════════════════════════════════════════

1. Open a new terminal (keep server running)

2. Test health endpoint:
   curl http://localhost:5000/api/health

3. Should return:
   {"success": true, "message": "Server is running"}

4. Test signup:
   curl -X POST http://localhost:5000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

5. Should return:
   {"success": true, "message": "User registered successfully", "token": "..."}

⚠️ COMMON MISTAKES:
═════════════════════════════════════════════════════════════════════

❌ Forgot to update .env file
Fix: Edit backend/.env and add correct MongoDB URI

❌ Password contains special characters not URL encoded
Fix: URL encode password or generate new one without special chars
Example: @ = %40, # = %23, : = %3A

❌ IP address not whitelisted
Fix: Go to Network Access → Add your IP or use 0.0.0.0/0

❌ Wrong cluster name in connection string
Fix: Copy exact connection string from MongoDB Atlas

❌ Database name doesn't match
Fix: Make sure database name is /fitnessfreak

❌ Port already in use
Fix: Change PORT in .env or kill process on port 5000

🔐 SECURITY TIPS:
═════════════════════════════════════════════════════════════════════

✓ Don't commit .env file to git
✓ Keep database password safe
✓ Use strong password (mix uppercase, lowercase, numbers, symbols)
✓ Use IP whitelist (not 0.0.0.0/0) in production
✓ Change JWT_SECRET to random string

📚 HELPFUL LINKS:
═════════════════════════════════════════════════════════════════════

MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MongoDB Docs: https://docs.mongodb.com/
Connection String: https://docs.mongodb.com/drivers/node/

🆘 STILL HAVING ISSUES?
═════════════════════════════════════════════════════════════════════

1. Check MongoDB Atlas connection string:

   - Visit: https://www.mongodb.com/cloud/atlas
   - Clusters → Connect → Copy connection string

2. Verify your .env file:
   cat backend/.env
   (Should show your MongoDB URI)

3. Check if database user was created:
   Database Access → Should list: fitnessfreakuser

4. Check IP whitelist:
   Network Access → Should show your IP address

5. Try connecting directly:
   mongosh "mongodb+srv://fitnessfreakuser:password@cluster0.xxxxx.mongodb.net/fitnessfreak"
   (requires MongoDB Shell installed)

✅ ONCE YOU SET THIS UP:
═════════════════════════════════════════════════════════════════════

You'll be able to:
✓ Create user accounts (signup)
✓ Login with email/password
✓ Track workouts
✓ Record progress
✓ Use all backend features
✓ Connect frontend to backend

═══════════════════════════════════════════════════════════════════════

That's it! Once MongoDB is configured, your backend will work perfectly.
If you have any issues, check this guide or read backend/SETUP.md

Good luck! 🚀

═══════════════════════════════════════════════════════════════════════
