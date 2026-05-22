/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';

// Page Imports
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Templates } from './pages/Templates';
import { Editor } from './pages/Editor';
import { CoverLetter } from './pages/CoverLetter';
import { JobTracker } from './pages/JobTracker';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#F8F9FF] dark:bg-slate-900 duration-200 transition-colors">
            
            {/* Unified sticky responsive navbar */}
            <Navbar />

            {/* Main content route handlers */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/editor/:id" element={<Editor />} />
                <Route path="/cover-letter/:id" element={<CoverLetter />} />
                <Route path="/job-tracker" element={<JobTracker />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </main>

            {/* Consolidated legal and support footer */}
            <Footer />

            {/* Global toast notification alert stack */}
            <ToastContainer />

          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}
