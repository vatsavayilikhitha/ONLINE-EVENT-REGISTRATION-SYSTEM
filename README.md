# ONLINE EVENT REGISTRATION SYSTEM (EventHub)

> **College Software Engineering Capstone Project**  
> A realistic, production-style, full-stack event discovery and registration platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

---

## 1. Project Overview

**EventHub** is an end-to-end college event management portal engineered to streamline campus activities. It allows students to explore workshops, seminars, sports meets, and technical competitions, register with instant seat allocation, manage their registrations, and download or print official admission passes. Concurrently, it grants administrative faculty and student council leads full control over event creation, capacity enforcement, participant verification, and real-time category analytics.

---

## 2. Technology Stack

### Frontend
* **React 19 (Vite):** Modern component architecture with instant HMR and high-speed bundling.
* **Tailwind CSS v3:** Clean, minimal, accessible design system tailored for academic portals.
* **React Router v7:** Dynamic declarative client-side routing with guarded role routes.
* **Axios & Fetch:** Robust HTTP clients with automatic JWT Authorization header injection.
* **Lucide React:** Modern, clean icon library.

### Backend
* **Node.js & Express.js:** RESTful API server with modular routing, controllers, and middlewares.
* **MongoDB & Mongoose:** Document database with strict schema validation, compound indexes, and virtual fields.
* **JWT (JSON Web Tokens):** Cryptographically signed stateless session tokens.
* **Bcrypt.js:** Industry-standard salted password hashing (10 salt rounds).
* **Morgan & CORS:** HTTP request logging and cross-origin resource sharing configuration.

---

## 3. System Architecture & Flow

```
                      +-----------------------------+
                      |     React Client (Vite)     |
                      |   Tailwind CSS • Lucide UI   |
                      +-----------------------------+
                                     │
                             HTTPS / JSON REST
                                     │
                      +-----------------------------+
                      |     Node.js + Express.js    |
                      |  authMiddleware • JWT Auth  |
                      +-----------------------------+
                                     │
                            Mongoose ODM Driver
                                     │
                      +-----------------------------+
                      |      MongoDB Database       |
                      | Users • Events • Bookings   |
                      +-----------------------------+
```

### User Roles & Workflows

#### 1. Student / User Flow
```
Register Account ➔ Sign In ➔ Browse Events ➔ Filter by Category / Availability 
       ➔ Inspect Details & Capacity ➔ Confirm Registration ➔ Receive Registration ID 
       ➔ View & Print Entry Ticket ➔ Cancel Registration if required ➔ Edit Profile
```

#### 2. Administrator Flow
```
Admin Login ➔ Analytics Dashboard ➔ Create New Event with Date / Deadline Rules 
       ➔ Edit Event Details ➔ Delete Event ➔ Search & Filter Participant Roster 
       ➔ Update Registration Status (Confirmed / Completed / Cancelled)
```

---

## 4. Folder Structure

```
online-event-registration/
│
├── client/                               # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                  # Navbar, Footer, Button, Input, Modal, Badges, Spinners
│   │   │   ├── events/                  # EventCard, EventFormModal, SearchBar, FilterBar
│   │   │   ├── registrations/           # RegistrationCard, ConfirmationModal
│   │   │   ├── dashboard/               # StatCard, KPI cards
│   │   │   └── routing/                 # ProtectedRoute, AdminRoute
│   │   ├── pages/                       # Home, Events, Details, Login, Register, Dashboards
│   │   ├── context/                     # AuthContext (JWT session state management)
│   │   ├── services/                    # API client, authService, eventService, adminService
│   │   ├── utils/                       # Date formatters, constants
│   │   ├── App.jsx                      # Application routes and layout
│   │   ├── main.jsx                     # DOM mount point
│   │   └── index.css                    # Tailwind directives and print stylesheet
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                               # Backend Node.js / Express API
│   ├── config/
│   │   └── db.js                        # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── authController.js            # User registration, login, getMe
│   │   ├── eventController.js           # Event CRUD, search, filter, sort
│   │   ├── registrationController.js    # Event bookings, capacity updates, cancellations
│   │   ├── adminController.js           # System metrics, participant management
│   │   └── userController.js            # Profile updates
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT verification and Admin role guard
│   │   └── errorMiddleware.js           # 404 handler and global error formatter
│   ├── models/
│   │   ├── User.js                      # User schema with bcrypt pre-save hashing
│   │   ├── Event.js                     # Event schema with capacity virtuals
│   │   └── Registration.js              # Booking schema with compound indexes
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── registrationRoutes.js
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── generateToken.js             # JWT helper
│   │   ├── seedData.js                  # Realistic 10-event database seeder
│   │   └── testSuite.js                 # 18-case automated test runner
│   ├── server.js                        # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── docs/                                 # Software Engineering Documentation
│   ├── ProblemStatement.md
│   ├── ObjectivesAndScope.md
│   ├── FunctionalRequirements.md
│   ├── NonFunctionalRequirements.md
│   ├── FeasibilityStudy.md
│   ├── SystemArchitecture.md
│   ├── DatabaseDesign.md
│   └── TestingStrategy.md
│
└── README.md
```

---

## 5. Database Schema Design

### 1. User Model
* `name`: String (Required, trimmed)
* `email`: String (Required, unique, trimmed, lowercase)
* `password`: String (Hashed using bcrypt with 10 salt rounds)
* `phone`: String (Required)
* `college`: String (Required)
* `role`: String (`'user'` or `'admin'`, default: `'user'`)
* `createdAt`: Date (Auto timestamp)

### 2. Event Model
* `title`: String (Required)
* `description`: String (Required)
* `category`: String (`'Workshops'`, `'Technical'`, `'Cultural'`, `'Sports'`, `'Seminars'`, `'Competitions'`, `'Other'`)
* `date`: Date (Required)
* `startTime`: String & `endTime`: String (e.g. `'09:30 AM'`)
* `venue`: String (Required)
* `organizer`: String (Required)
* `contact`: String (Required)
* `capacity`: Number (Required, min: 1)
* `registeredCount`: Number (Default: 0)
* `registrationDeadline`: Date (Required, must be $\le$ event date)
* `image`: String (Unsplash direct banner URL)
* *Virtuals*: `availableSeats`, `isOpen`

### 3. Registration Model
* `registrationId`: String (Unique, e.g. `EVT-2026-101429`)
* `user`: ObjectId (Ref: `'User'`)
* `event`: ObjectId (Ref: `'Event'`)
* `registeredAt`: Date (Default: `Date.now`)
* `status`: String (`'Confirmed'`, `'Cancelled'`, `'Completed'`)
* *Compound Indexes*: `{ user: 1, event: 1 }` and `{ event: 1, status: 1 }`

---

## 6. REST API Endpoints

### Authentication (`/api/auth`)
* `POST /api/auth/register` — Register new student account
* `POST /api/auth/login` — Sign in and receive JWT token
* `GET /api/auth/me` — Retrieve current authenticated profile *(Protected)*

### Events (`/api/events`)
* `GET /api/events` — Retrieve events with search, category, and availability filters *(Public)*
* `GET /api/events/:id` — Retrieve full event details *(Public)*
* `POST /api/events` — Create a new event *(Admin Protected)*
* `PUT /api/events/:id` — Update an existing event *(Admin Protected)*
* `DELETE /api/events/:id` — Delete event and its registrations *(Admin Protected)*

### Registrations (`/api/registrations`)
* `POST /api/registrations` — Book seat for an event *(Student Protected)*
* `GET /api/registrations/my` — Retrieve student's booked tickets *(Student Protected)*
* `GET /api/registrations/:id` — Retrieve printable ticket record *(Protected)*
* `DELETE /api/registrations/:id` — Cancel registration & release capacity *(Protected)*

### User Profile (`/api/users`)
* `PUT /api/users/profile` — Update phone, name, and college *(Protected)*

### Admin Management (`/api/admin`)
* `GET /api/admin/stats` — Overall KPI metrics & category aggregations *(Admin Protected)*
* `GET /api/admin/registrations` — Full participant roster with query filters *(Admin Protected)*
* `PATCH /api/admin/registrations/:id/status` — Modify participant status *(Admin Protected)*

---

## 7. Demo Credentials for Viva / Examination

The database contains pre-configured demonstration accounts:

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@eventhub.edu` | `AdminPassword123!` | Access Admin Dashboard, Manage Events & Participants |
| **Student** | `student@eventhub.edu` | `StudentPassword123!` | Explore events, register, view tickets, cancel bookings |

> **Viva Tip:** The Login page includes one-click **"Demo Student"** and **"Demo Admin"** buttons for immediate demonstration during evaluation.

---

## 8. Installation & Setup Instructions

### Prerequisites
* **Node.js** (v18 or higher)
* **MongoDB Server** (Running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### Step 1: Clone or Navigate to Project
```bash
cd "ONLINE EVENT REGISTRATION SYSTEM SE"
```

### Step 2: Configure & Start Backend Server
```bash
cd server
npm install
npm run seed     # Populates 10 realistic college events & demo accounts
node server.js   # Starts API server on port 5000
```

### Step 3: Configure & Start Frontend Client
In a new terminal window:
```bash
cd client
npm install
npm run dev      # Starts Vite React dev server on http://localhost:5173
```

Open your browser at `http://localhost:5173`.

---

## 9. Comprehensive Testing Section

The system was verified through an automated end-to-end integration test runner (`server/utils/testSuite.js`) and manual user-journey validation:

| Test ID | Test Description | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User registration with valid data | Name, unique email, password, phone, college | HTTP 201 Created with JWT token and user record | HTTP 201 Created with token | **PASSED** |
| **TC-02** | Invalid registration (mismatched password) | Passwords do not match | HTTP 400 Bad Request with descriptive message | HTTP 400 'Passwords do not match' | **PASSED** |
| **TC-03** | Duplicate email registration prevention | Existing email address | HTTP 400 Bad Request 'User with email already exists' | HTTP 400 Duplicate error caught | **PASSED** |
| **TC-04** | User login with valid credentials | Valid student email & password | HTTP 200 OK with authenticated JWT | HTTP 200 OK, token issued | **PASSED** |
| **TC-05** | Invalid login attempt | Correct email, wrong password | HTTP 401 Unauthorized 'Invalid email or password' | HTTP 401 Unauthorized | **PASSED** |
| **TC-06** | Admin authentication & role authorization | Admin credentials | HTTP 200 OK with role `'admin'` | HTTP 200 OK, admin verified | **PASSED** |
| **TC-07** | Admin creates a new college event | Valid event payload with capacity 50 | HTTP 201 Created, event stored in MongoDB | HTTP 201 Created with valid ObjectId | **PASSED** |
| **TC-08** | Admin edits event information | Updated title and description | HTTP 200 OK, document updated | HTTP 200 OK, changes reflected | **PASSED** |
| **TC-09** | Event keyword search | Query `?search=Hackathon` | Returns matched hackathon event | 1 matching event returned | **PASSED** |
| **TC-10** | Event filtering by category | Query `?category=Workshops` | Returns only events with category `'Workshops'` | All filtered events match | **PASSED** |
| **TC-11** | Successful event registration | Valid event ID & student token | HTTP 201 Created, generates unique ID (`EVT-...`) | HTTP 201 Created with `EVT-2026-XXXXXX` | **PASSED** |
| **TC-12** | Duplicate active event registration | Re-registering for the same event | HTTP 400 Bad Request 'Already registered' | HTTP 400 'Already registered' | **PASSED** |
| **TC-13** | Full event registration prevention | Registration when capacity is full | HTTP 400 Bad Request 'Registration full' | HTTP 400 'Registration full' | **PASSED** |
| **TC-14** | Registration self-cancellation | Delete registration by ID | HTTP 200 OK, status `'Cancelled'`, capacity restored | HTTP 200 OK, capacity incremented | **PASSED** |
| **TC-15** | Unauthorized admin route access | Student token accessing `/api/admin/stats` | HTTP 403 Forbidden 'Administrator privileges required' | HTTP 403 Forbidden | **PASSED** |
| **TC-16** | Admin statistics compilation | Admin token accessing `/api/admin/stats` | HTTP 200 OK with category breakdown & totals | HTTP 200 OK with aggregated stats | **PASSED** |
| **TC-17** | Student profile information update | Updated phone number & department | HTTP 200 OK, profile persisted | HTTP 200 OK with updated profile | **PASSED** |
| **TC-18** | Admin event deletion | Admin deletes event ID | HTTP 200 OK, event & registrations deleted | HTTP 200 OK, cascade cleaned | **PASSED** |

### Running the Automated Test Suite
To execute the automated test suite against the backend:
```bash
cd server
node utils/testSuite.js
```

---

## 10. Future Enhancements

* **QR Code Venue Scanner:** Dedicated mobile camera scanner for volunteers to check in attendees at campus doors.
* **Email & SMS Notifications:** Automated calendar invites (.ics files) and reminder emails 24 hours before event commencement.
* **Certificate of Participation Generation:** Automatic generation and download of PDF completion certificates post-event.
