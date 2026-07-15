export type WeekData = {
  week: number;
  semester: number;
  level: number;
  theme: string;
  focus: string;
  task: string;
  rubric: string;
};

export type StreamCurriculum = {
  streamName: string;
  weeks: WeekData[];
};

export type ProgramCurriculum = {
  programName: string;
  streams: StreamCurriculum[];
};

const ugCoreWeeks: WeekData[] = [
  // Sem 1 (Weeks 1-4)
  { week: 1, semester: 1, level: 1, theme: 'Course orientation & Self-awareness', focus: 'Expectations, Strengths, Habits', task: 'Self-profile worksheet', rubric: 'Completeness, insight' },
  { week: 2, semester: 1, level: 1, theme: 'Learning habits & Listening', focus: 'Study routines, Active listening', task: 'Personal learning plan & drill', rubric: 'Practicality, attention' },
  { week: 3, semester: 1, level: 1, theme: 'Speaking comfort', focus: 'Short sharing, voice confidence', task: 'Pair talk & short response', rubric: 'Fluency, confidence' },
  { week: 4, semester: 1, level: 1, theme: 'Soft skills basics', focus: 'Grooming, etiquette, presence', task: 'Soft-skills checklist', rubric: 'Awareness, professionalism' },
  
  // Sem 2 (Weeks 5-8)
  { week: 5, semester: 2, level: 1, theme: 'Articulation & Clarity', focus: 'Clarity, pronunciation, basics of GD', task: 'Structured GD round', rubric: 'Participation, clarity' },
  { week: 6, semester: 2, level: 1, theme: 'Group discussion I (The Basics)', focus: 'Idea flow, teamwork', task: 'Advanced GD round', rubric: 'Logical contribution' },
  { week: 7, semester: 2, level: 1, theme: 'Group discussion II (Advanced Dynamics)', focus: 'Opening, body, closing', task: '2–3 min presentation', rubric: 'Structure, stage presence' },
  { week: 8, semester: 2, level: 1, theme: 'The Micro Presentation', focus: 'Paragraphs, academic tone', task: 'Short writing assignment', rubric: 'Coherence, grammar' },

  // Sem 3 (Weeks 9-12)
  { week: 9, semester: 3, level: 2, theme: 'Writing skills I', focus: 'Paragraphs, academic tone', task: 'Short writing assignment', rubric: 'Coherence, grammar' },
  { week: 10, semester: 3, level: 2, theme: 'Writing skills II', focus: 'Resume & Email basics', task: 'Resume draft', rubric: 'Format, accuracy' },
  { week: 11, semester: 3, level: 2, theme: 'Body language', focus: 'Posture, non-verbal communication', task: 'Mock interview', rubric: 'Collaboration, posture' },
  { week: 12, semester: 3, level: 2, theme: 'Meetings & Teamwork', focus: 'Meeting participation', task: 'Mock meeting', rubric: 'Collaboration' },
  
  // Sem 4 (Weeks 13-16)
  { week: 13, semester: 4, level: 2, theme: 'Career awareness', focus: 'Career paths, aspirations', task: 'Career mapping sheet', rubric: 'Thoughtfulness, alignment' },
  { week: 14, semester: 4, level: 2, theme: 'Interview basics', focus: 'Interview process, prep', task: 'Interview prep worksheet', rubric: 'Preparation, understanding' },
  { week: 15, semester: 4, level: 3, theme: 'Answers and Behavior', focus: 'STAR method', task: 'Mock Answer Practice', rubric: 'Comprehension' },
  { week: 16, semester: 4, level: 3, theme: 'Digital Communication', focus: 'Email Etiquette', task: 'Professional Email Task', rubric: 'Analytical approach' },
];

const generateUgLevel4 = (stream: string): WeekData[] => {
  return [
    // Sem 5 (Weeks 17-20)
    { week: 17, semester: 5, level: 4, theme: `${stream}: Traditional Career Paths`, focus: 'Entry barriers, exams, courses', task: 'Traditional career map', rubric: 'Accuracy of path details' },
    { week: 18, semester: 5, level: 4, theme: `${stream}: Modern Career Paths`, focus: 'New tech, emerging roles', task: 'Modern roles research', rubric: 'Relevance to current market' },
    { week: 19, semester: 5, level: 4, theme: `${stream}: Freelancing & Consulting`, focus: 'Gig economy, platforms, skills', task: 'Freelance profile draft', rubric: 'Marketability, skill fit' },
    { week: 20, semester: 5, level: 4, theme: 'Industry Case Study', focus: 'Analyzing a business case', task: 'Case study presentation', rubric: 'Analytical depth' },
    
    // Sem 6 (Weeks 21-24)
    { week: 21, semester: 6, level: 4, theme: 'Psychometric Assessments', focus: 'Taking a full mock test', task: 'Completed mock assessment', rubric: 'Completion, time management' },
    { week: 22, semester: 6, level: 4, theme: 'Workplace Tools', focus: 'Word processing, presentation tools, file discipline', task: 'Digital submission task', rubric: 'Accuracy, formatting, file handling' },
    { week: 23, semester: 6, level: 4, theme: 'Advanced Interview Defense', focus: 'Panel interviews, technical rounds', task: 'Mock Panel Interview', rubric: 'Confidence, structuring' },
    { week: 24, semester: 6, level: 4, theme: 'Final Practice & Review', focus: 'Resume, Interview, Psychometrics', task: 'Final practical demonstration', rubric: 'Overall readiness' },
  ];
};

const pgSem12Weeks: WeekData[] = [
  // Semester 1 (Level 1: Weeks 1-5)
  { week: 1, semester: 1, level: 1, theme: 'Professional orientation', focus: 'Academic-professional identity', task: 'Professional baseline reflection', rubric: 'Clarity, seriousness' },
  { week: 2, semester: 1, level: 1, theme: 'Advanced self-awareness', focus: 'Strengths, growth gaps', task: 'Professional competency profile', rubric: 'Depth, accuracy' },
  { week: 3, semester: 1, level: 1, theme: 'Self-management', focus: 'Time, energy, accountability', task: 'Performance management plan', rubric: 'Ownership, consistency' },
  { week: 4, semester: 1, level: 1, theme: 'Analytical listening', focus: 'Critical listening, inference', task: 'Analytical listening task', rubric: 'Accuracy, interpretation' },
  { week: 5, semester: 1, level: 1, theme: 'Professional speaking', focus: 'Voice, executive presence', task: 'Structured oral brief', rubric: 'Fluency, presence' },

  // Semester 2 (Level 2: Weeks 6-10)
  { week: 6, semester: 2, level: 2, theme: 'Analytical articulation', focus: 'Structured speaking, evidence', task: 'Concept explanation', rubric: 'Clarity, logic' },
  { week: 7, semester: 2, level: 2, theme: 'Discussion facilitation', focus: 'Moderated discussion', task: 'Facilitated group round', rubric: 'Moderation, relevance' },
  { week: 8, semester: 2, level: 2, theme: 'Analytical writing', focus: 'Professional note writing', task: 'Writing assignment', rubric: 'Coherence, depth' },
  { week: 9, semester: 2, level: 2, theme: 'Meetings & Leadership', focus: 'Chairing meetings', task: 'Mock meeting leadership', rubric: 'Leadership, process control' },
  { week: 10, semester: 2, level: 2, theme: 'Interview design & response', focus: 'STAR-style response', task: 'Mock response lab', rubric: 'Structure, relevance' },
];

const pgSem3Weeks: WeekData[] = [
  // Semester 3 (Level 3: Weeks 11-15)
  { week: 11, semester: 3, level: 3, theme: 'Intro to Psychometrics', focus: 'Types of tests & evaluation metrics', task: 'Test format analysis', rubric: 'Comprehension of test types' },
  { week: 12, semester: 3, level: 3, theme: 'Approaching Psychometrics', focus: 'Section-wise answer strategies', task: 'Strategy breakdown sheet', rubric: 'Analytical approach' },
  { week: 13, semester: 3, level: 3, theme: 'Psychometrics & Career Choice', focus: 'Aligning test results to roles', task: 'Career alignment reflection', rubric: 'Self-insight, realism' },
  { week: 14, semester: 3, level: 3, theme: 'Advanced Body Language', focus: 'Poise, controlled gestures', task: 'Presence review task', rubric: 'Confidence signals' },
  { week: 15, semester: 3, level: 3, theme: 'Digital Professionalism', focus: 'Email etiquette, online presence', task: 'Professional comms task', rubric: 'Tone, digital maturity' },
];

const mbaSem3Weeks: WeekData[] = [
  // Semester 3 (Level 3: Weeks 11-15)
  { week: 11, semester: 3, level: 3, theme: 'Capstone Synthesis', focus: 'Reviewing Sem 2 skills', task: 'Practical worksheets', rubric: 'Comprehension, application' },
  { week: 12, semester: 3, level: 3, theme: 'Advanced Executive Processes', focus: 'High-level C-Suite skills', task: 'Case study analysis', rubric: 'Strategic thinking' },
  { week: 13, semester: 3, level: 3, theme: 'The Digital Business', focus: 'AI, MarTech, FinTech', task: 'Digital strategy brief', rubric: 'Tech fluency, innovation' },
  { week: 14, semester: 3, level: 3, theme: 'Building the Foundation', focus: 'Startups, scaling, product-market fit', task: 'Foundation mapping', rubric: 'Logical structure' },
  { week: 15, semester: 3, level: 3, theme: 'Commitment & Action', focus: 'First steps on your journey', task: 'Action plan execution', rubric: 'Commitment, realism' },
];

const mbaSem4Weeks: WeekData[] = [
  // Semester 4 (Level 4: Weeks 16-20)
  { week: 16, semester: 4, level: 4, theme: 'The Execution Review', focus: 'Defending track commitments', task: 'Peer-reviewed presentations', rubric: 'Clarity, feasibility' },
  { week: 17, semester: 4, level: 4, theme: 'Path-Specific Deep Dives', focus: 'Advanced track skills', task: 'Track-specific milestone', rubric: 'Depth of knowledge' },
  { week: 18, semester: 4, level: 4, theme: 'Crisis Management & Resilience', focus: 'Navigating high-pressure setbacks', task: 'War Room simulation response', rubric: 'Adaptability, composure' },
  { week: 19, semester: 4, level: 4, theme: 'The Capstone Synthesis', focus: 'Final integrated presentation', task: 'Capstone delivery', rubric: 'Synthesis, executive presence' },
  { week: 20, semester: 4, level: 4, theme: 'The Launchpad', focus: 'Alumni transition, lifelong learning', task: 'Future self letter', rubric: 'Vision, maturity' },
];

const mcomSem3Weeks: WeekData[] = [
  // Semester 3 (Level 3: Weeks 11-15) - M.Com Specific
  { week: 11, semester: 3, level: 3, theme: 'Financial Storytelling', focus: 'Translating data for non-finance stakeholders', task: 'Data narrative presentation', rubric: 'Clarity, conciseness' },
  { week: 12, semester: 3, level: 3, theme: 'Analytical Communication & Pushback', focus: 'Delivering bad news, managing scope', task: 'Roleplay: Budget denial', rubric: 'Tact, firmness' },
  { week: 13, semester: 3, level: 3, theme: 'The Ethics of Finance', focus: 'Compliance pressure and whistleblowing', task: 'Ethics simulation', rubric: 'Integrity, risk assessment' },
  { week: 14, semester: 3, level: 3, theme: 'Negotiation for Finance', focus: 'Hard-bargaining skills', task: 'Vendor contract negotiation', rubric: 'Leverage use, outcome' },
  { week: 15, semester: 3, level: 3, theme: 'The Financial Specialist Persona', focus: 'Niche branding and networking', task: 'Resume and networking plan', rubric: 'Specialization depth' },
];

const generatePgLevel4 = (stream: string): WeekData[] => {
  return [
    // Semester 4 (Level 4: Weeks 16-20)
    { week: 16, semester: 4, level: 4, theme: `${stream}: Traditional Career Paths`, focus: 'Entry barriers, exams, courses', task: 'Traditional career map', rubric: 'Accuracy of path details' },
    { week: 17, semester: 4, level: 4, theme: `${stream}: Modern Career Paths`, focus: 'New tech, emerging roles', task: 'Modern roles research', rubric: 'Relevance to current market' },
    { week: 18, semester: 4, level: 4, theme: `${stream}: Freelancing Opportunities`, focus: 'Gig economy, platforms, skills', task: 'Freelance profile draft', rubric: 'Marketability, skill fit' },
    { week: 19, semester: 4, level: 4, theme: 'Demo Psychometric Assessment', focus: 'Taking a full mock test', task: 'Completed mock assessment', rubric: 'Completion, time management' },
    { week: 20, semester: 4, level: 4, theme: 'Capstone Review', focus: 'Portfolio presentation, mock panel', task: 'Final defence', rubric: 'Professional maturity' },
  ];
};

export const curriculumData: { ug: ProgramCurriculum, pg: ProgramCurriculum } = {
  ug: {
    programName: 'UG',
    streams: [
      { streamName: 'B.Com', weeks: [...ugCoreWeeks, ...generateUgLevel4('B.Com')] },
      { streamName: 'BBA', weeks: [...ugCoreWeeks, ...generateUgLevel4('BBA')] },
      { streamName: 'BCA', weeks: [...ugCoreWeeks, ...generateUgLevel4('BCA')] },
    ]
  },
  pg: {
    programName: 'PG',
    streams: [
      { streamName: 'M.Com', weeks: [...pgSem12Weeks, ...mcomSem3Weeks, ...generatePgLevel4('M.Com')] },
      { streamName: 'MBA', weeks: [...pgSem12Weeks, ...mbaSem3Weeks, ...mbaSem4Weeks] },
      { streamName: 'MCA', weeks: [...pgSem12Weeks, ...pgSem3Weeks, ...generatePgLevel4('MCA')] },
    ]
  }
};
