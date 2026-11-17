# Non-Functional Requirements (NFR)

## 1. Performance Requirements
* **Response Time:** API endpoints must respond within 200 milliseconds under standard load on localhost/LAN environments.
* **Throughput:** Capable of handling concurrent student registration bursts during workshop launch windows.
* **Client-Side Build:** Optimized assets bundled via Vite with production chunking and minification (< 500 KB total gzip).

## 2. Security Requirements
* **Password Confidentiality:** Passwords hashed with 10 salt rounds of bcrypt; plain-text passwords never stored or returned in JSON responses.
* **Token Protection:** Stateless authentication via HMAC-SHA256 JWT tokens with 30-day expiration window.
* **Authorization Enforcement:** Server-side route middleware verifying both token authenticity and role verification (`user` vs `admin`).
* **Input Sanitization:** Regex-based validation on emails, trimmed string inputs, and explicit boundary checks on numeric capacities.

## 3. Reliability & Availability
* **Data Consistency:** Compound indexing on MongoDB collections prevents race conditions and duplicate registrations.
* **Graceful Degradation:** Centralized error handling catches unhandled exceptions, malformed ObjectIds, and database disconnects without server crash.

## 4. Usability & Accessibility
* **Responsive Layout:** Responsive down to 375px mobile screens through 1920px desktop displays.
* **Semantic Web Standards:** Semantic HTML5 elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<button>`).
* **Clean Neutral Aesthetics:** Distraction-free palette with high-contrast typography and subtle feedback indicators.
