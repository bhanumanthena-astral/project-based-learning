import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, ArrowLeft, ArrowRight, CheckCircle, BookOpen, Database, Code2, Layers } from 'lucide-react';
import { courses, concepts as mockConcepts } from '../data/mockData';
import { projectMilestones, skillsData, deliverablesData, projectFilesData } from '../data/extendedCourseData';
import { MilestoneCard } from '../components/courses/MilestoneCard';
import { ProjectFiles } from '../components/courses/ProjectFiles';
import { useBookmarks } from '../hooks/useBookmarks';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { capsules } from '../data/learningCapsules';

export const ProjectOverviewPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { trackView } = useRecentlyViewed();

  const course = courses.find(c => c.id === courseId) || courses[0];
  const milestones = projectMilestones[courseId || course.id] || [];
  const skills = skillsData[courseId || course.id] || [];
  const deliverables = deliverablesData[courseId || course.id] || [];
  const files = projectFilesData[courseId || course.id] || [];

  const courseConcepts = mockConcepts.filter(c => c.courseId === (courseId || course.id));
  const masteredCount = courseConcepts.filter(c => c.mastered).length;

  const iconMap: Record<string, React.ReactNode> = {
    Database: <Database size={40} />,
    Code2: <Code2 size={40} />,
  };

  const [selectedMilestone, setSelectedMilestone] = React.useState<number | null>(null);

  useMemo(() => {
    trackView({ id: course.id, type: 'project', title: course.title });
  }, []);

  const courseLearningCapsules = capsules.filter(capsule => {
    if (courseId === 'dbms-001') return capsule.topic === 'sql' || capsule.topic === 'api';
    if (courseId === 'react-001') return capsule.topic === 'react' || capsule.topic === 'javascript';
    return false;
  });

  return (
    <div className="space-y-6 pb-12">
      <button onClick={() => navigate('/app/courses')} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition font-medium">
        <ArrowLeft size={14} /> Back to Courses
      </button>

      {/* Hero */}
      <div className="glass-card-elevated p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {course.category}
              </span>
              <div className="flex items-center gap-1 text-amber-600">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} className="text-gray-200" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-[#111827]">{course.title}</h1>
            <p className="text-sm text-gray-500">{course.subject}</p>
            <p className="text-sm text-gray-600">
              A comprehensive hands-on project to build a complete {course.subject.toLowerCase()} application from scratch.
              Learn by doing with real-world scenarios and industry best practices.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={14} /> {course.estimatedHours} hours</span>
              <span className="flex items-center gap-1"><Star size={14} /> {course.totalMilestones} milestones</span>
              <span className="flex items-center gap-1"><BookOpen size={14} /> {courseConcepts.length} concepts</span>
              <span className="flex items-center gap-1"><Layers size={14} /> {milestones.reduce((sum, m) => sum + m.xpReward, 0)} XP</span>
            </div>
            <div className="flex gap-2">
              {['SQL', 'React', 'Database', 'Frontend'].filter(t => skills.includes(t) || course.subject.includes(t)).slice(0, 4).map(t => (
                <span key={t} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => { navigate('/app/workspace'); }}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition">
                {course.status === 'active' ? 'Continue building →' : 'Start building →'}
              </button>
            </div>
          </div>
          <div className="w-full md:w-48 shrink-0 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#7c3aed" strokeWidth="2.5"
                  strokeDasharray={`${course.progressPercent * 0.97} 97`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-extrabold text-[#111827]">{course.progressPercent}%</span>
                <span className="text-[10px] text-gray-400 font-medium">complete</span>
              </div>
            </div>
            {course.status === 'active' && (
              <p className="text-xs text-violet-600 font-bold mt-2">Milestone {course.completedMilestones + 1} of {course.totalMilestones}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Roadmap */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold text-[#111827] mb-4">Learning Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {milestones.map(m => (
                <MilestoneCard key={m.id} milestone={m} onClick={() => setSelectedMilestone(m.id)} />
              ))}
            </div>
          </div>

          {/* Concepts */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827]">Concepts You Will Learn</h2>
              <span className="text-xs text-gray-400">{masteredCount}/{courseConcepts.length} mastered</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {courseConcepts.map(c => (
                <span key={c.id} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  c.mastered ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {c.mastered && <CheckCircle size={10} className="inline mr-0.5" />}
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Project Files */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold text-[#111827] mb-3">Project Files</h2>
            <ProjectFiles files={files as any} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Skills */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold text-[#111827] mb-3">Skills You'll Learn</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s} className="bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full border border-violet-200">{s}</span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold text-[#111827] mb-3">Deliverables</h2>
            <ul className="space-y-1.5">
              {deliverables.map(d => (
                <li key={d} className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle size={12} className="text-green-500 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites from Learning Capsules */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold text-[#111827] mb-3">Related Capsules</h2>
            <div className="space-y-1.5">
              {courseLearningCapsules.slice(0, 5).map(c => (
                <div key={c.id}
                  onClick={() => navigate('/app/learning')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                    <BookOpen size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{c.title}</p>
                    <p className="text-[9px] text-gray-400 capitalize">{c.topic} · {c.duration} min · {c.xp} XP</p>
                  </div>
                  <ArrowRight size={12} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
