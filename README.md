# FitnessFreak

Full-stack fitness web application with a React frontend and a Node/Express backend.

## Repo layout

- `frontend/` — React + Vite single-page app
- `backend/` — Node.js + Express API, MongoDB models and routes

## Quick start

Prerequisites: Node.js 18+ and npm, MongoDB (local or Atlas).

1. Frontend

   cd frontend
   npm install
   npm run dev

2. Backend

   cd backend
   npm install

   # check `package.json` scripts; otherwise:

   node server.js

Create a `.env` for the backend (do not commit). Typical values:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## GitHub

This repo includes `.gitignore` files at the project root and inside `frontend/` and `backend/` to exclude `node_modules`, build artifacts, and environment files.

## Notes

- See `frontend/README.md` and `backend/README.md` for per-project details.
- If you plan to deploy, set production environment variables and build the frontend with `npm run build` in `frontend/`.
