import { Course, TableSchema } from '../types';

export const initialTables: TableSchema[] = [
  {
    id: 'patients',
    name: 'patients',
    description: 'Stores core patient demographic data and contact information.',
    status: 'built',
    unlockedAtMilestone: 1,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Unique identifier for each patient' },
      { name: 'full_name', type: 'VARCHAR(100)', description: 'Patient full legal name' },
      { name: 'dob', type: 'DATE', description: 'Date of birth' },
      { name: 'phone', type: 'VARCHAR(20)', description: 'Primary emergency contact number' },
      { name: 'blood_type', type: 'VARCHAR(5)', description: 'Blood group classification (A+, O-, etc.)' },
    ],
  },
  {
    id: 'doctors',
    name: 'doctors',
    description: 'Maintains attending physicians, licenses, and specialties.',
    status: 'built',
    unlockedAtMilestone: 1,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Unique physician identifier' },
      { name: 'full_name', type: 'VARCHAR(100)', description: 'Doctor name and title' },
      { name: 'specialization', type: 'VARCHAR(100)', description: 'Medical domain (Cardiology, Neurology, etc.)' },
      { name: 'license_number', type: 'VARCHAR(50)', description: 'Medical board license' },
    ],
  },
  {
    id: 'appointments',
    name: 'appointments',
    description: 'Connects patients with doctors for scheduled consultations.',
    status: 'active',
    unlockedAtMilestone: 2,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Appointment ticket ID' },
      { name: 'patient_id', type: 'INT', isForeignKey: true, references: 'patients(id)', description: 'Patient receiving care' },
      { name: 'doctor_id', type: 'INT', isForeignKey: true, references: 'doctors(id)', description: 'Physician assigned' },
      { name: 'appointment_date', type: 'DATETIME', description: 'Scheduled date and time' },
      { name: 'status', type: 'VARCHAR(20)', description: 'Status: SCHEDULED, COMPLETED, CANCELLED' },
    ],
  },
  {
    id: 'departments',
    name: 'departments',
    description: 'Organizes hospital wards, ICUs, and specialized units.',
    status: 'locked',
    unlockedAtMilestone: 3,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Department code' },
      { name: 'name', type: 'VARCHAR(100)', description: 'Department name' },
      { name: 'floor_location', type: 'VARCHAR(20)', description: 'Hospital wing / floor' },
      { name: 'head_doctor_id', type: 'INT', isForeignKey: true, references: 'doctors(id)', description: 'Department head' },
    ],
  },
  {
    id: 'prescriptions',
    name: 'prescriptions',
    description: 'Tracks medical orders, medication dosages, and pharmacy logs.',
    status: 'locked',
    unlockedAtMilestone: 4,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Rx order ID' },
      { name: 'appointment_id', type: 'INT', isForeignKey: true, references: 'appointments(id)', description: 'Consultation record' },
      { name: 'medication_name', type: 'VARCHAR(100)', description: 'Prescribed drug' },
      { name: 'dosage', type: 'VARCHAR(50)', description: 'Daily dosage and frequency' },
      { name: 'refills_allowed', type: 'INT', description: 'Approved refill count' },
    ],
  },
  {
    id: 'billing',
    name: 'billing',
    description: 'Manages insurance claims, itemized invoices, and payment statuses.',
    status: 'locked',
    unlockedAtMilestone: 5,
    columns: [
      { name: 'id', type: 'INT', isPrimaryKey: true, description: 'Invoice number' },
      { name: 'patient_id', type: 'INT', isForeignKey: true, references: 'patients(id)', description: 'Billed patient' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Total charge in USD' },
      { name: 'payment_status', type: 'VARCHAR(20)', description: 'PENDING, PAID, INSUR_CLAIM' },
      { name: 'created_at', type: 'DATE', description: 'Billing issuance date' },
    ],
  },
];

export const courseData: Course = {
  id: 'dbms-001',
  title: 'Hospital Management System',
  subject: 'Database Management Systems',
  estimatedHours: 40,
  totalMilestones: 6,
  totalTables: 6,
  description: 'Build a production-grade relational database for a modern hospital network from scratch.',
  initialTables,
  milestones: [
    {
      id: 1,
      title: 'Design the core patient & doctor schemas',
      status: 'completed',
      summary: 'You established the core entities (Patients and Doctors) with appropriate primary keys and data types.',
      unlockedConcepts: ['primary-key', 'data-types'],
      steps: [
        {
          id: '1-1',
          stepNumber: 1,
          totalStepsInMilestone: 2,
          taskTitle: 'Create the Patients table with core demographic fields',
          taskDescription: 'Define a table named `patients` with a primary key `id`, `full_name`, `dob`, `phone`, and `blood_type`. Choose the most efficient SQL data types for each attribute.',
          conceptIds: ['primary-key', 'data-types'],
          targetTable: 'patients',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'full_name', type: 'VARCHAR(100)' },
            { name: 'dob', type: 'DATE' },
            { name: 'phone', type: 'VARCHAR(20)' },
            { name: 'blood_type', type: 'VARCHAR(5)' },
          ],
          sqlHint: 'Use INT PRIMARY KEY for id, VARCHAR(100) for name, and DATE for dob.',
          expectedSqlKeywords: ['CREATE', 'TABLE', 'patients', 'PRIMARY KEY'],
          starterCode: `-- Step 1-1: Create Patients Table
CREATE TABLE patients (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(20),
  blood_type VARCHAR(5)
);`,
          solutionCode: `CREATE TABLE patients (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(20),
  blood_type VARCHAR(5)
);`,
        },
        {
          id: '1-2',
          stepNumber: 2,
          totalStepsInMilestone: 2,
          taskTitle: 'Create the Doctors table with medical credentials',
          taskDescription: 'Establish the `doctors` table containing `id`, `full_name`, `specialization`, and `license_number` to represent medical staff.',
          conceptIds: ['primary-key', 'data-types'],
          targetTable: 'doctors',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'full_name', type: 'VARCHAR(100)' },
            { name: 'specialization', type: 'VARCHAR(100)' },
            { name: 'license_number', type: 'VARCHAR(50)' },
          ],
          sqlHint: 'Ensure license_number is VARCHAR to support alphanumeric state license IDs.',
          expectedSqlKeywords: ['CREATE', 'TABLE', 'doctors', 'PRIMARY KEY'],
          starterCode: `-- Step 1-2: Create Doctors Table
CREATE TABLE doctors (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  license_number VARCHAR(50) UNIQUE
);`,
          solutionCode: `CREATE TABLE doctors (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  license_number VARCHAR(50) UNIQUE
);`,
        },
      ],
    },
    {
      id: 2,
      title: 'Build relationships between entities',
      status: 'active',
      summary: 'Connect Patients and Doctors through an Appointments table using Foreign Keys and Referential Integrity.',
      unlockedConcepts: ['foreign-key', 'referential-integrity'],
      steps: [
        {
          id: '2-1',
          stepNumber: 1,
          totalStepsInMilestone: 2,
          taskTitle: 'Create the Appointments table and link it to Patients and Doctors',
          taskDescription: 'You need to connect patients with attending physicians. Create the `appointments` table and declare foreign keys referencing `patients(id)` and `doctors(id)`.',
          conceptIds: ['foreign-key', 'referential-integrity'],
          targetTable: 'appointments',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'patient_id', type: 'INT', isForeignKey: true, references: 'patients(id)' },
            { name: 'doctor_id', type: 'INT', isForeignKey: true, references: 'doctors(id)' },
            { name: 'appointment_date', type: 'DATETIME' },
            { name: 'status', type: 'VARCHAR(20)' },
          ],
          sqlHint: 'FOREIGN KEY (patient_id) REFERENCES patients(id)',
          expectedSqlKeywords: ['CREATE', 'TABLE', 'appointments', 'FOREIGN KEY', 'REFERENCES'],
          starterCode: `-- Step 2-1: Create Appointments with Foreign Keys
CREATE TABLE appointments (
  id INT PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  appointment_date DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'SCHEDULED',
  -- Add foreign key constraints below:
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);`,
          solutionCode: `CREATE TABLE appointments (
  id INT PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  appointment_date DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'SCHEDULED',
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);`,
        },
        {
          id: '2-2',
          stepNumber: 2,
          totalStepsInMilestone: 2,
          taskTitle: 'Enforce ON DELETE CASCADE for patient record cleanup',
          taskDescription: 'When a patient record is archived or removed, all scheduled appointments for that patient should be cleaned up automatically to maintain database integrity.',
          conceptIds: ['referential-integrity'],
          targetTable: 'appointments',
          columnsAdded: [],
          sqlHint: 'Add ON DELETE CASCADE to the FOREIGN KEY constraint.',
          expectedSqlKeywords: ['FOREIGN KEY', 'REFERENCES', 'ON DELETE', 'CASCADE'],
          starterCode: `-- Step 2-2: Add ON DELETE CASCADE
ALTER TABLE appointments
  ADD CONSTRAINT fk_patient_cascade
  FOREIGN KEY (patient_id) REFERENCES patients(id)
  ON DELETE CASCADE;`,
          solutionCode: `ALTER TABLE appointments
  ADD CONSTRAINT fk_patient_cascade
  FOREIGN KEY (patient_id) REFERENCES patients(id)
  ON DELETE CASCADE;`,
        },
      ],
    },
    {
      id: 3,
      title: 'Normalize hospital department structure',
      status: 'locked',
      summary: 'Eliminate duplicate department strings by introducing 3NF normalized Departments table.',
      unlockedConcepts: ['3nf-normalization', 'composite-keys'],
      steps: [
        {
          id: '3-1',
          stepNumber: 1,
          totalStepsInMilestone: 2,
          taskTitle: 'Extract Departments table into Third Normal Form (3NF)',
          taskDescription: 'Avoid repeating department names like "Cardiology" across thousands of doctor rows. Create a dedicated `departments` table linked to `doctors`.',
          conceptIds: ['3nf-normalization', 'composite-keys'],
          targetTable: 'departments',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'floor_location', type: 'VARCHAR(20)' },
            { name: 'head_doctor_id', type: 'INT', isForeignKey: true, references: 'doctors(id)' },
          ],
          sqlHint: '3NF ensures non-key attributes depend solely on the primary key.',
          expectedSqlKeywords: ['CREATE', 'TABLE', 'departments', 'PRIMARY KEY'],
          starterCode: `-- Step 3-1: Create Normalized Departments Table
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  floor_location VARCHAR(20),
  head_doctor_id INT,
  FOREIGN KEY (head_doctor_id) REFERENCES doctors(id)
);`,
          solutionCode: `CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  floor_location VARCHAR(20),
  head_doctor_id INT,
  FOREIGN KEY (head_doctor_id) REFERENCES doctors(id)
);`,
        },
      ],
    },
    {
      id: 4,
      title: 'Query clinical history with JOINs & Aggregations',
      status: 'locked',
      summary: 'Construct complex relational queries to generate patient treatment timelines and doctor workloads.',
      unlockedConcepts: ['inner-join', 'group-by-aggregates'],
      steps: [
        {
          id: '4-1',
          stepNumber: 1,
          totalStepsInMilestone: 2,
          taskTitle: 'Write an INNER JOIN query for prescription logs',
          taskDescription: 'Create the `prescriptions` table and write a query linking appointments to prescribed medications.',
          conceptIds: ['inner-join', 'group-by-aggregates'],
          targetTable: 'prescriptions',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'appointment_id', type: 'INT', isForeignKey: true, references: 'appointments(id)' },
            { name: 'medication_name', type: 'VARCHAR(100)' },
            { name: 'dosage', type: 'VARCHAR(50)' },
            { name: 'refills_allowed', type: 'INT' },
          ],
          sqlHint: 'SELECT p.full_name, pr.medication_name FROM patients p JOIN appointments a ...',
          expectedSqlKeywords: ['CREATE', 'TABLE', 'prescriptions'],
          starterCode: `-- Step 4-1: Prescriptions Table
CREATE TABLE prescriptions (
  id INT PRIMARY KEY,
  appointment_id INT,
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50),
  refills_allowed INT DEFAULT 0,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);`,
          solutionCode: `CREATE TABLE prescriptions (
  id INT PRIMARY KEY,
  appointment_id INT,
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50),
  refills_allowed INT DEFAULT 0,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);`,
        },
      ],
    },
    {
      id: 5,
      title: 'Optimize queries & B-Tree indexing',
      status: 'locked',
      summary: 'Add B-Tree indexes on high-frequency search columns like patient phone numbers and appointment dates.',
      unlockedConcepts: ['b-tree-indexes', 'query-execution-plans'],
      steps: [
        {
          id: '5-1',
          stepNumber: 1,
          totalStepsInMilestone: 2,
          taskTitle: 'Create B-Tree index on patient_id and appointment_date',
          taskDescription: 'As the database scales to millions of records, full table scans slow down appointment lookups. Create a composite index to accelerate queries.',
          conceptIds: ['b-tree-indexes', 'query-execution-plans'],
          targetTable: 'billing',
          columnsAdded: [
            { name: 'id', type: 'INT', isPrimaryKey: true },
            { name: 'patient_id', type: 'INT', isForeignKey: true, references: 'patients(id)' },
            { name: 'total_amount', type: 'DECIMAL(10,2)' },
            { name: 'payment_status', type: 'VARCHAR(20)' },
            { name: 'created_at', type: 'DATE' },
          ],
          sqlHint: 'CREATE INDEX idx_appointments_lookup ON appointments(patient_id, appointment_date);',
          expectedSqlKeywords: ['CREATE', 'INDEX', 'ON', 'appointments'],
          starterCode: `-- Step 5-1: Create Index for High-Speed Lookups
CREATE INDEX idx_appointments_date
ON appointments (patient_id, appointment_date);`,
          solutionCode: `CREATE INDEX idx_appointments_date
ON appointments (patient_id, appointment_date);`,
        },
      ],
    },
    {
      id: 6,
      title: 'Ensure financial transactions & ACID compliance',
      status: 'locked',
      summary: 'Implement atomic transactions for billing invoice settlement and insurance payouts.',
      unlockedConcepts: ['acid-properties', 'database-transactions'],
      steps: [
        {
          id: '6-1',
          stepNumber: 1,
          totalStepsInMilestone: 1,
          taskTitle: 'Write an atomic billing settlement transaction',
          taskDescription: 'Wrap invoice payment processing in a BEGIN TRANSACTION / COMMIT block so patient accounts and billing records update atomically.',
          conceptIds: ['acid-properties', 'database-transactions'],
          targetTable: 'billing',
          columnsAdded: [],
          sqlHint: 'BEGIN TRANSACTION; UPDATE billing SET payment_status = "PAID"; COMMIT;',
          expectedSqlKeywords: ['BEGIN', 'UPDATE', 'COMMIT'],
          starterCode: `-- Step 6-1: Atomic Payment Transaction
BEGIN TRANSACTION;

UPDATE billing
SET payment_status = 'PAID'
WHERE id = 1001;

COMMIT;`,
          solutionCode: `BEGIN TRANSACTION;
UPDATE billing SET payment_status = 'PAID' WHERE id = 1001;
COMMIT;`,
        },
      ],
    },
  ],
  concepts: [
    {
      id: 'primary-key',
      name: 'Primary Key',
      category: 'Database Fundamentals',
      explanation: 'A primary key is a column (or combination of columns) that uniquely identifies each row in a database table. No two rows can share the same primary key value, and it can never be NULL.',
      miniExample: `CREATE TABLE students (
  id INT PRIMARY KEY,
  full_name VARCHAR(100)
);`,
      projectApplication: 'Used in `patients(id)` and `doctors(id)` to guarantee every single patient and doctor has an unambiguous, unique identifier.',
      usedInTables: ['patients', 'doctors', 'appointments', 'departments', 'prescriptions', 'billing'],
    },
    {
      id: 'data-types',
      name: 'Data Types',
      category: 'Database Fundamentals',
      explanation: 'SQL data types strictly define the kind of data a column can store — such as INT for whole numbers, VARCHAR(N) for variable length text, DATE for calendar dates, or DECIMAL for currency.',
      miniExample: `CREATE TABLE inventory (
  item_code INT,
  item_name VARCHAR(50),
  price DECIMAL(8,2),
  restock_date DATE
);`,
      projectApplication: 'Allows storing dates accurately for `dob`, phone numbers as text to preserve leading zeros, and medical dosage specifications.',
      usedInTables: ['patients', 'doctors', 'billing'],
    },
    {
      id: 'foreign-key',
      name: 'Foreign Keys',
      category: 'Relationships',
      explanation: 'A foreign key is a column in one table that references the primary key of another table. It forms a direct relationship between entities, guaranteeing cross-table links remain valid.',
      miniExample: `CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);`,
      projectApplication: 'In the `appointments` table, `patient_id` references `patients(id)` and `doctor_id` references `doctors(id)` so every consultation links to a real patient and physician.',
      usedInTables: ['appointments', 'departments', 'prescriptions', 'billing'],
    },
    {
      id: 'referential-integrity',
      name: 'Referential Integrity',
      category: 'Relationships',
      explanation: 'Referential integrity is a database state where all foreign keys point to valid, existing primary key rows. Constraints like ON DELETE CASCADE or ON DELETE RESTRICT control automatic cleanup when referenced records are changed.',
      miniExample: `-- Automatically delete order line items if the main order is deleted
FOREIGN KEY (order_id) REFERENCES orders(id)
ON DELETE CASCADE`,
      projectApplication: 'Prevents "orphaned" appointments or billings if a patient file is deleted or merged in the hospital system.',
      usedInTables: ['appointments', 'prescriptions'],
    },
    {
      id: '3nf-normalization',
      name: '3NF Normalization',
      category: 'Database Fundamentals',
      explanation: 'Third Normal Form (3NF) requires a table to be in 2NF and ensure every non-key column depends solely on the primary key (no transitive dependencies). This prevents data redundancy and insertion/update anomalies.',
      miniExample: `-- Bad: repeating department name and department floor in doctor records
-- Good: extract departments into its own table with a foreign key in doctors`,
      projectApplication: 'Extracts department names and floor wing locations into a separate `departments` table rather than duplicating department strings across thousands of physician records.',
      usedInTables: ['departments', 'doctors'],
    },
    {
      id: 'composite-keys',
      name: 'Composite Keys',
      category: 'Database Fundamentals',
      explanation: 'A composite key is a primary key made up of two or more columns combined together to uniquely identify a record when no single column alone is unique.',
      miniExample: `CREATE TABLE doctor_schedules (
  doctor_id INT,
  shift_date DATE,
  PRIMARY KEY (doctor_id, shift_date)
);`,
      projectApplication: 'Ensures a physician cannot be double-booked for two conflicting shifts on the exact same date.',
      usedInTables: ['appointments'],
    },
    {
      id: 'inner-join',
      name: 'INNER JOIN Querying',
      category: 'Relationships',
      explanation: 'An INNER JOIN merges rows from two or more tables based on a related column, returning only records that have matching values in both tables.',
      miniExample: `SELECT patients.full_name, appointments.appointment_date
FROM patients
JOIN appointments ON patients.id = appointments.patient_id;`,
      projectApplication: 'Enables printing complete medical charts showing patient names, attending doctors, and prescription details in a single query result.',
      usedInTables: ['patients', 'appointments', 'doctors', 'prescriptions'],
    },
    {
      id: 'group-by-aggregates',
      name: 'GROUP BY & Aggregations',
      category: 'Database Fundamentals',
      explanation: 'Aggregate functions (COUNT, SUM, AVG, MAX, MIN) calculate summary statistics over sets of rows, grouped by one or more attributes using GROUP BY.',
      miniExample: `SELECT specialization, COUNT(*) as doctor_count
FROM doctors
GROUP BY specialization;`,
      projectApplication: 'Calculates total revenue per hospital department or daily patient consultation volume.',
      usedInTables: ['doctors', 'billing', 'appointments'],
    },
    {
      id: 'b-tree-indexes',
      name: 'B-Tree Indexing',
      category: 'Optimization',
      explanation: 'A database index is a data structure (typically a B-Tree) that accelerates table lookups from O(N) full table scans to O(log N) fast pointer lookups.',
      miniExample: `CREATE INDEX idx_patient_phone ON patients(phone);`,
      projectApplication: 'Speeds up receptionist patient searches by phone number and emergency room triage lookups instantly.',
      usedInTables: ['patients', 'appointments'],
    },
    {
      id: 'query-execution-plans',
      name: 'Query Execution Plans',
      category: 'Optimization',
      explanation: 'A Query Execution Plan (EXPLAIN ANALYZE) reveals how the database query optimizer accesses data — showing index scans vs sequential table scans and cost estimates.',
      miniExample: `EXPLAIN ANALYZE SELECT * FROM appointments WHERE patient_id = 42;`,
      projectApplication: 'Helps database administrators verify that indexes are being utilized effectively on large hospital datasets.',
      usedInTables: ['appointments'],
    },
    {
      id: 'acid-properties',
      name: 'ACID Compliance',
      category: 'Integrity & Transactions',
      explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability — four core guarantees that ensure database transactions process reliably even during system crashes.',
      miniExample: `-- All operations succeed together or roll back completely
BEGIN TRANSACTION;
  -- Deduct patient balance
  -- Credit hospital account
COMMIT;`,
      projectApplication: 'Ensures hospital billing payments and insurance claims never leave balances in an inconsistent half-paid state.',
      usedInTables: ['billing'],
    },
    {
      id: 'database-transactions',
      name: 'Database Transactions',
      category: 'Integrity & Transactions',
      explanation: 'A transaction is a sequence of SQL operations executed as a single logical unit of work. If any step fails, the entire unit is rolled back.',
      miniExample: `BEGIN TRANSACTION;
  INSERT INTO billing (patient_id, total_amount) VALUES (1, 150.00);
  UPDATE appointments SET status = 'COMPLETED' WHERE id = 10;
COMMIT;`,
      projectApplication: 'Atomically updates appointment status to COMPLETED while issuing the corresponding invoice in a single step.',
      usedInTables: ['billing', 'appointments'],
    },
  ],
};
