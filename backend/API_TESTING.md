# API Testing Guide

## Testing with Postman

### 1. Import Collection

Download the Postman collection and import it into Postman for easy testing.

### 2. Environment Variables

Create a Postman environment with:

```json
{
  "base_url": "http://localhost:5000/api",
  "token": ""
}
```

## API Endpoints Reference

### Authentication Endpoints

#### Signup

```
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Profile

```
GET /api/auth/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": { ... }
}
```

#### Update Profile

```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "age": 30,
  "gender": "male",
  "height": 180,
  "weight": 75,
  "fitnessGoal": "muscle_gain",
  "bio": "Fitness enthusiast"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Workout Endpoints

#### Create Workout

```
POST /api/workouts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Chest Day",
  "description": "Push day workout",
  "exercises": [
    {
      "name": "Bench Press",
      "sets": 4,
      "reps": 8,
      "weight": 100
    },
    {
      "name": "Incline Press",
      "sets": 3,
      "reps": 10,
      "weight": 80
    }
  ],
  "duration": 60,
  "caloriesBurned": 400,
  "intensity": "high",
  "location": "gym",
  "notes": "Great workout!"
}

Response:
{
  "success": true,
  "message": "Workout created successfully",
  "workout": { ... }
}
```

#### Get All Workouts

```
GET /api/workouts
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 5,
  "workouts": [ ... ]
}
```

#### Get Specific Workout

```
GET /api/workouts/{id}
Authorization: Bearer <token>
```

#### Update Workout

```
PUT /api/workouts/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Chest Day",
  "duration": 65,
  "caloriesBurned": 420
}
```

#### Delete Workout

```
DELETE /api/workouts/{id}
Authorization: Bearer <token>
```

### Progress Endpoints

#### Record Progress

```
POST /api/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "weight": 75,
  "bodyFat": 15,
  "muscleMass": 35,
  "measurements": {
    "chest": 100,
    "waist": 85,
    "hips": 95,
    "thigh": 55,
    "bicep": 35
  },
  "notes": "Good progress this week",
  "bpmReading": {
    "bpm": 72,
    "date": "2024-01-15T10:30:00Z"
  }
}

Response:
{
  "success": true,
  "message": "Progress recorded successfully",
  "progress": { ... }
}
```

#### Get Progress Records

```
GET /api/progress
Authorization: Bearer <token>
```

#### Get Latest Progress

```
GET /api/progress/latest
Authorization: Bearer <token>
```

#### Update Progress

```
PUT /api/progress/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "weight": 74,
  "notes": "Updated weight"
}
```

#### Delete Progress

```
DELETE /api/progress/{id}
Authorization: Bearer <token>
```

### Coach Endpoints

#### Get All Coaches

```
GET /api/coaches
```

#### Get Coach Details

```
GET /api/coaches/{id}
```

#### Create Coach Profile

```
POST /api/coaches
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialization": ["Strength Training", "Fat Loss"],
  "experience": 5,
  "certifications": [
    {
      "name": "NASM CPT",
      "issuer": "NASM",
      "issueDate": "2020-01-15"
    }
  ],
  "hourlyRate": 50,
  "availability": [
    {
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "18:00"
    }
  ],
  "bio": "Experienced fitness coach"
}
```

#### Get My Coach Profile

```
GET /api/coaches/profile/me
Authorization: Bearer <token>
```

#### Update Coach Profile

```
PUT /api/coaches
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialization": ["Strength Training", "Nutrition"],
  "hourlyRate": 60
}
```

### Supplement Endpoints

#### Get All Supplements

```
GET /api/supplements?category=protein&search=whey
```

#### Get Supplement Details

```
GET /api/supplements/{id}
```

#### Create Supplement (Admin)

```
POST /api/supplements
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Whey Protein Gold",
  "description": "Premium whey protein powder",
  "category": "protein",
  "brand": "Gold Standard",
  "price": 39.99,
  "servingSize": "30g",
  "servingsPerContainer": 30,
  "benefits": ["Muscle growth", "Recovery"],
  "ingredients": ["Whey protein isolate", "Cocoa"],
  "dosage": "1 scoop daily",
  "rating": 4.5,
  "inStock": true
}
```

#### Update Supplement (Admin)

```
PUT /api/supplements/{id}
Authorization: Bearer <admin_token>
Content-Type: application/json
```

#### Delete Supplement (Admin)

```
DELETE /api/supplements/{id}
Authorization: Bearer <admin_token>
```

### Feedback Endpoints

#### Create Feedback

```
POST /api/feedback
Authorization: Bearer <token>
Content-Type: application/json

{
  "targetId": "coach_id",
  "targetType": "coach",
  "rating": 5,
  "title": "Great Coach",
  "comment": "John is an amazing coach!",
  "isAnonymous": false
}
```

#### Get Feedback

```
GET /api/feedback?targetType=coach&targetId=coach_id
```

#### Get My Feedback

```
GET /api/feedback/user/me
Authorization: Bearer <token>
```

#### Approve Feedback (Admin)

```
PUT /api/feedback/{id}/approve
Authorization: Bearer <admin_token>
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Please provide all required fields",
  "statusCode": 400
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Admin access required",
  "statusCode": 403
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found",
  "statusCode": 404
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "statusCode": 500
}
```

## Authentication Token

After login/signup, you get a token. Include it in subsequent requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token is valid for the duration specified in `JWT_EXPIRE` (default 7 days).

## Testing Workflow

1. **Create User Account**

   - Call `/auth/signup` with user details
   - Save the returned token

2. **Update Profile**

   - Call `/auth/profile` with token
   - Add fitness details

3. **Create Workout**

   - Call `/workouts` with exercise details
   - Record your workout

4. **Track Progress**

   - Call `/progress` with measurements
   - Monitor your fitness journey

5. **Find Coach**
   - Call `/coaches` to see available coaches
   - Create booking (if implemented)

## Useful Tools

- **Postman** - API testing client
- **cURL** - Command-line tool
- **Insomnia** - REST client alternative
- **REST Client (VS Code)** - Test directly in editor

Example cURL request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```
