import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminParticipantsPage from './pages/AdminParticipantsPage';
import NotFoundPage from './pages/NotFoundPage';

// Route Guards
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-ivory dark:bg-[#121212] text-charcoal dark:text-[#F8F7F3] transition-colors duration-200">
            <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Student Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-registrations"
                element={
                  <ProtectedRoute>
                    <MyRegistrationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/registrations/confirmation/:id"
                element={
                  <ProtectedRoute>
                    <RegistrationConfirmationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <AdminRoute>
                    <AdminEventsPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/participants"
                element={
                  <AdminRoute>
                    <AdminParticipantsPage />
                  </AdminRoute>
                }
              />

              {/* Fallback 404 Route */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;
