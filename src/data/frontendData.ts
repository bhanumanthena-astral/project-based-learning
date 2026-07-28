export interface FrontendCheckItem {
  id: string;
  description: string;
  regexOrKeyword: string;
}

export interface FrontendConceptItem {
  id: string;
  name: string;
  category: string;
  explanation: string;
  codeExample: string;
  projectApplication: string;
}

export interface FrontendComponentModule {
  id: string;
  name: string;
  filename: string;
  category: 'Authentication' | 'Data Display' | 'Navigation' | 'Forms & Inputs' | 'Modals & Overlays';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  description: string;
  status: 'completed' | 'active' | 'available' | 'locked';
  concepts: FrontendConceptItem[];
  requirements: string[];
  checkItems: FrontendCheckItem[];
  starterCode: string;
  solutionCode: string;
  previewType: 'auth' | 'card' | 'search' | 'detail' | 'nav' | 'modal';
}

export const frontendModules: FrontendComponentModule[] = [
  {
    id: 'login-page',
    name: 'Login Page Component',
    filename: 'LoginPage.jsx',
    category: 'Authentication',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    description: 'Build a production-ready sign-in card with controlled email/password inputs, validation triggers, and glassmorphism styling.',
    status: 'active',
    concepts: [
      {
        id: 'jsx-basics',
        name: 'JSX & Component Structure',
        category: 'React Basics',
        explanation: 'JSX allows writing HTML-like syntax directly within JavaScript. Every React component returns a single root JSX tree.',
        codeExample: `export default function LoginPage() {\n  return (\n    <div className="login-card">\n      <h2>Sign in</h2>\n    </div>\n  );\n}`,
        projectApplication: 'Structure the login container, form layout, and submit controls for student auth.',
      },
      {
        id: 'use-state-forms',
        name: 'useState for Controlled Inputs',
        category: 'React Hooks',
        explanation: 'Controlled inputs store their form value inside React component state (`useState`), updating via `onChange` events.',
        codeExample: `const [email, setEmail] = useState('');\n<input \n  type="email" \n  value={email} \n  onChange={e => setEmail(e.target.value)} \n/>`,
        projectApplication: 'Capture user email and password inputs safely in memory prior to submission.',
      },
      {
        id: 'form-onsubmit',
        name: 'Form Event Handling (onSubmit)',
        category: 'Event Handling',
        explanation: 'Wrap input fields in a `<form>` element and handle the `onSubmit` event, using `e.preventDefault()` to stop browser page reloads.',
        codeExample: `const handleSubmit = (e) => {\n  e.preventDefault();\n  console.log('Logging in:', email);\n};`,
        projectApplication: 'Triggers authentication API verification without reloading the browser window.',
      },
    ],
    requirements: [
      'Include a controlled <input type="email"> element bound to email state',
      'Include a controlled <input type="password"> element bound to password state',
      'Wrap fields inside a <form onSubmit={...}> tag with e.preventDefault()',
      'Provide a <button type="submit"> Sign in button',
    ],
    checkItems: [
      { id: 'c1', description: 'Has <input type="email"> or type=\'email\' element', regexOrKeyword: 'type="email"|type=\'email\'' },
      { id: 'c2', description: 'Has <input type="password"> or type=\'password\' element', regexOrKeyword: 'type="password"|type=\'password\'' },
      { id: 'c3', description: 'Wrapped in a <form> tag with onSubmit handler', regexOrKeyword: '<form|onSubmit=' },
      { id: 'c4', description: 'Has <button type="submit"> or submit action', regexOrKeyword: 'type="submit"|type=\'submit\'' },
    ],
    starterCode: `import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Welcome ' + email + '! Authentication token generated.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #fdf4ff 100%)',
      padding: '1.5rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '360px',
        boxShadow: '0 20px 40px rgba(124, 58, 237, 0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#7c3aed',
            background: 'rgba(124,58,237,0.1)',
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            STUDENT PORTAL
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e1b4b', marginTop: '10px', marginBottom: '4px' }}>
            Sign in
          </h2>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>
            Enter your credentials to continue building
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="student@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '12px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.9)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '12px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.9)',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
            }}
          >
            Sign in to Workspace →
          </button>
        </form>
      </div>
    </div>
  );
}`,
    solutionCode: `import { useState } from 'react';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert(email); }}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign in →</button>
    </form>
  );
}`,
    previewType: 'auth',
  },
  {
    id: 'job-card',
    name: 'Job Card Component',
    filename: 'JobCard.jsx',
    category: 'Data Display',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Design a responsive job listing card featuring company logos, salary ranges, location tags, and interactive bookmarking.',
    status: 'available',
    concepts: [
      {
        id: 'props-destructuring',
        name: 'React Props & Destructuring',
        category: 'React Component API',
        explanation: 'Props pass data into components from parents. Destructuring props (`({ job, onApply })`) keeps code clean and readable.',
        codeExample: `export function JobCard({ title, company, salary }) {\n  return <h3>{title} at {company}</h3>;\n}`,
        projectApplication: 'Render dynamic job data flexibly across job search results lists.',
      },
      {
        id: 'conditional-classes',
        name: 'Conditional Badge Rendering',
        category: 'JSX Logic',
        explanation: 'Use ternary operators or logical AND (`&&`) to conditionally render urgency badges (e.g., "Urgent Hiring" or "Remote").',
        codeExample: `{isRemote && <span className="remote-badge">Remote</span>}`,
        projectApplication: 'Highlight featured or high-paying job opportunities automatically.',
      },
    ],
    requirements: [
      'Accept job title, company name, and location props',
      'Render salary budget range chip (e.g. $120k - $150k)',
      'Include interactive "Apply Now" button callback trigger',
      'Display list of technology skill pills (e.g., React, TypeScript)',
    ],
    checkItems: [
      { id: 'jc1', description: 'Accepts props or job object', regexOrKeyword: 'props|job|title' },
      { id: 'jc2', description: 'Displays company name and title', regexOrKeyword: 'company|title' },
      { id: 'jc3', description: 'Has salary or location display element', regexOrKeyword: 'salary|location|\$' },
      { id: 'jc4', description: 'Includes Apply or Save action button', regexOrKeyword: 'Apply|button|onClick' },
    ],
    starterCode: `import { useState } from 'react';

export default function JobCard({ 
  title = "Senior Frontend Engineer", 
  company = "Stripe", 
  location = "San Francisco, CA (Hybrid)", 
  salary = "$140,000 - $180,000",
  tags = ["React", "TypeScript", "Tailwind"],
  isFeatured = true
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{
      background: 'white',
      border: isFeatured ? '2px solid #7c3aed' : '1px solid #e5e7eb',
      borderRadius: '20px',
      padding: '1.5rem',
      maxWidth: '420px',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      {isFeatured && (
        <span style={{
          position: 'absolute',
          top: '-12px',
          right: '20px',
          background: '#7c3aed',
          color: 'white',
          fontSize: '10px',
          fontWeight: 800,
          padding: '2px 10px',
          borderRadius: '10px',
          letterSpacing: '0.5px'
        }}>
          FEATURED JOB
        </span>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280' }}>{company}</span>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', margin: '4px 0' }}>{title}</h3>
          <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>📍 {location}</p>
        </div>
        
        <button
          onClick={() => setSaved(!saved)}
          style={{
            background: saved ? '#fef3c7' : '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <div style={{ margin: '1rem 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: '11px',
            fontWeight: 700,
            background: '#f3e8ff',
            color: '#6b21a8',
            padding: '4px 10px',
            borderRadius: '8px'
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
        <span style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>{salary}</span>
        <button style={{
          background: '#7c3aed',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer'
        }}>
          Apply Now →
        </button>
      </div>
    </div>
  );
}`,
    solutionCode: `export default function JobCard({ title, company, salary }) {
  return <div><h3>{title}</h3><p>{company}</p><span>{salary}</span><button>Apply Now</button></div>;
}`,
    previewType: 'card',
  },
  {
    id: 'search-bar',
    name: 'Job Search & Filter Bar',
    filename: 'SearchBar.jsx',
    category: 'Forms & Inputs',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    description: 'Construct a multi-criteria filter header with live keyword search, job-type selects, and clear filters action.',
    status: 'available',
    concepts: [
      {
        id: 'multiple-state-hooks',
        name: 'Managing Multiple State Hooks',
        category: 'React State',
        explanation: 'Store distinct state values for search query, job type selection, and remote toggle filters.',
        codeExample: `const [query, setQuery] = useState('');\nconst [jobType, setJobType] = useState('All');`,
        projectApplication: 'Allow students to combine keyword and category filters seamlessly.',
      },
      {
        id: 'select-dropdowns',
        name: 'Controlled <select> Dropdowns',
        category: 'Forms',
        explanation: 'Bind `<select value={jobType} onChange={e => setJobType(e.target.value)}>` for categorical selection.',
        codeExample: `<select value={category} onChange={e => setCategory(e.target.value)}>\n  <option value="all">All Categories</option>\n</select>`,
        projectApplication: 'Filter candidates by full-time, part-time, or contract employment.',
      },
    ],
    requirements: [
      'Controlled text input for search keywords',
      '<select> dropdown element for employment type filter',
      'Clear Filters button resetting state back to defaults',
      'Visual count metric showing active filter criteria',
    ],
    checkItems: [
      { id: 'sb1', description: 'Controlled search text input element', regexOrKeyword: 'type="text"|placeholder|value' },
      { id: 'sb2', description: 'Controlled <select> dropdown for category/type', regexOrKeyword: '<select|option' },
      { id: 'sb3', description: 'Clear filters or reset state button', regexOrKeyword: 'Clear|Reset|onClick' },
      { id: 'sb4', description: 'Uses useState for search query', regexOrKeyword: 'useState' },
    ],
    starterCode: `import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
    setCategory('All');
    setIsRemoteOnly(false);
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '1.25rem',
      maxWidth: '600px',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="🔍 Search title, skills, or company..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 200px',
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            fontSize: '13px',
            outline: 'none'
          }}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            fontSize: '13px',
            background: 'white',
            outline: 'none',
            fontWeight: 600
          }}
        >
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', fontSize: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#4b5563', fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={isRemoteOnly}
            onChange={e => setIsRemoteOnly(e.target.checked)}
          />
          Remote Jobs Only
        </label>

        <button
          onClick={handleClear}
          style={{
            background: 'none',
            border: 'none',
            color: '#7c3aed',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}`,
    solutionCode: `export default function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search" />
      <select><option>All</option></select>
      <button>Clear</button>
    </div>
  );
}`,
    previewType: 'search',
  },
  {
    id: 'apply-modal',
    name: 'Job Application Modal',
    filename: 'ApplyModal.jsx',
    category: 'Modals & Overlays',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    description: 'Build an application submission dialog with backdrop blur, cover letter input, resume attachment field, and submission state.',
    status: 'available',
    concepts: [
      {
        id: 'conditional-rendering',
        name: 'Modal Open/Close Conditional Rendering',
        category: 'React Component Patterns',
        explanation: 'Render modal dialogs conditionally based on boolean state (`isOpen && <Modal />`).',
        codeExample: `{isOpen && (\n  <div className="modal-backdrop">\n    <div className="modal-content">...</div>\n  </div>\n)}`,
        projectApplication: 'Open submission dialogs smoothly when students click "Apply Now".',
      },
      {
        id: 'textarea-controls',
        name: 'Textarea & File Input Elements',
        category: 'Forms',
        explanation: 'Use `<textarea>` for long text input like cover letters and handle file inputs safely.',
        codeExample: `<textarea value={notes} onChange={e => setNotes(e.target.value)} />`,
        projectApplication: 'Allow applicants to craft pitch messages and attach resume files.',
      },
    ],
    requirements: [
      'Include applicant full name and email inputs',
      'Provide a <textarea> element for cover letter notes',
      'Close button (X) triggering onClose modal callback',
      'Submit button that presents success confirmation message',
    ],
    checkItems: [
      { id: 'am1', description: 'Includes applicant name and email fields', regexOrKeyword: 'email|name' },
      { id: 'am2', description: 'Includes <textarea> for cover letter', regexOrKeyword: '<textarea|cover|note' },
      { id: 'am3', description: 'Close button or backdrop handler', regexOrKeyword: 'Close|X|onClose|onClick' },
      { id: 'am4', description: 'Submit application action button', regexOrKeyword: 'Submit|Apply|button' },
    ],
    starterCode: `import { useState } from 'react';

export default function ApplyModal({ jobTitle = "Senior Frontend Engineer", onClose = () => {} }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>
              APPLYING FOR
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b', margin: '4px 0 1.25rem 0' }}>
              {jobTitle}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Cover Note / Pitch
              </label>
              <textarea
                placeholder="Briefly share why you are a great fit..."
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Submit Application →
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b' }}>Application Submitted!</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '8px 0 20px 0' }}>
              Your application has been received. Good luck!
            </p>
            <button
              onClick={onClose}
              style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`,
    solutionCode: `export default function ApplyModal() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Cover note" />
      <button type="submit">Submit Application</button>
    </form>
  );
}`,
    previewType: 'modal',
  },
  {
    id: 'navbar-header',
    name: 'Navbar Header & Profile Badge',
    filename: 'Navbar.jsx',
    category: 'Navigation',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    description: 'Construct a sticky glass top navigation bar with brand identity, nav tab links, and student profile badge.',
    status: 'available',
    concepts: [
      {
        id: 'flex-layout',
        name: 'Flexbox Layout in React',
        category: 'CSS in React',
        explanation: 'Use `display: flex`, `justifyContent: space-between`, and `alignItems: center` for clean alignment.',
        codeExample: `<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>`,
        projectApplication: 'Keep brand logo, search link, and student profile aligned across viewports.',
      },
    ],
    requirements: [
      'Include brand title and logo badge',
      'Provide navigation links (e.g., Jobs, Saved, Applications)',
      'Include user avatar badge chip with streak indicator',
      'Sticky glassmorphism container styling',
    ],
    checkItems: [
      { id: 'nb1', description: 'Includes Brand Logo or App Name', regexOrKeyword: 'BuildFirst|Logo|brand|h1' },
      { id: 'nb2', description: 'Includes navigation link items', regexOrKeyword: 'Jobs|Applications|Saved|nav|a' },
      { id: 'nb3', description: 'Includes user profile or avatar element', regexOrKeyword: 'Avatar|User|Profile|streak' },
      { id: 'nb4', description: 'Flexbox layout header wrapper', regexOrKeyword: 'display|flex|justifyContent|header' },
    ],
    starterCode: `import { useState } from 'react';

export default function Navbar({ activeTab = 'jobs', onSelectTab = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      height: '64px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.9)',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: '#7c3aed',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          ⚡
        </div>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', tracking: '-0.5px' }}>
          JobBoard<span style={{ color: '#7c3aed' }}>CS</span>
        </span>
      </div>

      <nav style={{ display: 'flex', gap: '8px' }}>
        {['jobs', 'applications', 'saved'].map(tab => (
          <button
            key={tab}
            onClick={() => onSelectTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === tab ? '#7c3aed' : 'transparent',
              color: activeTab === tab ? 'white' : '#4b5563',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'capitalize',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          background: '#fef3c7',
          color: '#b45309',
          padding: '4px 10px',
          borderRadius: '20px'
        }}>
          🔥 12 Days
        </span>

        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#e0e7ff',
          color: '#4338ca',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #a5b4fc'
        }}>
          AK
        </div>
      </div>
    </header>
  );
}`,
    solutionCode: `export default function Navbar() {
  return (
    <header>
      <h1>JobBoardCS</h1>
      <nav><a>Jobs</a><a>Applications</a></nav>
    </header>
  );
}`,
    previewType: 'nav',
  },
];
