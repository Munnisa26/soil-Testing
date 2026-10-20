# Soil Testing

Professional full-stack soil testing platform for farmers, researchers, and students.

Users can register, submit soil test requests, track samples, view results with charts, and download PDF reports. Admins manage users, samples, results, reports, blog, and contact messages.

## Tech Stack

- **Frontend:** React.js, React Router, Bootstrap 5, Chart.js, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + bcrypt password hashing
- **PDF:** PDFKit

## Project Structure

```
soil-testing/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProtectedRoute
│   │   ├── pages/            # Public + Dashboard + Admin pages
│   │   ├── layouts/          # Dashboard layout
│   │   ├── services/         # API client
│   │   ├── context/          # Auth context
│   │   └── styles/           # Global CSS (Bootstrap + custom)
│   └── package.json
├── backend/                  # Express API
│   ├── config/               # Supabase client
│   ├── controllers/
│   ├── routes/
│   ├── middleware/           # Auth, validation
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── database/
│   ├── schema.sql            # Tables, indexes, RLS policies
│   └── seed.sql              # Sample data
└── README.md
```

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project (URL + anon key + service role key)

## Setup Instructions

### 1. Database (Supabase)

1. Open your Supabase project → **SQL Editor**.
2. Run the entire contents of `database/schema.sql`.
3. (Optional) Run `database/seed.sql` for sample blog posts and test types.
4. Create an **admin user** by registering via the app, then in Supabase Table Editor set that user's `role` to `admin`.

Or insert admin manually (replace the password hash with a bcrypt hash of your password):

```sql
INSERT INTO users (full_name, email, mobile, password, location, user_type, role, is_active)
VALUES (
  'Admin User',
  'admin@soiltesting.com',
  '9876543210',
  '$2a$12$YOUR_BCRYPT_HASH_HERE',
  'Head Office',
  'Other',
  'admin',
  true
);
```

To generate a bcrypt hash (in backend folder after `npm install`):

```bash
node -e "require('bcryptjs').hash('YourPassword123!', 12).then(console.log)"
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase keys and JWT_SECRET (already filled if using provided keys)
npm install
npm run dev
```

API runs at: `http://localhost:5000`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

App runs at: `http://localhost:3000`

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `FRONTEND_URL` | CORS origin (e.g. `http://localhost:3000`) |

### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API base URL (`http://localhost:5000/api`) |

## Main Features

### Public Pages
- Home (hero, benefits, tests, how it works, stats, FAQ, testimonials, CTA)
- About Us
- Soil Testing
- Soil Test Types
- How It Works
- Blog / Soil Knowledge
- Contact Us
- Login / Register

### User Dashboard
- Overview stats (samples, requests, completed, pending)
- Profile management
- Request Soil Test (form + file upload → unique Request ID)
- My Soil Samples (search, filter, status tracking)
- Test Results (tables + Chart.js charts)
- Reports (download PDF)
- Testing History (search / filter / sort)
- Notifications
- Settings (change password)

### Admin Dashboard
- Statistics overview
- Manage Users (activate/deactivate)
- Manage Soil Samples (update status workflow)
- Enter Test Results + auto-generate report
- Manage Reports
- Manage Blog
- Contact Messages
- Settings

### Soil Test Workflow Status
`Pending` → `Sample Received` → `Testing` → `Completed` → `Report Available`

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/profile` | Update profile |
| POST | `/api/soil-samples` | Create sample request |
| GET | `/api/soil-samples` | List my samples |
| GET | `/api/soil-samples/:id` | Get sample |
| GET | `/api/test-results/:sampleId` | Get results |
| POST | `/api/test-results` | Create results (admin) |
| GET | `/api/reports` | My reports |
| GET | `/api/reports/:id/pdf` | Download PDF |
| GET | `/api/admin/stats` | Admin stats |
| GET | `/api/admin/users` | List users |
| GET | `/api/admin/samples` | List all samples |
| PUT | `/api/admin/samples/:id/status` | Update status |
| GET | `/api/blog` | Blog posts |
| POST | `/api/contact` | Contact form |

## VS Code Setup

1. Open the `soil-testing` folder in VS Code.
2. Install recommended extensions: ESLint, Prettier, REST Client (optional).
3. Use the integrated terminal to run backend and frontend in two terminals.
4. Optional: create a `.vscode/launch.json` for debugging Node.

## Security Notes

- Passwords are hashed with bcrypt (12 rounds). Never stored in plain text.
- JWT authentication with protected routes and role-based access (user / admin).
- Input validation with express-validator.
- SQL injection mitigated by Supabase parameterized queries.
- CORS restricted to frontend origin.
- Service role key used only on the server.

## License

MIT — Soil Testing platform.
