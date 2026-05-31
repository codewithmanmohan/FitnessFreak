/**
 * API Configuration and Service Layer
 * Handles all communication with the backend
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint (e.g., '/users/login')
 * @param {object} options - Request options (method, body, headers, etc.)
 * @returns {Promise<object>} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    requiresAuth = false,
  } = options;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add authorization token if required
  if (requiresAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Add request body for non-GET requests
  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle error responses
    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Authentication Endpoints
 */
export const authAPI = {
  // Register new user
  register: (userData) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: userData,
    }),

  // Login user
  login: (credentials) =>
    apiCall("/auth/login", {
      method: "POST",
      body: credentials,
    }),

  // Get current user profile
  getProfile: () =>
    apiCall("/auth/profile", {
      method: "GET",
      requiresAuth: true,
    }),

  // Update user profile
  updateProfile: (userData) =>
    apiCall("/auth/profile", {
      method: "PUT",
      body: userData,
      requiresAuth: true,
    }),

  // Logout user
  logout: () => {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  },
};

/**
 * Coaches Endpoints
 */
export const coachesAPI = {
  // Get all coaches
  getAll: () =>
    apiCall("/coaches", {
      method: "GET",
    }),

  // Get coach by ID
  getById: (id) =>
    apiCall(`/coaches/${id}`, {
      method: "GET",
    }),

  // Create coach (admin only)
  create: (coachData) =>
    apiCall("/coaches", {
      method: "POST",
      body: coachData,
      requiresAuth: true,
    }),

  // Update coach (admin only)
  update: (id, coachData) =>
    apiCall(`/coaches/${id}`, {
      method: "PUT",
      body: coachData,
      requiresAuth: true,
    }),

  // Delete coach (admin only)
  delete: (id) =>
    apiCall(`/coaches/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

/**
 * Workouts Endpoints
 */
export const workoutsAPI = {
  // Get all workouts
  getAll: () =>
    apiCall("/workouts", {
      method: "GET",
    }),

  // Get workout by ID
  getById: (id) =>
    apiCall(`/workouts/${id}`, {
      method: "GET",
    }),

  // Create new workout
  create: (workoutData) =>
    apiCall("/workouts", {
      method: "POST",
      body: workoutData,
      requiresAuth: true,
    }),

  // Update workout
  update: (id, workoutData) =>
    apiCall(`/workouts/${id}`, {
      method: "PUT",
      body: workoutData,
      requiresAuth: true,
    }),

  // Delete workout
  delete: (id) =>
    apiCall(`/workouts/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),

  // Log user workout
  logWorkout: (workoutData) =>
    apiCall("/workouts/log", {
      method: "POST",
      body: workoutData,
      requiresAuth: true,
    }),
};

/**
 * Plans (Memberships) Endpoints
 */
export const plansAPI = {
  // Get all plans
  getAll: () =>
    apiCall("/plans", {
      method: "GET",
    }),

  // Get plan by ID
  getById: (id) =>
    apiCall(`/plans/${id}`, {
      method: "GET",
    }),

  // Create membership
  create: (planData) =>
    apiCall("/plans", {
      method: "POST",
      body: planData,
      requiresAuth: true,
    }),

  // Subscribe to plan
  subscribe: (planId) =>
    apiCall(`/plans/${planId}/subscribe`, {
      method: "POST",
      requiresAuth: true,
    }),
};

/**
 * Supplements Endpoints
 */
export const supplementsAPI = {
  // Get all supplements
  getAll: () =>
    apiCall("/supplements", {
      method: "GET",
    }),

  // Get supplement by ID
  getById: (id) =>
    apiCall(`/supplements/${id}`, {
      method: "GET",
    }),

  // Create supplement (admin only)
  create: (supplementData) =>
    apiCall("/supplements", {
      method: "POST",
      body: supplementData,
      requiresAuth: true,
    }),

  // Update supplement (admin only)
  update: (id, supplementData) =>
    apiCall(`/supplements/${id}`, {
      method: "PUT",
      body: supplementData,
      requiresAuth: true,
    }),

  // Delete supplement (admin only)
  delete: (id) =>
    apiCall(`/supplements/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

/**
 * Bookings Endpoints
 */
export const bookingsAPI = {
  // Get all bookings (for logged-in user)
  getAll: () =>
    apiCall("/bookings", {
      method: "GET",
      requiresAuth: true,
    }),

  // Get booking by ID
  getById: (id) =>
    apiCall(`/bookings/${id}`, {
      method: "GET",
      requiresAuth: true,
    }),

  // Create booking
  create: (bookingData) =>
    apiCall("/bookings", {
      method: "POST",
      body: bookingData,
      requiresAuth: true,
    }),

  // Update booking
  update: (id, bookingData) =>
    apiCall(`/bookings/${id}`, {
      method: "PUT",
      body: bookingData,
      requiresAuth: true,
    }),

  // Delete booking (cancel)
  delete: (id) =>
    apiCall(`/bookings/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),

  // Get available slots for coach
  getAvailableSlots: (coachId) =>
    apiCall(`/bookings/slots/${coachId}`, {
      method: "GET",
    }),
};

/**
 * Progress Endpoints
 */
export const progressAPI = {
  // Get user progress
  getProgress: () =>
    apiCall("/progress", {
      method: "GET",
      requiresAuth: true,
    }),

  // Log progress entry
  log: (progressData) =>
    apiCall("/progress", {
      method: "POST",
      body: progressData,
      requiresAuth: true,
    }),

  // Get progress by ID
  getById: (id) =>
    apiCall(`/progress/${id}`, {
      method: "GET",
      requiresAuth: true,
    }),

  // Update progress entry
  update: (id, progressData) =>
    apiCall(`/progress/${id}`, {
      method: "PUT",
      body: progressData,
      requiresAuth: true,
    }),

  // Delete progress entry
  delete: (id) =>
    apiCall(`/progress/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

/**
 * Feedback Endpoints
 */
export const feedbackAPI = {
  // Submit feedback
  submit: (feedbackData) =>
    apiCall("/feedback", {
      method: "POST",
      body: feedbackData,
      requiresAuth: true,
    }),

  // Get all feedback (admin only)
  getAll: () =>
    apiCall("/feedback", {
      method: "GET",
      requiresAuth: true,
    }),

  // Delete feedback (admin only)
  delete: (id) =>
    apiCall(`/feedback/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

/**
 * Health Check
 */
export const healthCheck = () =>
  apiCall("/health", {
    method: "GET",
  });

export default {
  apiCall,
  authAPI,
  coachesAPI,
  workoutsAPI,
  plansAPI,
  supplementsAPI,
  bookingsAPI,
  progressAPI,
  feedbackAPI,
  healthCheck,
};
