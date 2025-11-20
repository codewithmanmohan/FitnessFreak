# FitnessFreak Backend

A comprehensive backend API for the FitnessFreak gym management application built with Node.js, Express, and MongoDB Atlas.

## Features

- **User Authentication**: Signup, login, and profile management with JWT
- **Workout Tracking**: Create, read, update, and delete workout logs
- **Progress Tracking**: Monitor weight, body fat, muscle mass, and measurements
- **Coach Management**: Coach profiles with ratings and availability
- **Supplements**: Browse and manage supplement catalog
- **Feedback System**: User reviews and ratings for coaches and services
- **Booking System**: Schedule sessions with coaches
- **Role-based Access Control**: User, coach, and admin roles

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

## Installation

1. Clone the repository:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas URI and other configuration:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/fitnessfreak?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address
5. Copy the connection string and add it to your `.env` file

## Running the Server

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for auto-reload on file changes.

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Workouts

- `POST /api/workouts` - Create workout
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get specific workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Progress

- `POST /api/progress` - Record progress
- `GET /api/progress` - Get all progress records
- `GET /api/progress/latest` - Get latest progress
- `PUT /api/progress/:id` - Update progress record
- `DELETE /api/progress/:id` - Delete progress record

### Coaches

- `GET /api/coaches` - Get all coaches
- `GET /api/coaches/:id` - Get coach details
- `POST /api/coaches` - Create coach profile (protected)
- `PUT /api/coaches` - Update coach profile (protected)
- `GET /api/coaches/profile/me` - Get current user's coach profile (protected)

### Supplements

- `GET /api/supplements` - Get all supplements
- `GET /api/supplements/:id` - Get supplement details
- `POST /api/supplements` - Create supplement (admin only)
- `PUT /api/supplements/:id` - Update supplement (admin only)
- `DELETE /api/supplements/:id` - Delete supplement (admin only)

### Feedback

- `GET /api/feedback` - Get approved feedback
- `POST /api/feedback` - Create feedback (protected)
- `GET /api/feedback/user/me` - Get user's feedback (protected)
- `PUT /api/feedback/:id/approve` - Approve feedback (admin only)

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── workoutController.js # Workout logic
│   ├── progressController.js# Progress logic
│   ├── coachController.js   # Coach logic
│   ├── supplementController.js # Supplement logic
│   └── feedbackController.js# Feedback logic
├── middleware/
│   └── auth.js              # Authentication & authorization
├── models/
│   ├── User.js              # User schema
│   ├── Workout.js           # Workout schema
│   ├── Progress.js          # Progress schema
│   ├── Coach.js             # Coach schema
│   ├── Membership.js        # Membership schema
│   ├── Booking.js           # Booking schema
│   ├── Supplement.js        # Supplement schema
│   └── Feedback.js          # Feedback schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── workout.js           # Workout routes
│   ├── progress.js          # Progress routes
│   ├── coach.js             # Coach routes
│   ├── supplement.js        # Supplement routes
│   └── feedback.js          # Feedback routes
├── utils/
│   └── errorHandler.js      # Error handling utility
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── README.md                # This file
└── server.js                # Main server file
```

## Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time (default: 7d)
- `CORS_ORIGIN` - CORS allowed origin
- `EMAIL_SERVICE` - Email service provider
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password

## Database Models

### User

- Basic user information (name, email, password)
- Profile data (age, gender, height, weight)
- Fitness goals and preferences
- Membership status
- Role management

### Workout

- Exercise details with sets, reps, weight
- Duration and calories burned
- Intensity level and location
- Custom notes

### Progress

- Weight and body fat tracking
- Muscle mass measurements
- Progress photos
- BPM readings

### Coach

- Specializations and certifications
- Experience and hourly rates
- Availability schedule
- Client list and ratings

### Membership

- Plan information (basic, pro, premium)
- Subscription dates
- Plan features
- Payment status

### Supplement

- Product details and specifications
- Category and pricing
- Benefits and ingredients
- Stock status

### Feedback

- User ratings and reviews
- Anonymous feedback option
- Approval workflow
- Target type (coach, membership, facility)

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are generated on signup/login and expire based on `JWT_EXPIRE` setting.

## CORS

CORS is configured to allow requests from the frontend URL specified in `CORS_ORIGIN`.

## Development Tips

1. Use `.env.example` as a template for `.env`
2. Never commit `.env` file
3. Test endpoints using Postman or similar tools
4. Use `nodemon` for automatic server restart on code changes
5. Check MongoDB Atlas for data verification

## Future Enhancements

- Payment integration (Stripe/PayPal)
- Email notifications
- Real-time chat
- Video call support for online coaching
- Advanced analytics and reports
- Mobile app support
- API rate limiting
- Advanced search and filtering

## Support

For issues or questions, please open an issue on the GitHub repository.

## License

ISC
