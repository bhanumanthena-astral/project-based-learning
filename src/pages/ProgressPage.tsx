import React from 'react';
import { Flame, Star, CheckCircle, Lock, Trophy, TrendingUp, BookOpen, Calendar } from 'lucide-react';
import { courses, currentUser, concepts } from '../data/mockData';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const statusOrder: Record<string, number> = { completed: 0, active: 1, locked: 2 };

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

const today = new Date(2026, 6, 28);
const monday = getMonday(today);

const weekDates: Date[] = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(monday);
  d.setDate(d.getDate() - (11 - i) * 7);
  return d;
});

const heatmapFlat: number[] = Array.from({ length: 84 }, (_, i) => {
  if (i >= 72) {
    const offset = i - 72;
    return offset % 3 === 0 ? 3 : 2;
  }
  if (i >= 28) {
    const h = (i * 7 + 13) % 17;
    return h > 10 ? (h > 14 ? 3 : 2) : h > 6 ? 1 : 0;
  }
  return 0;
});

const totalConcepts = concepts.length;
const masteredConcepts = concepts.filter(c => c.mastered).length;

const allMilestones = courses.flatMap(c =>
  c.milestones.map(m => ({
    ...m,
    courseTitle: c.title,
    courseColor: c.accentColor || c.color,
  }))
);
allMilestones.sort((a, b) => {
  const oa = statusOrder[a.status];
  const ob = statusOrder[b.status];
  if (oa !== ob) return oa - ob;
  return a.id - b.id;
});

export const ProgressPage: React.FC = () => {
  const overallPercent = 21;

  return (
    <div className="space-y-8">
      {/* Section 1 — Summary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-violet-600" />
          </div>
          <p className="text-[28px] font-extrabold text-[#7c3aed]">{overallPercent}%</p>
          <p className="text-sm text-gray-500 font-medium">Overall completion</p>
          <div className="mt-3 h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-violet-500" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <BookOpen size={18} className="text-amber-600" />
          </div>
          <p className="text-[28px] font-extrabold text-[#111827]">
            {masteredConcepts}
            <span className="text-lg font-medium text-gray-400"> of {totalConcepts} total</span>
          </p>
          <p className="text-sm text-gray-500 font-medium">Concepts mastered</p>
          <div className="mt-3 h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-amber-500" style={{ width: `${(masteredConcepts / Math.max(totalConcepts, 1)) * 100}%` }} />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <Flame size={18} className="text-green-600" />
          </div>
          <p className="text-[28px] font-extrabold text-[#16a34a]">{currentUser.streak} <span className="text-lg font-medium text-gray-400">days</span></p>
          <p className="text-sm text-gray-500 font-medium">Active streak</p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Best: 18 days</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Star size={18} className="text-amber-600" />
            </div>
            <Trophy size={18} className="text-amber-400" />
          </div>
          <p className="text-[28px] font-extrabold text-[#111827]">{currentUser.xp.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-medium">Total XP</p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Top 18% of batch</p>
        </div>
      </div>

      {/* Section 2 — Per-Course Progress */}
      {courses.map(course => {
        const courseConcepts = concepts.filter(c => c.courseId === course.id);
        return (
          <div key={course.id} className="glass-card p-5 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                  style={{ background: `${course.accentColor}26`, color: course.accentColor }}
                >
                  {course.title.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#111827] truncate">{course.title}</p>
                  <span className="text-xs text-gray-500 font-medium">{course.subject}</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[28px] font-extrabold leading-none" style={{ color: course.accentColor }}>{course.progressPercent}%</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">complete</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-[3px] h-2.5 items-stretch">
                {course.milestones.map(m => {
                  const segWidth = 100 / course.milestones.length;
                  return (
                    <div
                      key={m.id}
                      className="rounded overflow-hidden"
                      style={{ width: `${segWidth}%` }}
                    >
                      {m.status === 'completed' && (
                        <div className="h-full rounded" style={{ backgroundColor: course.accentColor }} />
                      )}
                      {m.status === 'active' && (
                        <div
                          className="h-full rounded animate-pulse"
                          style={{
                            background: `linear-gradient(to right, ${course.accentColor} 40%, #f3f4f6 40%)`,
                          }}
                        />
                      )}
                      {m.status === 'locked' && (
                        <div className="h-full rounded bg-gray-100" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-[3px] mt-1.5">
                {course.milestones.map(m => {
                  const segWidth = 100 / course.milestones.length;
                  return (
                    <span
                      key={m.id}
                      className="text-[10px] font-mono font-medium text-center truncate"
                      style={{
                        width: `${segWidth}%`,
                        color: m.status === 'locked' ? '#d1d5db' : m.status === 'active' ? course.accentColor : '#16a34a',
                      }}
                    >
                      M{m.id}{m.status === 'completed' ? ' \u2713' : m.status === 'active' ? ' \u2192' : ''}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {courseConcepts.map(concept => (
                <span
                  key={concept.id}
                  className={`rounded-full px-3 py-1 text-xs font-medium border ${
                    concept.mastered
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50'
                  }`}
                >
                  {concept.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* Section 3 — Weekly Activity Heatmap */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-5">
          <Calendar size={16} className="text-violet-500" />
          <h3 className="text-base font-bold text-[#111827]">Learning activity &mdash; last 12 weeks</h3>
        </div>

        <div className="flex">
          <div className="w-[36px] shrink-0" />
          <div className="flex gap-[3px] flex-1">
            {weekDates.map((d, w) => (
              <div key={w} className="flex-1 text-center">
                <span className="text-[10px] text-gray-400">{formatDate(d)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-1">
          <div className="flex flex-col gap-[3px] mr-2 shrink-0">
            {dayLabels.map(d => (
              <span key={d} className="text-[10px] text-gray-400 h-[14px] leading-[14px]">{d}</span>
            ))}
          </div>
          <div className="flex gap-[3px] flex-1">
            {Array.from({ length: 12 }, (_, w) => (
              <div key={w} className="flex flex-col gap-[3px] flex-1 items-center">
                {Array.from({ length: 7 }, (_, d) => {
                  const val = heatmapFlat[w * 7 + d];
                  const colorClass =
                    val === 0 ? 'bg-gray-100' :
                    val === 1 ? 'bg-violet-200' :
                    val === 2 ? 'bg-violet-400' :
                    'bg-violet-700';
                  return (
                    <div
                      key={d}
                      className={`w-full aspect-square max-w-[14px] rounded-sm ${colorClass}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-1.5 mt-4">
          <span className="text-[10px] text-gray-400 font-medium">Less</span>
          {[0, 1, 2, 3].map(v => {
            const colorClass =
              v === 0 ? 'bg-gray-100' :
              v === 1 ? 'bg-violet-200' :
              v === 2 ? 'bg-violet-400' :
              'bg-violet-700';
            return (
              <div key={v} className={`w-[14px] h-[14px] rounded-sm ${colorClass}`} />
            );
          })}
          <span className="text-[10px] text-gray-400 font-medium">More</span>
        </div>
      </div>

      {/* Section 4 — Milestone Timeline */}
      <div className="glass-card p-5">
        <h3 className="text-base font-bold text-[#111827] mb-5">Milestone history</h3>
        <div className="space-y-0">
          {allMilestones.map((m, idx) => (
            <div key={`${m.courseTitle}-${m.id}`} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-[10px] h-[10px] rounded-full mt-1.5 ${
                    m.status === 'completed' ? 'bg-green-500' :
                    m.status === 'active' ? 'bg-violet-500 animate-pulse' : 'bg-gray-300'
                  }`}
                />
                {idx < allMilestones.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 my-0.5" />
                )}
              </div>
              <div className={`pb-5 flex-1 min-w-0 ${m.status === 'locked' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-bold ${m.status === 'locked' ? 'text-gray-400' : 'text-[#111827]'}`}>
                    {m.title}
                  </p>
                  {m.status === 'completed' && (
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                  )}
                  {m.status === 'active' && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 leading-none">
                      In progress
                    </span>
                  )}
                  {m.status === 'locked' && (
                    <Lock size={12} className="text-gray-300 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{m.courseTitle}</p>
                {m.completedAt && (
                  <p className="text-[11px] text-gray-400 font-medium">{m.completedAt}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
