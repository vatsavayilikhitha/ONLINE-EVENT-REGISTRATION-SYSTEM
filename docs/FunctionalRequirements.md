# Functional Requirements Specification (FRS)

| Module | Requirement ID | Requirement Description | Actor | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | FR-01 | System shall allow users to register with Name, Email, Password, Phone, and College. | User | High |
| **Auth** | FR-02 | System shall validate unique email addresses and reject duplicates. | System | High |
| **Auth** | FR-03 | System shall hash passwords using bcrypt prior to database persistence. | System | Critical |
| **Auth** | FR-04 | System shall issue a signed JWT upon valid credentials for stateful session restoration. | System | Critical |
| **Events** | FR-05 | System shall display published events with title, category, schedule, venue, capacity, and cover images. | All | High |
| **Events** | FR-06 | System shall filter events by category (Workshops, Technical, Cultural, Sports, Seminars, Competitions). | All | Medium |
| **Events** | FR-07 | System shall enable keyword searches spanning event titles, venues, and organizers. | All | Medium |
| **Events** | FR-08 | System shall prevent registration when capacity is exhausted or deadline has elapsed. | System | Critical |
| **Registration** | FR-09 | System shall allow authenticated users to register with one-click confirmation. | User | Critical |
| **Registration** | FR-10 | System shall generate a unique alphanumeric registration code (`EVT-YYYY-XXXXXX`). | System | High |
| **Registration** | FR-11 | System shall prevent duplicate active registrations for the same user and event. | System | Critical |
| **Registration** | FR-12 | System shall decrement available capacity upon successful booking and increment upon cancellation. | System | Critical |
| **Registration** | FR-13 | System shall provide a printable admission ticket formatting view. | User | Medium |
| **User Profile** | FR-14 | System shall allow users to review registered events and edit profile details. | User | Medium |
| **Admin** | FR-15 | System shall restrict administrative dashboards to users with role `admin`. | System | Critical |
| **Admin** | FR-16 | System shall allow admins to create, modify, and delete events with date/deadline validation. | Admin | High |
| **Admin** | FR-17 | System shall allow admins to search participants and update registration statuses. | Admin | High |
| **Admin** | FR-18 | System shall aggregate platform metrics including registrations by discipline and upcoming count. | Admin | High |
