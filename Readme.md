# ExpressJS Personnel API

A secure, modular RESTful API for managing personnel and departments, built with Express.js, MongoDB, JWT authentication, and role-based permissions.

## Features
- User authentication (JWT access & refresh tokens)
- Department and personnel CRUD operations
- Role-based access control (Admin, Lead, Owner)
- Centralized error handling
- Searching, sorting, and pagination middleware
- Environment variable configuration

## Endpoints
### Auth
- `POST /auth/login` — User login, returns access & refresh tokens
- `POST /auth/refresh` — Get new access token with refresh token
- `POST /auth/logout` — Client-side logout (delete token)

### Departments
- `GET /departments` — List all departments (login required)
- `POST /departments` — Create department (admin only)
- `GET /departments/:departmentId` — Get department details
- `PUT/PATCH /departments/:departmentId` — Update department
- `DELETE /departments/:departmentId` — Delete department
- `GET /departments/:departmentId/personnels` — List personnels in department

### Personnels
- `GET /personnels` — List all personnels (login required)
- `POST /personnels` — Create personnel (admin only)
- `GET /personnels/:personnelId` — Get personnel details (login required)
- `PUT/PATCH /personnels/:personnelId` — Update personnel (admin or owner)
- `DELETE /personnels/:personnelId` — Delete personnel (admin or owner)

## Authentication
- All protected endpoints require `Authorization: Bearer <access_token>` header.
- Use `/auth/login` to get tokens, `/auth/refresh` to renew access token.

## Permissions
- Admin: Full access
- Lead: Department-specific access
- Owner: Can update/delete own record

## Error Handling
- Centralized error handler for validation, duplicate, and permission errors

## Environment Variables (`.env`)
```
PORT=8000
MONGODB=<your_mongodb_uri>
PAGE_SIZE=10
ACCESS_KEY=<your_jwt_access_secret>
REFRESH_KEY=<your_jwt_refresh_secret>
```

## Quick Start
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` file
4. Start server: `npm start`

## Project Structure
```
├── index.js
├── package.json
├── .env
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── helpers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
```

## License
MIT
