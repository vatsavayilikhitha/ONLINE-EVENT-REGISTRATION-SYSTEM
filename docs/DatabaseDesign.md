# Database Design

## 1. Schema Definitions

### 1.1 User Model (`User.js`)
Stores authenticated students and administrators.

| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Primary Key | Auto-generated unique user identifier |
| `name` | String | Yes | Trimmed, Max 100 | Full name of the student or admin |
| `email` | String | Yes | Unique, Lowercase, Regex | Academic or personal email address |
| `password` | String | Yes | Min 6 chars, Bcrypt | Salted hash representation of password |
| `phone` | String | Yes | Trimmed | Contact phone number |
| `college` | String | Yes | Trimmed | College department or university affiliation |
| `role` | String | Yes | Enum: `['user', 'admin']` | Access privilege level (default: `'user'`) |
| `createdAt` | Date | Auto | Timestamps | Account creation timestamp |

---

### 1.2 Event Model (`Event.js`)
Stores college events, capacities, venues, and schedules.

| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Primary Key | Unique event identifier |
| `title` | String | Yes | Trimmed, Max 150 | Event name |
| `description`| String | Yes | Text | Detailed syllabus, rules, or agenda |
| `category` | String | Yes | Enum | `['Workshops', 'Technical', 'Cultural', 'Sports', 'Seminars', 'Competitions', 'Other']` |
| `date` | Date | Yes | Valid Date | Date on which the event takes place |
| `startTime` | String | Yes | Formatted | e.g. `'09:30 AM'` |
| `endTime` | String | Yes | Formatted | e.g. `'04:30 PM'` |
| `venue` | String | Yes | Trimmed | Specific lab, auditorium, or sports ground |
| `organizer` | String | Yes | Trimmed | Organizing department, student club, or council |
| `contact` | String | Yes | Trimmed | Contact email and phone number |
| `capacity` | Number | Yes | Min: 1 | Maximum allowable headcount |
| `registeredCount` | Number | No | Default: 0, Min: 0 | Current confirmed participant count |
| `registrationDeadline` | Date | Yes | Must be <= `date` | Cutoff timestamp for ticket reservations |
| `image` | String | No | URL | Cover banner image link |

**Virtual Fields:**
* `availableSeats`: Calculated dynamically as `Math.max(0, capacity - registeredCount)`.
* `isOpen`: Boolean flag verifying if `now <= registrationDeadline && availableSeats > 0`.

---

### 1.3 Registration Model (`Registration.js`)
Maintains the transactional join between a user and an event.

| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Yes | Primary Key | Unique document identifier |
| `registrationId`| String | Yes | Unique, Indexed | Generated reference code (`EVT-YYYY-XXXXXX`) |
| `user` | ObjectId | Yes | Ref: `'User'` | Foreign reference to participant User document |
| `event` | ObjectId | Yes | Ref: `'Event'` | Foreign reference to booked Event document |
| `registeredAt` | Date | No | Default: `Date.now`| Timestamp of confirmation |
| `status` | String | Yes | Enum | `['Confirmed', 'Cancelled', 'Completed']` |

**Indexes:**
* Compound Index: `{ user: 1, event: 1 }` (Accelerates user registration history lookups and prevents duplicate active registrations).
* Compound Index: `{ event: 1, status: 1 }` (Accelerates headcount and participant roster filtering).
