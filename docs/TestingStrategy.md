# Testing Strategy

## 1. Objectives of the Testing Process
The verification and validation (V&V) strategy ensures:
1. All business logic rules (capacity limits, duplicate prevention, deadline enforcements) are strictly respected.
2. Sensitive endpoints are safeguarded by JWT authentication and role-based checks.
3. User interfaces gracefully handle empty states, loading indicators, and informative alerts.

## 2. Test Execution Levels

### Level 1: Unit & Controller Testing
* Verification of bcrypt password hashing in Mongoose lifecycle pre-hooks.
* Validation of password comparison helper methods (`user.matchPassword`).
* Date calculation and deadline expiration logic.

### Level 2: API Integration & Security Testing
* Automated end-to-end API testing via `server/utils/testSuite.js`.
* Execution against live MongoDB instance validating status codes:
  * `200 OK` on successful retrievals and updates.
  * `201 Created` on registrations and event creations.
  * `400 Bad Request` on malformed inputs or capacity overflow.
  * `401 Unauthorized` on missing or expired tokens.
  * `403 Forbidden` on non-admin access attempts to administrative operations.
  * `404 Not Found` on invalid resource IDs.

### Level 3: Front-End User Interface & Responsive Testing
* Viewport testing across desktop (1920px, 1440px), tablet (1024px, 768px), and mobile (425px, 375px) breakpoints.
* Form validation feedbacks (mismatched password, invalid email format, empty fields).
* Print CSS stylesheet verification for registration passes.
