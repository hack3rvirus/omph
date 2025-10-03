import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Societies from './pages/Societies';
import NewsAndEvents from './pages/NewsAndEvents';
import PrayerWall from './pages/PrayerWall';
import Login from './pages/Admin/login';
import Dashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useNotifications } from './hooks/useNotifications';
import ChatbotWidget from './components/ChatbotWidget';

// Lazy load new pages
const Doctrine = lazy(() => import('./pages/Doctrine'));
const Donate = lazy(() => import('./pages/Donate'));
const Readings = lazy(() => import('./pages/Readings'));
const Saints = lazy(() => import('./pages/Saints'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Intentions = lazy(() => import('./pages/Intentions'));
const SocietyDetail = lazy(() => import('./pages/SocietyDetail'));

function App() {
  useNotifications(); // Enable notifications

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-beigeBg">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctrine" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Doctrine />
              </Suspense>
            } />
            <Route path="/donate" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Donate />
              </Suspense>
            } />
            <Route path="/readings" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Readings />
              </Suspense>
            } />
            <Route path="/saints" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Saints />
              </Suspense>
            } />
            <Route path="/marketplace" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Marketplace />
              </Suspense>
            } />
            <Route path="/intentions" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Intentions />
              </Suspense>
            } />
            <Route path="/societies" element={<Societies />} />
            <Route path="/societies/:slug" element={
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <SocietyDetail />
              </Suspense>
            } />
            <Route path="/news-events" element={<NewsAndEvents />} />
            <Route path="/prayer-wall" element={<PrayerWall />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
