# Objectives and Scope

## 1. Project Objectives

### Primary Objectives
* Design and implement a scalable, three-tier architecture web application for university event registration using the MERN stack (MongoDB, Express.js, React.js, Node.js).
* Establish secure role-based access control (RBAC) utilizing JSON Web Tokens (JWT) and salted bcrypt password hashing.
* Deliver an intuitive, responsive user interface compliant with modern accessibility and aesthetic standards (Tailwind CSS).
* Prevent over-subscription, deadlocks, and duplicate bookings through transactional data models and integrity constraints.
* Automate the generation of verifiable digital admission tickets complete with unique identifiers and print stylesheets.

### Academic Software Engineering Objectives
* Apply modular software design principles: separation of concerns, single responsibility principle, and dry modular code.
* Provide exhaustive unit, integration, and end-to-end API test suites with verifiable test logs.
* Maintain clean documentation aligned directly with implemented project artifacts for viva examination.

---

## 2. Project Scope

### In Scope
1. **User Management:**
   * Account registration with college affiliation.
   * Secure login, session preservation, and profile editing.
2. **Event Discovery:**
   * Full-text search across titles, descriptions, organizers, and venues.
   * Multi-facet categorization (Workshops, Technical, Cultural, Sports, Seminars, Competitions).
   * Real-time seat availability calculation.
3. **Registration Lifecycle:**
   * Instant registration with unique reference code generation.
   * Duplicate registration prevention for active bookings.
   * Self-service cancellation with automatic capacity increment.
   * Printable ticket/confirmation pass formatting.
4. **Administrative Back-Office:**
   * Comprehensive event CRUD (Create, Read, Update, Delete) with date/deadline validation.
   * Participant registry with real-time status management (Confirmed, Completed, Cancelled).
   * Aggregated metrics dashboard (Registrations by category, upcoming schedule).

### Out of Scope (Future Work)
* Third-party payment gateway integration (events in this academic edition are free university-sponsored sessions).
* Biometric barcode/NFC hardware scanners at venue doors.
* Automated SMS gateway dispatch.
