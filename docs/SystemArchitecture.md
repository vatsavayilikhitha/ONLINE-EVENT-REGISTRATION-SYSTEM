# System Architecture

## 1. Architectural Overview
The **Online Event Registration System** is structured as a classical **Three-Tier Architecture**:

```
+-------------------------------------------------------------+
|                 PRESENTATION TIER (CLIENT)                  |
|  React 19 • Vite • Tailwind CSS • React Router • Lucide UI   |
+-------------------------------------------------------------+
                              |
                     HTTPS / JSON REST API
                              |
+-------------------------------------------------------------+
|                  APPLICATION TIER (SERVER)                  |
|          Node.js • Express.js • JWT • Bcrypt Auth           |
|      Middleware: authMiddleware • errorMiddleware           |
|      Controllers: Auth, Events, Registrations, Admin        |
+-------------------------------------------------------------+
                              |
                    Mongoose ODM (BSON)
                              |
+-------------------------------------------------------------+
|                     DATA TIER (STORAGE)                     |
|           MongoDB Server (Local / MongoDB Atlas)           |
|           Collections: Users • Events • Registrations       |
+-------------------------------------------------------------+
```

## 2. Directory Separation & Responsibility Matrix

### Client Layer (`/client`)
* **`components/common`**: Reusable atomic UI elements (Navbar, Footer, Button, Input, Modal, Badge, Spinner, EmptyState, ErrorMessage).
* **`components/events`**: Domain-specific UI (EventCard, EventFormModal, SearchBar, FilterBar).
* **`components/registrations`**: Registration-specific UI (RegistrationCard, ConfirmationModal).
* **`context`**: Centralized authentication state and user session provider (`AuthContext`).
* **`services`**: Axios client layer with automated JWT header injection and response interceptors.
* **`pages`**: Route entry points for student and administrator flows.

### Server Layer (`/server`)
* **`config/db.js`**: Managed MongoDB database connection lifecycle.
* **`models/`**: Mongoose schemas defining validation rules, indexes, and virtual fields (`availableSeats`).
* **`controllers/`**: Pure business logic handling HTTP requests, input validation, and data mutations.
* **`routes/`**: Express route maps directing endpoints to appropriate controllers.
* **`middleware/`**: JWT token extraction, role validation, and centralized exception formatting.
