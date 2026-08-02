import React, { useState, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { BookOpen, CheckCircle, Lock, Clock, ArrowRight, Database, Code2, Layers, Star, Bookmark, FileText, Activity, Award, BarChart3, TrendingUp, Target, Zap, BookMarked, ArrowLeft, Plus, X, BrainCircuit, Flag } from 'lucide-react';
import { courses, concepts as mockConcepts } from '../data/mockData';
import { projectMilestones, detailedConcepts, projectResources, analyticsData, courseAchievements } from '../data/extendedCourseData';
import { MilestoneCard } from '../components/courses/MilestoneCard';
import { ConceptCard } from '../components/courses/ConceptCard';
import { ResourceCenter } from '../components/courses/ResourceCenter';
import { CourseAnalytics } from '../components/courses/CourseAnalytics';
import { AchievementList } from '../components/courses/AchievementList';
import { NotesPanel } from '../components/courses/NotesPanel';
import { BookmarkedItems } from '../components/courses/BookmarkedItems';
import { RecentlyViewed } from '../components/courses/RecentlyViewed';
import { EmptyState } from '../components/courses/EmptyState';
import { useBookmarks } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { CourseBookmark, RecentlyViewedItem } from '../types/courses';

type CourseTab = 'overview' | 'roadmap' | 'concepts' | 'resources' | 'analytics' | 'achievements' | 'bookmarks' | 'notes' | 'recent';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useOutletContext<{ activeCourseId: string; onOpenConcept: (id?: string) => void; setActiveCourseId: (id: string) => void }>();
  const onOpenConcept = context?.onOpenConcept;
  const setActiveCourseId = context?.setActiveCourseId;
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { notes, addNote, updateNote, deleteNote, getNotesForCourse } = useNotes();
  const { recentItems, trackView } = useRecentlyViewed();
  const [activeTab, setActiveTab] = useState<CourseTab>('overview');
  const [activeCourseView, setActiveCourseView] = useState<string>(courses[0].id);

  const dbms = courses[0];
  const react = courses[1];
  const activeCourse = courses.find(c => c.id === activeCourseView) || dbms;
  const activeMilestones = projectMilestones[activeCourse.id] || [];
  const activeCourseConcepts = detailedConcepts.filter(c => c.courseId === activeCourse.id);
  const activeResources = projectResources.filter(r => r.courseId === activeCourse.id);
  const courseNotes = getNotesForCourse(activeCourse.id);
  const masteredConcepts = activeCourseConcepts.filter(c => c.mastered).length;

  const extendedConcepts = useMemo(() => [
    ...mockConcepts,
    { id: '2nf', name: 'Second Normal Form', category: 'Normalization', mastered: false, courseId: 'dbms-001', explanation: 'Unlocks in Milestone 3', miniExample: '', projectApplication: '' },
    { id: 'indexes', name: 'Database Indexes', category: 'Performance', mastered: false, courseId: 'dbms-001', explanation: 'Unlocks in Milestone 5', miniExample: '', projectApplication: '' },
  ], []);

  const tabs: { key: CourseTab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity size={14} /> },
    { key: 'roadmap', label: 'Roadmap', icon: <Flag size={14} /> },
    { key: 'concepts', label: 'Concepts', icon: <BookOpen size={14} /> },
    { key: 'resources', label: 'Resources', icon: <FileText size={14} /> },
    { key: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
    { key: 'achievements', label: 'Achievements', icon: <Award size={14} /> },
    { key: 'bookmarks', label: 'Bookmarks', icon: <Bookmark size={14} /> },
    { key: 'notes', label: 'Notes', icon: <FileText size={14} /> },
    { key: 'recent', label: 'Recent', icon: <Clock size={14} /> },
  ];

  const handleBookmarkNavigate = (b: CourseBookmark) => {
    if (b.type === 'concept') onOpenConcept?.(b.targetId);
    else if (b.type === 'capsule') navigate('/app/learning');
    else navigate(`/app/courses/${b.courseId}/overview`);
  };

  const handleRecentNavigate = (item: RecentlyViewedItem) => {
    if (item.type === 'concept') trackView(item);
    onOpenConcept?.(item.id);
  };

  const conceptTabs = ['All', 'Mastered', 'In Progress'];
  const [conceptFilter, setConceptFilter] = useState('All');
  const filteredConcepts = conceptFilter === 'All' ? extendedConcepts : conceptFilter === 'Mastered' ? extendedConcepts.filter(c => c.mastered) : extendedConcepts.filter(c => !c.mastered);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#111827]">Your courses</h1>
          <p className="text-sm text-gray-500">Track your learning journey across {courses.length} courses</p>
        </div>
        <button onClick={() => navigate('/app/learning')}
          className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
          <BrainCircuit size={14} /> Browse Capsules
        </button>
      </div>

      {/* Course Selector Tabs */}
      <div className="flex gap-2">
        {courses.map(c => (
          <button key={c.id} onClick={() => setActiveCourseView(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCourseView === c.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {c.title}
          </button>
        ))}
      </div>

      {/* Sub-navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === t.key ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-100'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ==================== TAB: OVERVIEW ==================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Course Hero */}
          <div className="glass-card-elevated p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                {activeCourse.status === 'active' && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">ACTIVE</span>}
                <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{activeCourse.category}</span>
              </div>
              <h1 className="text-[22px] font-extrabold text-[#111827]">{activeCourse.title}</h1>
              <p className="text-sm text-gray-500 font-medium">{activeCourse.subject}</p>
              {activeCourse.status === 'active' && activeMilestones.length > 0 && (
                <p className="text-sm text-gray-600">
                  You're on Milestone {activeMilestones.find(m => m.status === 'active')?.id || activeCourse.completedMilestones + 1} of {activeMilestones.length}. Next: {activeMilestones.find(m => m.status === 'active')?.title || 'Getting started'}
                </p>
              )}
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${activeCourse.progressPercent}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>{activeCourse.progressPercent}% of project built</span>
                  <span>{activeCourse.completedMilestones} of {activeCourse.totalMilestones} milestones</span>
                </div>
              </div>
              {activeCourse.status === 'active' && activeMilestones.filter(m => m.status === 'active').length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-1.5 font-medium">Coming up next</p>
                  <div className="flex gap-2">
                    {activeMilestones.find(m => m.status === 'active')?.concepts.slice(0, 4).map(c => (
                      <span key={c} className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-1">
                <button onClick={() => { setActiveCourseId?.(activeCourse.id); navigate('/app/workspace'); }}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition">Continue →</button>
                <button onClick={() => navigate(`/app/courses/${activeCourse.id}/overview`)}
                  className="bg-white border border-gray-200 hover:border-gray-300 px-5 py-2.5 rounded-xl font-bold text-sm transition">View project</button>
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {activeCourse.category === 'Backend' ? 'Project Tables' : 'Project Structure'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {activeCourse.tables.length > 0 ? activeCourse.tables.map(t => (
                  <div key={t.name} className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border ${
                    t.status === 'built' ? 'bg-green-50 border-green-200 text-green-700' :
                    t.status === 'active' ? 'bg-violet-50 border-violet-200 text-violet-700' :
                    'bg-gray-50 border-gray-200 text-gray-400 border-dashed'
                  }`}>
                    {t.status === 'locked' && '🔒 '}{t.name}
                  </div>
                )) : (
                  <div className="col-span-2 text-xs text-gray-400 p-2">
                    <p className="font-bold mb-1">📁 src/</p>
                    <p className="text-gray-400">components/ · pages/ · hooks/</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Concepts', value: `${masteredConcepts}/${activeCourseConcepts.length}`, icon: <BookOpen size={18} />, color: 'bg-violet-50 text-violet-600 border-violet-200' },
              { label: 'Milestones', value: `${activeMilestones.filter(m => m.status === 'completed').length}/${activeMilestones.length}`, icon: <Flag size={18} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              { label: 'XP Earned', value: `${activeMilestones.filter(m => m.status === 'completed').reduce((s, m) => s + m.xpReward, 0)}`, icon: <Star size={18} />, color: 'bg-amber-50 text-amber-600 border-amber-200' },
              { label: 'Time Spent', value: `${Math.floor((analyticsData.timeSpent * (activeCourse.progressPercent / 100)) / 60)}h`, icon: <Clock size={18} />, color: 'bg-blue-50 text-blue-600 border-blue-200' },
            ].map(s => (
              <div key={s.label} className={`rounded-xl p-3 border ${s.color} flex items-center gap-2.5`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/60 border border-inherit">{s.icon}</div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">{s.label}</p>
                  <p className="text-sm font-extrabold">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enrolled Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DBMS Card */}
            <div className="glass-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
                  <Database size={20} color="#7c3aed" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">{dbms.title}</p>
                <p className="text-xs text-gray-500 font-medium">{dbms.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">
                  {dbms.milestones.filter(m => m.status === 'completed').length > 0
                    ? `Step ${dbms.milestones.find(m => m.status === 'active')?.id || dbms.totalMilestones} of ${dbms.totalMilestones}`
                    : "Haven't started yet"}
                </p>
                <div className="flex gap-0.5">
                  {dbms.milestones.map(m => (
                    <div key={m.id} className={`h-2 flex-1 rounded-full ${
                      m.status === 'completed' ? 'bg-violet-500' : m.status === 'active' ? 'bg-violet-400' : 'bg-gray-200'
                    }`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">{masteredConcepts} of {activeCourseConcepts.length} concepts</p>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${dbms.progressPercent}%` }} />
                </div>
              </div>
              <p className="text-xs text-gray-400">Last accessed: {dbms.lastAccessed ? new Date(dbms.lastAccessed).toLocaleDateString() : 'Never'}</p>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => { navigate(`/app/courses/${dbms.id}/overview`); }}
                  className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 py-2.5 rounded-xl font-bold text-xs transition">Details</button>
                <button onClick={() => { setActiveCourseId?.(dbms.id); navigate('/app/workspace'); }}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl font-bold text-xs transition">Continue</button>
              </div>
            </div>

            {/* React Card */}
            <div className="glass-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.12)' }}>
                  <Code2 size={20} color="#0ea5e9" />
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">START</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">{react.title}</p>
                <p className="text-xs text-gray-500 font-medium">{react.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Haven't started yet</p>
                <div className="flex gap-0.5">
                  {react.milestones.map(m => (
                    <div key={m.id} className="h-2 flex-1 rounded-full bg-gray-200" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400">{react.totalMilestones} steps · {react.concepts} concepts · ~{react.estimatedHours} hrs</p>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => { navigate(`/app/courses/${react.id}/overview`); }}
                  className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 py-2.5 rounded-xl font-bold text-xs transition">Details</button>
                <button onClick={() => { setActiveCourseId?.(react.id); navigate('/app/workspace'); }}
                  className="flex-1 text-white py-2.5 rounded-xl font-bold text-xs transition" style={{ background: '#0ea5e9' }}>Start</button>
              </div>
            </div>

            {/* Locked Card */}
            <div className="glass-card p-5 flex flex-col gap-3 relative" style={{ opacity: 0.65 }}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                  <Layers size={20} color="#f59e0b" />
                </div>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">LOCKED</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">Pathfinder Visualizer</p>
                <p className="text-xs text-gray-500 font-medium">Data Structures and Algorithms</p>
              </div>
              <div className="flex-1 flex items-center justify-center py-4">
                <Lock size={24} className="text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 text-center">Prerequisite: Complete 2 milestones in DBMS first</p>
              <button className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl font-bold text-xs cursor-not-allowed mt-auto" disabled>Coming soon</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB: ROADMAP ==================== */}
      {activeTab === 'roadmap' && (
        <div>
          {activeMilestones.length === 0 ? (
            <EmptyState type="projects" title="No milestones yet" description="Milestones will appear when you start this course." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeMilestones.map(m => (
                <MilestoneCard key={m.id} milestone={m} onClick={() => {
                  if (m.status !== 'locked') {
                    setActiveCourseId?.(activeCourse.id);
                    navigate('/app/workspace');
                  }
                }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB: CONCEPTS ==================== */}
      {activeTab === 'concepts' && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Concepts Library</h2>
            <button onClick={() => navigate('/app/courses/concepts')}
              className="text-xs text-violet-600 font-bold hover:text-violet-800 transition">View all →</button>
          </div>
          <div className="flex gap-2 mb-4">
            {conceptTabs.map(tab => (
              <button key={tab} onClick={() => setConceptFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  conceptFilter === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>{tab}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filteredConcepts.map(c => (
              <div key={c.id}
                onClick={() => onOpenConcept?.(c.id)}
                className="bg-white border border-gray-100 rounded-xl p-3.5 hover:border-gray-200 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[13px] font-bold text-[#111827]">{c.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{c.category}</span>
                    {c.mastered && <CheckCircle size={14} className="text-green-500" />}
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">{c.explanation}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{c.courseId}</span>
                  <span onClick={(e) => { e.stopPropagation(); onOpenConcept?.(c.id); }}
                    className="text-[11px] text-violet-600 font-medium cursor-pointer">View concept →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB: RESOURCES ==================== */}
      {activeTab === 'resources' && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Resource Center</h2>
            <span className="text-xs text-gray-400">{activeResources.length} resources</span>
          </div>
          <ResourceCenter
            resources={activeResources}
            onBookmark={(id) => {
              const res = activeResources.find(r => r.id === id);
              if (!res) return;
              if (isBookmarked(id, 'resource')) removeBookmark(id, 'resource');
              else addBookmark({ id: `bm-${id}`, type: 'resource', targetId: id, courseId: activeCourse.id, title: res.title, addedAt: new Date().toISOString() });
            }}
            isBookmarked={(id) => isBookmarked(id, 'resource')}
          />
        </div>
      )}

      {/* ==================== TAB: ANALYTICS ==================== */}
      {activeTab === 'analytics' && (
        <div className="glass-card p-5">
          <h2 className="text-base font-bold text-[#111827] mb-4">Course Analytics</h2>
          <CourseAnalytics analytics={analyticsData} />
        </div>
      )}

      {/* ==================== TAB: ACHIEVEMENTS ==================== */}
      {activeTab === 'achievements' && (
        <div className="glass-card p-5">
          <h2 className="text-base font-bold text-[#111827] mb-4">Achievements</h2>
          <AchievementList achievements={courseAchievements} />
        </div>
      )}

      {/* ==================== TAB: BOOKMARKS ==================== */}
      {activeTab === 'bookmarks' && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Bookmarked Items</h2>
            {bookmarks.length > 0 && (
              <button onClick={() => removeBookmark('', '')} className="text-xs text-gray-400 hover:text-red-500 transition">Clear all</button>
            )}
          </div>
          <BookmarkedItems
            bookmarks={bookmarks}
            onRemove={(id, type) => removeBookmark(id, type)}
            onNavigate={handleBookmarkNavigate}
          />
        </div>
      )}

      {/* ==================== TAB: NOTES ==================== */}
      {activeTab === 'notes' && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">My Notes</h2>
            <span className="text-xs text-gray-400">{courseNotes.length} notes</span>
          </div>
          <NotesPanel
            notes={courseNotes}
            onAdd={(content) => addNote({ courseId: activeCourse.id, content })}
            onUpdate={(id, content) => updateNote(id, content)}
            onDelete={(id) => deleteNote(id)}
          />
        </div>
      )}

      {/* ==================== TAB: RECENT ==================== */}
      {activeTab === 'recent' && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Recently Viewed</h2>
            {recentItems.length > 0 && (
              <button onClick={() => {}} className="text-xs text-gray-400 hover:text-red-500 transition">Clear</button>
            )}
          </div>
          <RecentlyViewed items={recentItems} onNavigate={handleRecentNavigate} />
        </div>
      )}
    </div>
  );
};
