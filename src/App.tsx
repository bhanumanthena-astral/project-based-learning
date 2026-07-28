import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { RecapPage } from './pages/RecapPage';
import { ProgressPage } from './pages/ProgressPage';
import { CoursesPage } from './pages/CoursesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LearningCapsulesPage } from './pages/LearningCapsulesPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Main App Layout and Nested Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="recap" element={<RecapPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="learning" element={<LearningCapsulesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>

          {/* Fallback Legacy Redirects */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/workspace" element={<Navigate to="/app/workspace" replace />} />
          <Route path="/playground" element={<Navigate to="/app/playground" replace />} />
          <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
          <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
          <Route path="/recap" element={<Navigate to="/app/recap" replace />} />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
