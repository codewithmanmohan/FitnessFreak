🛠️ MONGODB CONNECTION TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════

ERROR: querySrv ENOTFOUND \_mongodb.\_tcp.cluster0.mongodb.net
───────────────────────────────────────────────────────────────────

This error means MongoDB Atlas connection failed. Here's how to fix it:

✅ SOLUTION 1: Create MongoDB Atlas Account & Cluster (RECOMMENDED)
──────────────────────────────────────────────────────────────────

Follow MONGODB_SETUP.md for complete step-by-step guide
This will take about 10-15 minutes but ensures everything works correctly

✅ SOLUTION 2: Quick Fix (If You Already Have MongoDB URI)
───────────────────────────────────────────────────────────

1. You should have a MongoDB URI that looks like:
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority

2. Edit backend/.env file:
   cd backend
   nano .env # or use VS Code to edit

3. Update MONGODB_URI line:
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fitnessfreak?retryWrites=true&w=majority

4. Save and restart server:
   npm run dev

✅ SOLUTION 3: Verify Your Connection String
──────────────────────────────────────────────

Your .env file should have:
MONGODB_URI=mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER].mongodb.net/[DATABASE]?retryWrites=true&w=majority

Check:
[ ] [USERNAME] - Replaced with actual username
[ ] [PASSWORD] - Replaced with actual password
[ ] [CLUSTER] - Replaced with actual cluster name (e.g., cluster0.abc123)
[ ] [DATABASE] - Replaced with database name (should be 'fitnessfreak')
[ ] No special characters in connection string (spaces, brackets, etc)

❌ COMMON MISTAKES & FIXES:
────────────────────────────

Error 1: ENOTFOUND \_mongodb.\_tcp.cluster0.mongodb.net
→ Your connection string is invalid or cluster doesn't exist
→ Fix: Copy exact connection string from MongoDB Atlas

Error 2: Authentication failed
→ Username or password is incorrect
→ Fix: Check credentials match what you created in MongoDB Atlas

Error 3: connect ECONNREFUSED 127.0.0.1:27017
→ You're trying to connect to local MongoDB instead of Atlas
→ Fix: Make sure MONGODB_URI starts with "mongodb+srv://" (not "mongodb://")

Error 4: IP not whitelisted
→ Your IP address is not allowed to connect
→ Fix: Go to MongoDB Atlas → Network Access → Add your IP

📋 STEP-BY-STEP MONGODB ATLAS SETUP:
────────────────────────────────────

1. CREATE ACCOUNT
   └─ Visit: https://www.mongodb.com/cloud/atlas
   └─ Sign up with email/password

2. CREATE CLUSTER
   └─ Click "Build a Database"
   └─ Select "M0 Free" tier
   └─ Wait 2-3 minutes

3. CREATE DATABASE USER
   └─ Database Access → Add New Database User
   └─ Username: fitnessfreakuser
   └─ Generate strong password
   └─ Save password safely!

4. WHITELIST IP
   └─ Network Access → Add IP Address
   └─ Click "Add Current IP Address"

5. GET CONNECTION STRING
   └─ Click "Connect" on cluster
   └─ Select "Connect Your Application"
   └─ Copy the connection string

6. UPDATE .env
   └─ Replace password in URI
   └─ Replace database name with "fitnessfreak"
   └─ Save file

7. START SERVER
   └─ npm run dev
   └─ Should see "MongoDB Connected"

🔍 HOW TO DEBUG:
─────────────────

1. Check your .env file:
   cat backend/.env | grep MONGODB_URI

2. Verify MongoDB Atlas cluster is running:
   Visit https://www.mongodb.com/cloud/atlas
   Check if cluster shows "ACTIVE"

3. Test connection with mongosh (if installed):
   mongosh "your_connection_string"

4. Check server logs:
   npm run dev
   Look for "MongoDB Connected" or "Error:"

5. Try without special characters in password:
   Generate new password without !, @, #, etc

✅ CORRECT .env FORMAT:
───────────────────────

MONGODB_URI=mongodb+srv://fitnessfreakuser:MyPassword123@cluster0.abc123.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_random_secret_key_here_12345
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173

🚀 ONCE FIXED:
───────────────

You should see:
✓ MongoDB Connected: cluster0.abc123.mongodb.net
✓ Server is running on port 5000
✓ Environment: development

Then test with:
curl http://localhost:5000/api/health
→ Should return: {"success": true, "message": "Server is running"}

📞 NEED MORE HELP?
───────────────────

1. Read: MONGODB_SETUP.md (full step-by-step guide)
2. Read: backend/SETUP.md (backend setup guide)
3. Check: backend/README.md (overview)
4. Visit: https://docs.mongodb.com/ (MongoDB documentation)

═══════════════════════════════════════════════════════════════════════

Next: Follow MONGODB_SETUP.md for complete MongoDB Atlas setup guide

═══════════════════════════════════════════════════════════════════════
