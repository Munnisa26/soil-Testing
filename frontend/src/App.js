import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardLayout from './layouts/DashboardLayout';

import Home from './pages/Home';
import About from './pages/About';
import SoilTesting from './pages/SoilTesting';
import SoilTestTypes from './pages/SoilTestTypes';
import HowItWorks from './pages/HowItWorks';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

import Overview from './pages/dashboard/Overview';
import RequestTest from './pages/dashboard/RequestTest';
import MySamples from './pages/dashboard/MySamples';
import Profile from './pages/dashboard/Profile';
import Results from './pages/dashboard/Results';
import Reports from './pages/dashboard/Reports';
import History from './pages/dashboard/History';
import Notifications from './pages/dashboard/Notifications';
import Settings from './pages/dashboard/Settings';
import SampleDetail from './pages/dashboard/SampleDetail';

import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSamples from './pages/admin/AdminSamples';
import AdminResults from './pages/admin/AdminResults';
import AdminReports from './pages/admin/AdminReports';
import AdminBlog from './pages/admin/AdminBlog';
import AdminMessages from './pages/admin/AdminMessages';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/soil-testing" element={<PublicLayout><SoilTesting /></PublicLayout>} />
          <Route path="/soil-test-types" element={<PublicLayout><SoilTestTypes /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:id" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="request" element={<RequestTest />} />
            <Route path="samples" element={<MySamples />} />
            <Route path="samples/:id" element={<SampleDetail />} />
            <Route path="results" element={<Results />} />
            <Route path="reports" element={<Reports />} />
            <Route path="history" element={<History />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <DashboardLayout admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="samples" element={<AdminSamples />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
