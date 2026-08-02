import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { SearchModal } from './SearchModal';
import { ConceptDrawer } from './ConceptDrawer';
import { NotificationsPanel } from './NotificationsPanel';
import { HelpModal } from './HelpModal';
import { TutorialOverlay } from './tutorial/TutorialOverlay';
import { courses, UserSession } from '../data/mockData';

interface AppLayoutProps {
  userSession: UserSession;
  setUserSession: Dispatch<SetStateAction<UserSession>>;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ userSession, setUserSession }) => {
  const location = useLocation();
  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0].id);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConceptDrawerOpen, setIsConceptDrawerOpen] = useState(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Auto-start the guided tutorial on first login visit to the dashboard,
  // or when the user requests a replay from Settings (works even after completion/skip)
  useEffect(() => {
    const shouldStart =
      location.pathname === '/app/dashboard' &&
      (userSession.tutorialReplayRequested === true ||
        (userSession.isFirstLogin === true && userSession.tutorialCompleted === false));
    if (shouldStart) {
      const t = setTimeout(() => setIsTutorialOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, [location.pathname, userSession.isFirstLogin, userSession.tutorialCompleted, userSession.tutorialReplayRequested]);

  const handleTutorialComplete = () => {
    setIsTutorialOpen(false);
    if (userSession.tutorialReplayRequested) {
      setUserSession((prev) => ({ ...prev, tutorialReplayRequested: false }));
    }
  };

  const handleOpenConcept = (conceptId?: string) => {
    if (conceptId) {
      setSelectedConceptId(conceptId);
    }
    setIsConceptDrawerOpen(true);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsHelpOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const sidebarWidth = isSidebarCollapsed ? '64px' : '260px';

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-violet-100 selection:text-violet-900" style={{ background: 'var(--bg-body)' }}>
      {/* Fixed Sidebar */}
      <Sidebar
        onOpenConcepts={() => handleOpenConcept()}
        onCollapseChange={setIsSidebarCollapsed}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleNotifications={() => setIsNotificationsOpen(prev => !prev)}
        onOpenHelp={() => setIsHelpOpen(true)}
        unreadNotifications={3}
      />

      {/* Main Content Viewport - with dynamic left padding for sidebar */}
      <div
        className="min-h-screen flex flex-col relative z-10 transition-all duration-300"
        style={{ paddingLeft: sidebarWidth }}
      >
        <TopNavbar
          onOpenConcepts={() => handleOpenConcept()}
          activeCourseId={activeCourseId}
          onSelectCourse={(id) => setActiveCourseId(id)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet
            context={{ activeCourseId, onOpenConcept: handleOpenConcept, setActiveCourseId, userSession, setUserSession }}
          />
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectConcept={(conceptId) => {
          handleOpenConcept(conceptId);
          setIsSearchOpen(false);
        }}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Global Concept Drawer */}
      {isConceptDrawerOpen && (
        <ConceptDrawer
          conceptId={selectedConceptId}
          onClose={() => {
            setIsConceptDrawerOpen(false);
            setSelectedConceptId(null);
          }}
        />
      )}

      {/* First-run guided tutorial / replay */}
      {isTutorialOpen && (
        <TutorialOverlay
          userSession={userSession}
          setUserSession={setUserSession}
          onComplete={handleTutorialComplete}
        />
      )}
    </div>
  );
};
