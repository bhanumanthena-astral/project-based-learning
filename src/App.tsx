import React, { useEffect, useState } from 'react';
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
import { ProjectOverviewPage } from './pages/ProjectOverviewPage';
import { ConceptsPage } from './pages/ConceptsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { currentUser, UserSession } from './data/mockData';

const USER_SESSION_KEY = 'bf_user_session';

function loadUserSession(): UserSession {
  try {
    const saved = localStorage.getItem(USER_SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as UserSession;
      if (parsed && typeof parsed.isFirstLogin === 'boolean') {
        return parsed;
      }
    }
  } catch {
    // fall through to initial session
  }
  return {
    ...currentUser,
    isFirstLogin: true,
    onboardingSeen: false,
    tutorialCompleted: false,
    tutorialCompletedAt: null,
  };
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function OnboardingGate({ userSession, children }: { userSession: UserSession; children: React.ReactNode }) {
  const shouldShowOnboarding = userSession.isFirstLogin === true && userSession.onboardingSeen !== true;
  if (shouldShowOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const [userSession, setUserSession] = useState<UserSession>(loadUserSession);

  useEffect(() => {
    try {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));
    } catch {
      // ignore storage failures
    }
  }, [userSession]);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* First-run onboarding */}
          <Route
            path="/onboarding"
            element={<OnboardingPage userSession={userSession} setUserSession={setUserSession} />}
          />

          {/* Main App Layout and Nested Routes */}
          <Route
            path="/app"
            element={
              <OnboardingGate userSession={userSession}>
                <AppLayout userSession={userSession} setUserSession={setUserSession} />
              </OnboardingGate>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="recap" element={<RecapPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId/overview" element={<ProjectOverviewPage />} />
            <Route path="courses/concepts" element={<ConceptsPage />} />
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
