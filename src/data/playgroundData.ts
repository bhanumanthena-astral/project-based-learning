export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ComponentStatus = 'locked' | 'active' | 'completed';

export interface CheckerRule {
  id: string;
  label: string;
  check: string;
  required: boolean;
}

export interface PlaygroundComponent {
  id: string;
  milestoneId: number;
  filename: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  conceptTags: string[];
  status: ComponentStatus;
  starterCode: string;
  solutionPreviewHTML: string;
  checkerRules: CheckerRule[];
  hints: string[];
}

export interface CssComponent {
  id: string;
  filename: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  conceptTags: string[];
  status: ComponentStatus;
  starterCode: string;
  solutionPreviewHTML: string;
}

export interface ChallengeComponent {
  id: string;
  filename: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  timeLimit: number; // minutes
  xpReward: number;
  conceptTags: string[];
  status: 'active' | 'completed';
  starterCode: string;
  checkerRules: CheckerRule[];
  hints: string[];
}

export const reactComponents: PlaygroundComponent[] = [
  // ─── MILESTONE 1 ───────────────────────────────────────────────
  {
    id: 'login-page',
    milestoneId: 1,
    filename: 'LoginPage.jsx',
    title: 'Login Page',
    description: 'Build a clean login form with email and password inputs, form validation, and a submit handler.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    conceptTags: ['useState', 'Forms', 'Controlled Inputs', 'JSX', 'Event Handlers'],
    status: 'completed',
    hints: [
      'Use useState for email and password values',
      'Add onChange handlers to each input',
      'Prevent default form submission with e.preventDefault()',
      'Add basic validation — check if email includes @',
    ],
    checkerRules: [
      { id: 'has-email-input', label: 'Has email input', check: 'type="email"', required: true },
      { id: 'has-password-input', label: 'Has password input', check: 'type="password"', required: true },
      { id: 'has-form', label: 'Has a form element', check: '<form', required: true },
      { id: 'has-submit', label: 'Has submit button', check: 'type="submit"', required: true },
      { id: 'has-usestate', label: 'Uses useState', check: 'useState', required: true },
      { id: 'has-onchange', label: 'Handles input changes', check: 'onChange', required: true },
    ],
    starterCode: `import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    alert('Welcome, ' + email + '!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #fdf4ff 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.9)',
        borderRadius: '24px',
        padding: '40px',
        width: '360px',
        boxShadow: '0 8px 40px rgba(124,58,237,0.12)',
      }}>
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>B</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1e1b4b' }}>
            Welcome back
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#9ca3af' }}>
            Sign in to continue building
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '11px 14px',
                border: '1px solid #e5e7eb', borderRadius: '12px',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.7)',
                transition: 'border 0.15s',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '11px 14px',
                border: '1px solid #e5e7eb', borderRadius: '12px',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.7)',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px', fontWeight: 500 }}>
              {error}
            </p>
          )}

          <button type="submit" style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
          }}>
            Sign in →
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '20px' }}>
          New here?{' '}
          <span style={{ color: '#7c3aed', fontWeight: 600, cursor: 'pointer' }}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #fdf4ff 100%); }
.card { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.9); border-radius: 24px; padding: 40px;
  width: 340px; box-shadow: 0 8px 40px rgba(124,58,237,0.12); }
.logo { width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.logo span { color: white; font-weight: 800; font-size: 18px; }
h2 { font-size: 22px; font-weight: 800; color: #1e1b4b; margin-bottom: 6px; }
p.sub { font-size: 14px; color: #9ca3af; margin-bottom: 24px; }
label { display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 6px; }
input { width: 100%; padding: 11px 14px; border: 1px solid #e5e7eb; border-radius: 12px;
  font-size: 14px; margin-bottom: 14px; background: rgba(255,255,255,0.7); }
button { width: 100%; padding: 12px; background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: white; border: none; border-radius: 12px; font-size: 15px;
  font-weight: 700; cursor: pointer; box-shadow: 0 4px 16px rgba(124,58,237,0.35); }
.footer { text-align: center; font-size: 13px; color: #9ca3af; margin-top: 18px; }
.footer span { color: #7c3aed; font-weight: 600; cursor: pointer; }
</style></head><body>
<div class="card">
  <div class="logo"><span>B</span></div>
  <h2>Welcome back</h2>
  <p class="sub">Sign in to continue building</p>
  <label>Email address</label>
  <input type="email" placeholder="you@university.edu" />
  <label>Password</label>
  <input type="password" placeholder="••••••••" style="margin-bottom:20px" />
  <button>Sign in →</button>
  <p class="footer">New here? <span>Create an account</span></p>
</div>
</body></html>`,
  },

  // ─── MILESTONE 2 ───────────────────────────────────────────────
  {
    id: 'job-card',
    milestoneId: 2,
    filename: 'JobCard.jsx',
    title: 'Job Card Component',
    description: 'Build a reusable Job Card that accepts props and displays job details with a save/apply button with toggle state.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    conceptTags: ['Props', 'useState', 'Conditional Rendering', 'Component Reuse', 'Array.map()'],
    status: 'active',
    hints: [
      'Accept job data as props: title, company, location, salary, type',
      'Use useState for the saved/bookmarked toggle',
      'Render a list of 3 JobCard components from an array using .map()',
      'Use conditional rendering to show "Saved ✓" vs "Save" on the button',
    ],
    checkerRules: [
      { id: 'has-props', label: 'Component accepts props', check: 'props', required: true },
      { id: 'has-map', label: 'Uses .map() to render list', check: '.map(', required: true },
      { id: 'has-usestate', label: 'Uses useState for toggle', check: 'useState', required: true },
      { id: 'has-conditional', label: 'Has conditional rendering', check: '?', required: true },
      { id: 'has-key', label: 'Uses key prop in list', check: 'key=', required: true },
      { id: 'has-button', label: 'Has apply/save button', check: '<button', required: true },
    ],
    starterCode: `import { useState } from 'react';

const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Nxtagent AI', location: 'Hyderabad, India', salary: '₹8-12 LPA', type: 'Full-time', logo: '🤖' },
  { id: 2, title: 'React Engineer', company: 'TechCorp', location: 'Bangalore, India', salary: '₹10-15 LPA', type: 'Remote', logo: '⚡' },
  { id: 3, title: 'UI Developer', company: 'Startup Labs', location: 'Chennai, India', salary: '₹6-9 LPA', type: 'Hybrid', logo: '🚀' },
];

function JobCard(props) {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{
      background: 'white', borderRadius: '16px', padding: '20px',
      border: '1px solid #e5e7eb', marginBottom: '12px',
      display: 'flex', alignItems: 'flex-start', gap: '14px',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
        background: '#f3f4f6', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '22px',
      }}>
        {props.logo}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1e1b4b' }}>
              {props.title}
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#6b7280' }}>
              {props.company} · {props.location}
            </p>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', border: saved ? '1px solid #7c3aed' : '1px solid #e5e7eb',
              background: saved ? '#ede9fe' : 'white',
              color: saved ? '#7c3aed' : '#6b7280',
              transition: 'all 0.15s',
            }}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600,
            background: '#ede9fe', color: '#7c3aed',
          }}>{props.salary}</span>
          <span style={{
            padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600,
            background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0',
          }}>{props.type}</span>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <div style={{
      maxWidth: '600px', margin: '0 auto', padding: '24px 16px',
      fontFamily: 'Inter, system-ui, sans-serif',
      background: '#f9fafb', minHeight: '100vh',
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b', marginBottom: '4px' }}>
        Job listings
      </h2>
      <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
        {jobs.length} positions available
      </p>
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { background: #f9fafb; padding: 24px 16px; }
.page-title { font-size: 20px; font-weight: 800; color: #1e1b4b; margin-bottom: 4px; }
.page-sub { font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
.card { background: white; border-radius: 16px; padding: 20px; border: 1px solid #e5e7eb;
  margin-bottom: 12px; display: flex; align-items: flex-start; gap: 14px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
.logo { width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
  background: #f3f4f6; display: flex; align-items: center;
  justify-content: center; font-size: 22px; }
.card-body { flex: 1; }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; }
h3 { font-size: 15px; font-weight: 700; color: #1e1b4b; }
.company { font-size: 13px; color: #6b7280; margin-top: 3px; }
.save-btn { padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
  cursor: pointer; border: 1px solid #e5e7eb; background: white; color: #6b7280; }
.chips { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.chip-violet { padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
  background: #ede9fe; color: #7c3aed; }
.chip-green { padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
  background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.chip-blue { padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
  background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
</style></head><body>
<h2 class="page-title">Job listings</h2>
<p class="page-sub">3 positions available</p>
<div class="card">
  <div class="logo">🤖</div>
  <div class="card-body">
    <div class="card-header">
      <div><h3>Frontend Developer</h3><p class="company">Nxtagent AI · Hyderabad, India</p></div>
      <button class="save-btn">Save</button>
    </div>
    <div class="chips">
      <span class="chip-violet">₹8-12 LPA</span>
      <span class="chip-green">Full-time</span>
    </div>
  </div>
</div>
<div class="card">
  <div class="logo">⚡</div>
  <div class="card-body">
    <div class="card-header">
      <div><h3>React Engineer</h3><p class="company">TechCorp · Bangalore, India</p></div>
      <button class="save-btn">Save</button>
    </div>
    <div class="chips">
      <span class="chip-violet">₹10-15 LPA</span>
      <span class="chip-blue">Remote</span>
    </div>
  </div>
</div>
<div class="card">
  <div class="logo">🚀</div>
  <div class="card-body">
    <div class="card-header">
      <div><h3>UI Developer</h3><p class="company">Startup Labs · Chennai, India</p></div>
      <button class="save-btn" style="background:#ede9fe;color:#7c3aed;border-color:#7c3aed">✓ Saved</button>
    </div>
    <div class="chips">
      <span class="chip-violet">₹6-9 LPA</span>
      <span class="chip-blue">Hybrid</span>
    </div>
  </div>
</div>
</body></html>`,
  },

  // ─── MILESTONE 3 ───────────────────────────────────────────────
  {
    id: 'search-filter',
    milestoneId: 3,
    filename: 'SearchFilter.jsx',
    title: 'Search and Filter Bar',
    description: 'Build a live search + filter system that filters the job list in real time as the user types, and also filters by job type.',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    conceptTags: ['useEffect', 'Controlled Inputs', 'Array.filter()', 'String methods', 'Derived State'],
    status: 'locked',
    hints: [
      'Store the search query in useState',
      'Use .filter() + .toLowerCase().includes() to filter jobs',
      'Also filter by type using a separate select/button group',
      'Combine both filters: job must match BOTH the query AND the type',
      'Show "No results found" when the filtered array is empty',
    ],
    checkerRules: [
      { id: 'has-filter', label: 'Uses Array.filter()', check: '.filter(', required: true },
      { id: 'has-search-input', label: 'Has search text input', check: 'type="text"', required: true },
      { id: 'has-tolowercase', label: 'Case-insensitive search', check: 'toLowerCase', required: true },
      { id: 'has-usestate', label: 'Search state in useState', check: 'useState', required: true },
      { id: 'has-includes', label: 'Uses .includes() for match', check: '.includes(', required: true },
      { id: 'has-empty', label: 'Handles empty results', check: 'length === 0', required: false },
    ],
    starterCode: `import { useState } from 'react';

const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Nxtagent AI', type: 'Full-time', logo: '🤖' },
  { id: 2, title: 'React Engineer', company: 'TechCorp', type: 'Remote', logo: '⚡' },
  { id: 3, title: 'UI Developer', company: 'Startup Labs', type: 'Hybrid', logo: '🚀' },
  { id: 4, title: 'Product Designer', company: 'DesignCo', type: 'Full-time', logo: '🎨' },
  { id: 5, title: 'Backend Engineer', company: 'CloudBase', type: 'Remote', logo: '☁️' },
];

const types = ['All', 'Full-time', 'Remote', 'Hybrid'];

export default function SearchFilter() {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase()) ||
                         job.company.toLowerCase().includes(query.toLowerCase());
    const matchesType = activeType === 'All' || job.type === activeType;
    return matchesQuery && matchesType;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px',
      fontFamily: 'Inter, system-ui, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b', marginBottom: '16px' }}>
        Find your next role
      </h2>

      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%',
          transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="Search jobs, companies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 14px 12px 42px',
            border: '1px solid #e5e7eb', borderRadius: '12px',
            fontSize: '14px', outline: 'none', boxSizing: 'border-box',
            background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        />
        {query && (
          <button onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)', background: 'none', border: 'none',
              cursor: 'pointer', color: '#9ca3af', fontSize: '16px' }}>×</button>
        )}
      </div>

      {/* Type filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {types.map(type => (
          <button key={type} onClick={() => setActiveType(type)} style={{
            padding: '7px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
            border: activeType === type ? '1px solid #7c3aed' : '1px solid #e5e7eb',
            background: activeType === type ? '#ede9fe' : 'white',
            color: activeType === type ? '#7c3aed' : '#6b7280',
          }}>
            {type}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', fontWeight: 500 }}>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        {query && \` for "\${query}"\`}
      </p>

      {/* Job list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
          <p style={{ fontWeight: 600 }}>No jobs found</p>
          <p style={{ fontSize: '13px', marginTop: '4px' }}>Try a different search or filter</p>
        </div>
      ) : (
        filtered.map(job => (
          <div key={job.id} style={{ background: 'white', borderRadius: '14px', padding: '16px',
            border: '1px solid #e5e7eb', marginBottom: '10px',
            display: 'flex', alignItems: 'center', gap: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '24px' }}>{job.logo}</div>
            <div>
              <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '14px' }}>{job.title}</p>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{job.company}</p>
            </div>
            <span style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: '99px',
              fontSize: '11px', fontWeight: 600, background: '#ede9fe', color: '#7c3aed' }}>
              {job.type}
            </span>
          </div>
        ))
      )}
    </div>
  );
}`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { background: #f9fafb; padding: 24px 16px; }
h2 { font-size: 20px; font-weight: 800; color: #1e1b4b; margin-bottom: 16px; }
.search-wrap { position: relative; margin-bottom: 12px; }
.search-wrap span { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); }
input { width: 100%; padding: 12px 14px 12px 42px; border: 1px solid #e5e7eb;
  border-radius: 12px; font-size: 14px; background: white; }
.filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.chip { padding: 7px 16px; border-radius: 99px; font-size: 12px; font-weight: 600;
  border: 1px solid #e5e7eb; background: white; color: #6b7280; }
.chip.active { background: #ede9fe; color: #7c3aed; border-color: #7c3aed; }
.count { font-size: 12px; color: #9ca3af; font-weight: 500; margin-bottom: 12px; }
.job { background: white; border-radius: 14px; padding: 16px; border: 1px solid #e5e7eb;
  margin-bottom: 10px; display: flex; align-items: center; gap: 14px; }
.job-logo { font-size: 24px; }
.job-title { font-weight: 700; color: #1e1b4b; font-size: 14px; }
.job-company { font-size: 12px; color: #6b7280; margin-top: 2px; }
.type-chip { margin-left: auto; padding: 4px 10px; border-radius: 99px;
  font-size: 11px; font-weight: 600; background: #ede9fe; color: #7c3aed; }
</style></head><body>
<h2>Find your next role</h2>
<div class="search-wrap"><span>🔍</span><input placeholder="Search jobs, companies..." /></div>
<div class="filters">
  <span class="chip active">All</span><span class="chip">Full-time</span>
  <span class="chip">Remote</span><span class="chip">Hybrid</span>
</div>
<p class="count">5 results</p>
<div class="job"><div class="job-logo">🤖</div><div><p class="job-title">Frontend Developer</p><p class="job-company">Nxtagent AI</p></div><span class="type-chip">Full-time</span></div>
<div class="job"><div class="job-logo">⚡</div><div><p class="job-title">React Engineer</p><p class="job-company">TechCorp</p></div><span class="type-chip">Remote</span></div>
<div class="job"><div class="job-logo">🚀</div><div><p class="job-title">UI Developer</p><p class="job-company">Startup Labs</p></div><span class="type-chip">Hybrid</span></div>
<div class="job"><div class="job-logo">🎨</div><div><p class="job-title">Product Designer</p><p class="job-company">DesignCo</p></div><span class="type-chip">Full-time</span></div>
<div class="job"><div class="job-logo">☁️</div><div><p class="job-title">Backend Engineer</p><p class="job-company">CloudBase</p></div><span class="type-chip">Remote</span></div>
</body></html>`,
  },

  // ─── MILESTONE 4 ───────────────────────────────────────────────
  {
    id: 'job-detail',
    milestoneId: 4,
    filename: 'JobDetail.jsx',
    title: 'Job Detail Page',
    description: 'Build a full job detail view — description, requirements, company info, and an Apply button with a success state.',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    conceptTags: ['React Router', 'useParams', 'Props drilling', 'Conditional Rendering', 'useEffect'],
    status: 'locked',
    hints: [
      'Show a back arrow button that returns to listings',
      'Display job title, company, salary, type, location as a hero section',
      'List responsibilities and requirements as bullet points',
      'Apply button toggles to "Applied ✓" with a green success state',
      'Add a company card section with name, size, and industry',
    ],
    checkerRules: [
      { id: 'has-back', label: 'Has a back/return button', check: 'back', required: true },
      { id: 'has-apply', label: 'Has Apply button', check: 'Apply', required: true },
      { id: 'has-applied-state', label: 'Shows applied success state', check: 'Applied', required: true },
      { id: 'has-usestate', label: 'Uses useState for apply state', check: 'useState', required: true },
      { id: 'has-list', label: 'Shows requirements list', check: '<li', required: true },
      { id: 'has-conditional', label: 'Conditionally renders apply state', check: '?', required: true },
    ],
    starterCode: `import { useState } from 'react';

const job = {
  id: 1,
  title: 'Frontend Developer',
  company: 'Nxtagent AI',
  location: 'Hyderabad, India',
  salary: '₹8-12 LPA',
  type: 'Full-time',
  logo: '🤖',
  postedAt: '2 days ago',
  companySize: '50-100 employees',
  industry: 'EdTech / AI',
  about: 'Nxtagent AI is building the next generation of AI-powered learning tools for engineering colleges across India. We help students get job-ready through project-based learning.',
  responsibilities: [
    'Build responsive React components from Figma designs',
    'Integrate REST APIs and manage state with Zustand',
    'Write clean, reusable component code with TypeScript',
    'Collaborate with design and backend teams in sprints',
    'Participate in code reviews and maintain code quality',
  ],
  requirements: [
    'Proficiency in React, JavaScript (ES6+), and HTML/CSS',
    '1+ year of experience with React projects',
    'Understanding of REST APIs and async/await',
    'Familiarity with Git and version control',
    'Good communication skills and team mindset',
  ],
};

export default function JobDetail() {
  const [applied, setApplied] = useState(false);
  const [showBack, setShowBack] = useState(false);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 16px',
      fontFamily: 'Inter, system-ui, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      
      {/* Back button */}
      <button onClick={() => setShowBack(true)} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#7c3aed', fontSize: '13px', fontWeight: 600,
        marginBottom: '20px', padding: 0,
      }}>
        ← Back to listings
      </button>

      {/* Hero card */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '28px',
        border: '1px solid #e5e7eb', marginBottom: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#f3f4f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
            {job.logo}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1e1b4b' }}>
              {job.title}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#6b7280', fontWeight: 500 }}>
              {job.company} · {job.location}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>
              Posted {job.postedAt}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[job.salary, job.type, job.industry].map((tag, i) => (
            <span key={i} style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '12px',
              fontWeight: 600, background: '#ede9fe', color: '#7c3aed' }}>{tag}</span>
          ))}
        </div>
        <button
          onClick={() => setApplied(true)}
          style={{
            width: '100%', padding: '13px',
            background: applied
              ? 'linear-gradient(135deg, #16a34a, #15803d)'
              : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: 'white', border: 'none', borderRadius: '14px',
            fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            boxShadow: applied
              ? '0 4px 16px rgba(22,163,74,0.35)'
              : '0 4px 16px rgba(124,58,237,0.35)',
            transition: 'all 0.3s',
          }}>
          {applied ? '✓ Application submitted!' : 'Apply now →'}
        </button>
      </div>

      {/* About section */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px',
        border: '1px solid #e5e7eb', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginBottom: '12px' }}>
          About the role
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>{job.about}</p>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e1b4b', margin: '20px 0 10px' }}>
          Responsibilities
        </h4>
        <ul style={{ paddingLeft: '18px', color: '#6b7280', fontSize: '14px', lineHeight: 2 }}>
          {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e1b4b', margin: '20px 0 10px' }}>
          Requirements
        </h4>
        <ul style={{ paddingLeft: '18px', color: '#6b7280', fontSize: '14px', lineHeight: 2 }}>
          {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      {/* Company card */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '20px',
        border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e1b4b', marginBottom: '12px' }}>
          About {job.company}
        </h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Industry</p>
            <p style={{ fontSize: '14px', color: '#1e1b4b', fontWeight: 600, marginTop: '2px' }}>{job.industry}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Company size</p>
            <p style={{ fontSize: '14px', color: '#1e1b4b', fontWeight: 600, marginTop: '2px' }}>{job.companySize}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { background: #f9fafb; padding: 24px 16px; }
.back { background: none; border: none; color: #7c3aed; font-weight: 600; font-size: 13px; margin-bottom: 20px; display: block; }
.hero { background: white; border-radius: 20px; padding: 28px; border: 1px solid #e5e7eb; margin-bottom: 16px; }
.hero-top { display: flex; gap: 16px; margin-bottom: 16px; }
.logo { width: 60px; height: 60px; border-radius: 16px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 28px; }
h1 { font-size: 22px; font-weight: 800; color: #1e1b4b; }
.sub { font-size: 15px; color: #6b7280; margin-top: 4px; }
.chips { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.chip { padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 600; background: #ede9fe; color: #7c3aed; }
.btn { width: 100%; padding: 13px; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; border: none; border-radius: 14px; font-size: 15px; font-weight: 700; }
.section { background: white; border-radius: 16px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 12px; }
h3 { font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px; }
p.body { font-size: 14px; color: #6b7280; line-height: 1.7; }
ul { padding-left: 18px; color: #6b7280; font-size: 14px; line-height: 2; margin-top: 10px; }
</style></head><body>
<button class="back">← Back to listings</button>
<div class="hero">
  <div class="hero-top">
    <div class="logo">🤖</div>
    <div><h1>Frontend Developer</h1><p class="sub">Nxtagent AI · Hyderabad</p></div>
  </div>
  <div class="chips"><span class="chip">₹8-12 LPA</span><span class="chip">Full-time</span><span class="chip">EdTech / AI</span></div>
  <button class="btn">Apply now →</button>
</div>
<div class="section">
  <h3>About the role</h3>
  <p class="body">Nxtagent AI is building the next generation of AI-powered learning tools for engineering colleges across India.</p>
  <h3 style="margin-top:20px">Requirements</h3>
  <ul><li>React, JavaScript (ES6+), HTML/CSS</li><li>1+ year React experience</li><li>REST APIs and async/await</li></ul>
</div>
</body></html>`,
  },

  // ─── MILESTONE 5 ───────────────────────────────────────────────
  {
    id: 'dashboard-ui',
    milestoneId: 5,
    filename: 'Dashboard.jsx',
    title: 'Student Dashboard',
    description: 'Build a full dashboard with stats cards, a recent activity list, and a course progress section — all from mock data.',
    difficulty: 'Advanced',
    estimatedMinutes: 45,
    conceptTags: ['Component Composition', 'Props', 'Array.map()', 'Derived State', 'useReducer'],
    status: 'locked',
    hints: [
      'Create separate StatCard, ActivityItem, and CourseRow sub-components',
      'Pass all data down as props — no hardcoded values inside child components',
      'Compute derived values: e.g. total XP from activity list using .reduce()',
      'Use flexbox and grid for the layout',
      'Add a greeting header that changes based on time of day',
    ],
    checkerRules: [
      { id: 'has-stat-card', label: 'Has stats section', check: 'stat', required: true },
      { id: 'has-map', label: 'Uses .map() for lists', check: '.map(', required: true },
      { id: 'has-sub-components', label: 'Has sub-components', check: 'function ', required: true },
      { id: 'has-props-pass', label: 'Passes props to children', check: 'props', required: true },
      { id: 'has-grid', label: 'Uses grid or flex layout', check: 'grid', required: false },
      { id: 'has-greeting', label: 'Has greeting or header', check: 'morning', required: false },
    ],
    starterCode: `import { useState } from 'react';

const stats = [
  { label: 'Project built', value: '32%', color: '#7c3aed', bg: '#ede9fe' },
  { label: 'Concepts learned', value: '4', color: '#d97706', bg: '#fef3c7' },
  { label: 'XP earned', value: '2,340', color: '#16a34a', bg: '#dcfce7' },
  { label: 'Streak', value: '12 days', color: '#2563eb', bg: '#dbeafe' },
];

const activity = [
  { icon: '✅', text: 'Completed Milestone 2', time: '2 days ago', color: '#16a34a' },
  { icon: '📚', text: 'Mastered Foreign Keys', time: '2 days ago', color: '#7c3aed' },
  { icon: '🔥', text: '12-day streak!', time: 'Today', color: '#d97706' },
  { icon: '⭐', text: 'Earned 120 XP', time: '2 days ago', color: '#d97706' },
];

const courses = [
  { title: 'Hospital Management System', subject: 'DBMS', progress: 32, color: '#7c3aed' },
  { title: 'Job Board Web App', subject: 'React', progress: 0, color: '#0ea5e9' },
];

function StatCard({ label, value, color, bg }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '18px 20px',
      border: '1px solid #f3f4f6', flex: 1, minWidth: '140px' }}>
      <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '24px', fontWeight: 800, color, letterSpacing: '-0.5px' }}>{value}</p>
      <div style={{ height: '4px', background: '#f3f4f6', borderRadius: '99px', marginTop: '10px' }}>
        <div style={{ height: '100%', width: '40%', background: color, borderRadius: '99px' }} />
      </div>
    </div>
  );
}

function ActivityItem({ icon, text, time, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0',
      borderBottom: '1px solid #f9fafb' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
        background: color + '15', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e1b4b' }}>{text}</p>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{time}</p>
      </div>
    </div>
  );
}

function CourseRow({ title, subject, progress, color }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b' }}>{title}</p>
          <p style={{ fontSize: '11px', color: '#9ca3af' }}>{subject}</p>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 800, color }}>{progress}%</span>
      </div>
      <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: progress + '%', background: color,
          borderRadius: '99px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '24px 16px',
      fontFamily: 'Inter, system-ui, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e1b4b', letterSpacing: '-0.5px' }}>
          {greeting}, Arjun 👋
        </h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '4px' }}>
          You're on a 12-day streak. Keep building!
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Two column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Course progress */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px',
          border: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e1b4b', marginBottom: '16px' }}>
            Course progress
          </h3>
          {courses.map((c, i) => <CourseRow key={i} {...c} />)}
        </div>

        {/* Activity */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px',
          border: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e1b4b', marginBottom: '4px' }}>
            Recent activity
          </h3>
          {activity.map((a, i) => <ActivityItem key={i} {...a} />)}
        </div>
      </div>
    </div>
  );
}`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { background: #f9fafb; padding: 24px 16px; }
h1 { font-size: 22px; font-weight: 800; color: #1e1b4b; }
.sub { font-size: 14px; color: #9ca3af; margin-top: 4px; margin-bottom: 24px; }
.stats { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.stat { background: white; border-radius: 14px; padding: 16px 18px; flex: 1; min-width: 120px; border: 1px solid #f3f4f6; }
.stat-label { font-size: 10px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
.stat-val { font-size: 22px; font-weight: 800; }
.bar { height: 4px; background: #f3f4f6; border-radius: 99px; margin-top: 8px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 99px; width: 40%; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.card { background: white; border-radius: 14px; padding: 18px; border: 1px solid #f3f4f6; }
h3 { font-size: 13px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px; }
.course { margin-bottom: 14px; }
.course-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.course-title { font-size: 13px; font-weight: 700; color: #1e1b4b; }
.course-bar { height: 5px; background: #f3f4f6; border-radius: 99px; overflow: hidden; }
.course-fill { height: 100%; border-radius: 99px; }
.activity-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f9fafb; }
.activity-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.activity-text { font-size: 12px; font-weight: 600; color: #1e1b4b; }
.activity-time { font-size: 11px; color: #9ca3af; }
</style></head><body>
<h1>Good morning, Arjun 👋</h1>
<p class="sub">You're on a 12-day streak. Keep building!</p>
<div class="stats">
  <div class="stat"><p class="stat-label">Project built</p><p class="stat-val" style="color:#7c3aed">32%</p><div class="bar"><div class="bar-fill" style="background:#7c3aed;width:32%"></div></div></div>
  <div class="stat"><p class="stat-label">Concepts</p><p class="stat-val" style="color:#d97706">4</p><div class="bar"><div class="bar-fill" style="background:#d97706;width:22%"></div></div></div>
  <div class="stat"><p class="stat-label">XP earned</p><p class="stat-val" style="color:#16a34a">2,340</p><div class="bar"><div class="bar-fill" style="background:#16a34a;width:58%"></div></div></div>
  <div class="stat"><p class="stat-label">Streak</p><p class="stat-val" style="color:#2563eb">12d</p><div class="bar"><div class="bar-fill" style="background:#2563eb;width:60%"></div></div></div>
</div>
<div class="grid">
  <div class="card">
    <h3>Course progress</h3>
    <div class="course"><div class="course-header"><span class="course-title">Hospital Mgmt System</span><span style="color:#7c3aed;font-weight:800;font-size:14px">32%</span></div><div class="course-bar"><div class="course-fill" style="width:32%;background:#7c3aed"></div></div></div>
    <div class="course"><div class="course-header"><span class="course-title">Job Board Web App</span><span style="color:#0ea5e9;font-weight:800;font-size:14px">0%</span></div><div class="course-bar"><div class="course-fill" style="width:0%;background:#0ea5e9"></div></div></div>
  </div>
  <div class="card">
    <h3>Recent activity</h3>
    <div class="activity-item"><div class="activity-icon" style="background:#dcfce7">✅</div><div><p class="activity-text">Completed Milestone 2</p><p class="activity-time">2 days ago</p></div></div>
    <div class="activity-item"><div class="activity-icon" style="background:#ede9fe">📚</div><div><p class="activity-text">Mastered Foreign Keys</p><p class="activity-time">2 days ago</p></div></div>
    <div class="activity-item"><div class="activity-icon" style="background:#fef3c7">🔥</div><div><p class="activity-text">12-day streak!</p><p class="activity-time">Today</p></div></div>
    <div class="activity-item"><div class="activity-icon" style="background:#fef3c7">⭐</div><div><p class="activity-text">Earned 120 XP</p><p class="activity-time">2 days ago</p></div></div>
  </div>
</div>
</body></html>`,
  },
];

export const cssComponents: CssComponent[] = [
  {
    id: 'glassmorphism-card',
    filename: 'glass-card.css',
    title: 'Glass Card',
    description: 'Pure CSS glassmorphism card with backdrop blur',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    conceptTags: ['backdrop-filter', 'rgba()', 'box-shadow', 'border-radius'],
    status: 'active',
    starterCode: `/* Glass Card — Pure CSS */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.30);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Try changing the blur value and background opacity */`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head><style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #e0e7ff, #fdf4ff); }
.card { background: rgba(255,255,255,0.55); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.80); border-radius: 24px; padding: 36px;
  width: 320px; box-shadow: 0 8px 32px rgba(124,58,237,0.10); }
h2 { font-size: 20px; font-weight: 800; color: #1e1b4b; margin-bottom: 8px; }
p { font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
button { padding: 10px 24px; background: #7c3aed; color: white; border: none;
  border-radius: 10px; font-weight: 700; cursor: pointer; }
</style></head><body>
<div class="card">
  <h2>Glass card</h2>
  <p>This card uses backdrop-filter: blur() to create a frosted glass effect over any background.</p>
  <button>Get started</button>
</div></body></html>`,
  },
  {
    id: 'animated-button',
    filename: 'buttons.css',
    title: 'Animated Button Set',
    description: 'CSS-only button styles with hover and active animations',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    conceptTags: ['transitions', 'transform', 'pseudo-elements', ':hover', ':active'],
    status: 'active',
    starterCode: `/* Animated buttons — CSS only */
.btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: white;
  box-shadow: 0 4px 16px rgba(124,58,237,0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124,58,237,0.5);
}

.btn-primary:active {
  transform: scale(0.97);
}

/* Add .btn-secondary and .btn-ghost styles below */`,
    solutionPreviewHTML: `<!DOCTYPE html><html><head><style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; }
body { min-height: 100vh; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 16px; background: #f9fafb; }
.btn { padding: 12px 28px; border-radius: 12px; font-weight: 700; font-size: 14px;
  cursor: pointer; border: none; transition: transform 0.15s, box-shadow 0.15s; }
.btn-primary { background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white;
  box-shadow: 0 4px 16px rgba(124,58,237,0.4); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.5); }
.btn-secondary { background: white; color: #1e1b4b; border: 1.5px solid #e5e7eb; }
.btn-secondary:hover { background: #f9fafb; transform: translateY(-1px); }
.btn-ghost { background: transparent; color: #7c3aed; border: 1.5px solid #7c3aed; }
.btn-ghost:hover { background: #ede9fe; }
</style></head><body>
<button class="btn btn-primary">Primary button</button>
<button class="btn btn-secondary">Secondary button</button>
<button class="btn btn-ghost">Ghost button</button>
</body></html>`,
  },
];

export const challengeComponents: ChallengeComponent[] = [
  {
    id: 'dark-mode-toggle',
    filename: 'DarkModeToggle.jsx',
    title: 'Dark Mode Toggle',
    description: 'Build a dark/light mode toggle that switches the entire page theme.',
    difficulty: 'Advanced',
    timeLimit: 20,
    xpReward: 150,
    conceptTags: ['useState', 'CSS variables', 'className toggle', 'useEffect'],
    status: 'active',
    starterCode: `import { useState, useEffect } from 'react';

// Challenge: Build a dark/light toggle
// The toggle should switch the background, text, and card colors
// Tip: Add/remove a 'dark' class on the body element

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark ? '#0f172a' : '#f9fafb';
    document.body.style.color = dark ? '#f1f5f9' : '#1e1b4b';
  }, [dark]);

  return (
    <div style={{ padding: '24px' }}>
      {/* Build your toggle here */}
      <button onClick={() => setDark(!dark)}>
        {dark ? '☀️ Light mode' : '🌙 Dark mode'}
      </button>
    </div>
  );
}`,
    checkerRules: [
      { id: 'uses-state', label: 'Uses useState', check: 'useState', required: true },
      { id: 'uses-effect', label: 'Uses useEffect', check: 'useEffect', required: true },
      { id: 'toggles-theme', label: 'Toggles a dark theme state', check: 'dark', required: true },
      { id: 'click-handler', label: 'Has a click handler', check: 'onClick', required: true },
    ],
    hints: [
      'Store the theme in useState — a boolean is enough',
      'Use useEffect to apply the theme to document.body when it changes',
      'Make the button label swap between ☀️ and 🌙 with conditional rendering',
    ],
  },
  {
    id: 'countdown-timer',
    filename: 'CountdownTimer.jsx',
    title: 'Countdown Timer',
    description: 'Build a working countdown timer with start, pause, and reset.',
    difficulty: 'Intermediate',
    timeLimit: 25,
    xpReward: 120,
    conceptTags: ['useState', 'useEffect', 'setInterval', 'clearInterval'],
    status: 'active',
    starterCode: `import { useState, useEffect } from 'react';

// Challenge: Build a countdown timer
// Must have: start, pause, reset buttons
// Bonus: add an alarm/alert when it reaches 0

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);

  // Your useEffect for the interval goes here

  return (
    <div style={{ textAlign: 'center', padding: '48px 24px',
      fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ fontSize: '72px', fontWeight: 800, color: '#1e1b4b',
        fontVariantNumeric: 'tabular-nums' }}>
        {String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}
      </p>
      {/* Add your buttons here */}
    </div>
  );
}`,
    checkerRules: [
      { id: 'uses-state', label: 'Uses useState', check: 'useState', required: true },
      { id: 'uses-effect', label: 'Uses useEffect', check: 'useEffect', required: true },
      { id: 'uses-interval', label: 'Uses setInterval', check: 'setInterval', required: true },
      { id: 'cleans-interval', label: 'Cleans up with clearInterval', check: 'clearInterval', required: true },
      { id: 'has-buttons', label: 'Has control buttons', check: 'onClick', required: true },
    ],
    hints: [
      'Run setInterval inside a useEffect that depends on the "running" state',
      'Always return clearInterval from the effect to avoid memory leaks',
      'Disable the start button while running, or toggle between start/pause',
    ],
  },
];
