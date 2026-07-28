export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  year: string;
  joinedAt: string;
  xp: number;
  streak: number;
  completedProjects: number;
  enrolledCourses: string[];
}

export interface CourseMilestone {
  id: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  completedAt?: string;
  concepts: string[];
  tableBuilt?: string;
}

export interface CourseTable {
  name: string;
  status: 'built' | 'active' | 'locked';
  columns: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  subject: string;
  category: 'Backend' | 'Frontend' | 'Core CS';
  color: string;
  accentColor?: string;
  icon: string;
  totalMilestones: number;
  completedMilestones: number;
  progressPercent: number;
  status: 'active' | 'enrolled' | 'not-started';
  estimatedHours: number;
  concepts: number;
  lastAccessed: string | null;
  milestones: CourseMilestone[];
  tables: CourseTable[];
}

export interface ConceptItem {
  id: string;
  name: string;
  category: string;
  mastered: boolean;
  courseId: string;
  explanation: string;
  miniExample: string;
  projectApplication: string;
}

export interface ActivityItem {
  id: number;
  type: string;
  text: string;
  time: string;
  icon: string;
  color: string;
}

export const currentUser: UserProfile = {
  id: 'user-001',
  name: 'Arjun Kumar',
  email: 'arjun.kumar@srmap.edu.in',
  avatar: 'AK',
  college: 'SRM University-AP',
  branch: 'Computer Science Engineering',
  year: '3rd Year',
  joinedAt: '2024-08-15',
  xp: 2340,
  streak: 12,
  completedProjects: 1,
  enrolledCourses: ['dbms-001', 'react-001'],
};

export const courses: CourseItem[] = [
  {
    id: 'dbms-001',
    title: 'Hospital Management System',
    subject: 'Database Management Systems',
    category: 'Backend',
    color: '#6C63FF',
    accentColor: '#7c3aed',
    icon: 'Database',
    totalMilestones: 6,
    completedMilestones: 2,
    progressPercent: 32,
    status: 'active',
    estimatedHours: 40,
    concepts: 18,
    lastAccessed: '2025-07-27',
    milestones: [
      { id: 1, title: 'Design the patient schema', status: 'completed', completedAt: '2025-07-20', concepts: ['Primary Key', 'Data Types', 'NOT NULL'], tableBuilt: 'patients' },
      { id: 2, title: 'Build relationships between entities', status: 'completed', completedAt: '2025-07-25', concepts: ['Foreign Keys', 'Referential Integrity', 'ON DELETE CASCADE'], tableBuilt: 'appointments' },
      { id: 3, title: 'Normalize your data', status: 'active', concepts: ['1NF', '2NF', '3NF', 'Functional Dependency'] },
      { id: 4, title: 'Query the database', status: 'locked', concepts: ['SELECT', 'JOIN', 'GROUP BY', 'HAVING'] },
      { id: 5, title: 'Optimize performance', status: 'locked', concepts: ['Indexes', 'EXPLAIN', 'Query plans'] },
      { id: 6, title: 'Transactions and integrity', status: 'locked', concepts: ['ACID', 'BEGIN', 'COMMIT', 'ROLLBACK'] },
    ],
    tables: [
      { name: 'patients', status: 'built', columns: ['id INT PK', 'name VARCHAR(100)', 'dob DATE', 'contact VARCHAR(15)', 'blood_group CHAR(3)'] },
      { name: 'doctors', status: 'built', columns: ['id INT PK', 'name VARCHAR(100)', 'specialization VARCHAR(50)', 'phone VARCHAR(15)', 'dept_id INT FK'] },
      { name: 'appointments', status: 'built', columns: ['id INT PK', 'patient_id INT FK', 'doctor_id INT FK', 'appt_date DATETIME', 'status ENUM'] },
      { name: 'departments', status: 'active', columns: ['id INT PK', 'name VARCHAR(80)', 'head_doctor_id INT FK'] },
      { name: 'prescriptions', status: 'locked', columns: [] },
      { name: 'billing', status: 'locked', columns: [] },
    ],
  },
  {
    id: 'react-001',
    title: 'Job Board Web App',
    subject: 'React & Frontend Development',
    category: 'Frontend',
    color: '#06B6D4',
    accentColor: '#0284c7',
    icon: 'Code2',
    totalMilestones: 5,
    completedMilestones: 0,
    progressPercent: 0,
    status: 'enrolled',
    estimatedHours: 30,
    concepts: 14,
    lastAccessed: null,
    milestones: [
      { id: 1, title: 'Build the Login page component', status: 'active', concepts: ['JSX', 'useState', 'Forms', 'Controlled Inputs'] },
      { id: 2, title: 'Create the Jobs listing page', status: 'locked', concepts: ['Props', 'map()', 'Conditional rendering'] },
      { id: 3, title: 'Add search and filter', status: 'locked', concepts: ['useEffect', 'API fetch', 'Loading states'] },
      { id: 4, title: 'Build the Job detail page', status: 'locked', concepts: ['React Router', 'useParams', 'Dynamic routes'] },
      { id: 5, title: 'Deploy and polish', status: 'locked', concepts: ['Vercel deploy', 'env vars', 'Error boundaries'] },
    ],
    tables: [],
  },
];

export const concepts: ConceptItem[] = [
  { id: 'primary-key', name: 'Primary Key', category: 'Database Fundamentals', mastered: true, courseId: 'dbms-001', explanation: 'A primary key uniquely identifies each row in a table. No two rows can share the same value, and it cannot be null.', miniExample: 'CREATE TABLE students (\n  id INT PRIMARY KEY,\n  name VARCHAR(100)\n);', projectApplication: 'Used in patients(id) and doctors(id) — unique identifier for each record.' },
  { id: 'data-types', name: 'Data Types', category: 'Database Fundamentals', mastered: true, courseId: 'dbms-001', explanation: 'SQL data types define what kind of value a column can hold.', miniExample: 'CREATE TABLE ex (\n  age INT,\n  name VARCHAR(50),\n  joined DATE\n);', projectApplication: 'Defining column types for patients and doctors tables.' },
  { id: 'foreign-key', name: 'Foreign Keys', category: 'Relationships', mastered: true, courseId: 'dbms-001', explanation: 'A foreign key is a column that references the primary key of another table.', miniExample: 'FOREIGN KEY (patient_id)\n  REFERENCES patients(id)', projectApplication: 'appointments.patient_id → patients(id)' },
  { id: 'referential-integrity', name: 'Referential Integrity', category: 'Relationships', mastered: true, courseId: 'dbms-001', explanation: 'Ensures a foreign key always points to an existing primary key.', miniExample: 'ON DELETE CASCADE', projectApplication: 'Prevents orphaned appointments.' },
  { id: '1nf', name: '1NF', category: 'Normalization', mastered: false, courseId: 'dbms-001', explanation: 'First Normal Form: every column holds atomic (indivisible) values.', miniExample: 'CREATE TABLE departments (\n  id INT PRIMARY KEY,\n  dept_name VARCHAR(50)\n);', projectApplication: 'Organizing hospital departments into individual atomic rows.' },
  { id: 'jsx', name: 'JSX', category: 'React Basics', mastered: false, courseId: 'react-001', explanation: 'JSX is a syntax extension that lets you write HTML-like code inside JavaScript.', miniExample: 'const element = <h1>Hello, World!</h1>;', projectApplication: 'Every component in your Job Board is written in JSX.' },
];

export const activityFeed: ActivityItem[] = [
  { id: 1, type: 'milestone_complete', text: 'Completed Milestone 2 in DBMS', time: '2 days ago', icon: 'CheckCircle2', color: 'green' },
  { id: 2, type: 'concept_learned', text: 'Learned Foreign Keys', time: '2 days ago', icon: 'BookOpen', color: 'accent' },
  { id: 3, type: 'streak', text: '12-day learning streak', time: 'Today', icon: 'Flame', color: 'amber' },
  { id: 4, type: 'xp', text: 'Earned 120 XP for completing Milestone 2', time: '2 days ago', icon: 'Star', color: 'amber' },
];

export const achievements = [
  { id: 'ach-1', title: 'First Schema', description: 'Created your first database table', unlocked: true, icon: 'Database', category: 'Database' },
  { id: 'ach-2', title: 'Relationship Builder', description: 'Linked two tables using foreign keys', unlocked: true, icon: 'Link', category: 'Database' },
  { id: 'ach-3', title: '12-Day Streak', description: 'Logged in and coded 12 days in a row', unlocked: true, icon: 'Flame', category: 'Streak' },
  { id: 'ach-4', title: 'Normalizer', description: 'Converted messy data into 3NF', unlocked: false, icon: 'Layers', category: 'Database' },
  { id: 'ach-5', title: 'Query Master', description: 'Wrote a complex 4-table JOIN query', unlocked: false, icon: 'Code', category: 'SQL' },
  { id: 'ach-6', title: 'Speed Demon', description: 'Completed 3 steps in under 15 minutes', unlocked: false, icon: 'Zap', category: 'Speed' },
  { id: 'ach-7', title: 'React Pioneer', description: 'Completed your first React component', unlocked: false, icon: 'Code2', category: 'React' },
  { id: 'ach-8', title: 'ACID Test', description: 'Executed an atomic transaction block', unlocked: false, icon: 'ShieldCheck', category: 'Database' },
  { id: 'ach-9', title: 'Index Architect', description: 'Optimized search queries with B-Tree indexes', unlocked: false, icon: 'TrendingUp', category: 'Database' },
  { id: 'ach-10', title: 'Component Craftsman', description: 'Built a multi-tab interactive playground', unlocked: false, icon: 'Layout', category: 'React' },
  { id: 'ach-11', title: 'Top Scholar', description: 'Reached 2,000 total XP', unlocked: true, icon: 'Trophy', category: 'XP' },
  { id: 'ach-12', title: 'Database Graduate', description: 'Completed all 6 DBMS milestones', unlocked: false, icon: 'Award', category: 'Database' },
];
