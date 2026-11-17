# Problem Statement

## 1. Background
In contemporary universities and colleges, extracurricular, co-curricular, and technical events are vital components of student development. These include technical hackathons, coding contests, hands-on engineering workshops, expert seminars, sports tournaments, and multi-day cultural festivals.

## 2. Existing Challenges in Conventional Manual Systems
Traditional campus event coordination relies heavily on fragmented channels:
* **Paper-Based & Manual Forms:** Physical forms lead to human error, lost records, and cumbersome record keeping.
* **Lack of Real-Time Capacity Tracking:** Organizers struggle with venue overbooking, capacity violations, and lack of accurate headcount forecasting.
* **Duplicate Registrations & Inconsistent Records:** Without central database constraints, students inadvertently register multiple times or fail to receive confirmation proofs.
* **Administrative Overhead:** Event coordinators spend hours compiling spreadsheets, verifying eligibility, and manually tracking attendance.
* **Information Asymmetry:** Students frequently miss out on critical workshops and competition deadlines due to lack of a centralized discovery portal.

## 3. The Proposed Solution: EventHub
**EventHub** is an integrated, full-stack, cloud-ready web application engineered to centralize the event lifecycle across campus:
1. **Centralized Discovery & Filtering:** Students can search, filter by discipline/category, and inspect venue timings in real-time.
2. **Deterministic Seat Allocation:** Automated atomic decrement of available seats prevents venue overcrowding.
3. **Cryptographically Secure Pass Issuance:** Digital ticket generation with unique registration IDs (`EVT-YYYY-XXXXXX`) and printable admission passes.
4. **Role-Based Governance:** Separation of concerns between regular student participants and departmental administrators.
