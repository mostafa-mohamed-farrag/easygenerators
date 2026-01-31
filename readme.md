# Full-Stack Authentication Module

This project implements a **simple, real-world authentication flow** using **NestJS** (backend) and **React + TypeScript** (frontend).  
It covers signup, signin, and a protected application page, with a focus on **clean architecture, validation, and developer experience**.

The application can be run locally or fully containerized using **Docker Compose**.

---

## Tech Stack

**Backend**
- Node.js, NestJS
- MongoDB + Mongoose
- JWT authentication
- bcrypt
- pnpm

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- React Hook Form + Zod
- Zustand

**Infrastructure**
- Docker & Docker Compose

---

## Features

- User signup & signin
- Secure password hashing
- JWT-protected backend endpoint
- Protected frontend route (`/app`)
- Logout handling
- Form validation on both frontend and backend
- Clean, modern UI with Tailwind CSS

---

## Authentication Flow (High Level)

1. User signs up with email, name, and password
2. Password is hashed and stored
3. User signs in and receives a JWT access token
4. Token is stored client-side
5. Protected frontend page calls a protected backend endpoint
6. Invalid or expired tokens trigger logout and redirect to signin

---

## Validation Rules (Signup)

- Email must be valid
- Name must be at least 3 characters
- Password:
  - Minimum 8 characters
  - At least one letter
  - At least one number
  - At least one special character
- Confirm password must match

---

## Protected Routes

### Backend
- `GET /app` (JWT protected)

```json
{
  "message": "Welcome to the application."
}
```

### Frontend Protection

- `/app` is accessible only when authenticated
- Unauthorized access redirects the user to `/signin`

---

## Technical Decisions & Trade-offs

### JWT Authentication
- JWT is **stateless** and **not stored in the database**
- This keeps the backend simple and horizontally scalable
- Token validation relies only on the signature and expiration time

### No Refresh Tokens
- Only access tokens are used
- This was a conscious decision to keep the scope aligned with the task
- Refresh token rotation is listed as a future improvement

### Email Enumeration
- During signup, the API returns **“email already exists”**
- This is technically an enumeration risk
- It was accepted intentionally for:
  - Better user experience
  - Clear feedback in a demo / task context
- In a production system, this could be mitigated using generic error messages

### Email Verification
- Not implemented to avoid scope creep
- A production-ready system would include verification tokens and email delivery

---

## Environment Variables

### Backend (`apps/api/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://admin:secret@localhost:27017/app?authSource=admin
JWT_SECRET=easygenerator
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=7
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
LOG_LEVEL=info
```

### Frontend (`apps/web/.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## Running the Project

### Recommended: Docker (Easiest)

The recommended way to run the project is using Docker Compose.

```bash
docker compose up --build
```

This starts:
  - MongoDB
  - NestJS API (port 4000)
  - React frontend (port 3000)

### Local setup

#### Backend

```bash 
cd apps/api
pnpm install
pnpm start:dev
```

#### Frontend

```bash 
cd apps/web
pnpm install
pnpm dev
```

---

## Future Improvements

- Email verification
- Refresh token rotation
- Password reset flow
- Rate limiting
- Swagger / OpenAPI documentation
- Role-based access control