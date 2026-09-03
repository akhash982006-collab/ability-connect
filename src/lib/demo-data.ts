/**
 * 3roots India – Tamil Nadu pilot demo dataset.
 * Shared by candidate, employer and admin workspaces.
 * All content is task-based: no disability category is stored or used for matching.
 */

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";
export type WorkMode = "Onsite" | "Hybrid" | "Remote";
export type TaskClassification = "Mandatory" | "Adaptable" | "Optional";

/** Requirement types a job task can carry. The engine maps these to accommodations. */
export type RequirementType =
  | "typing"
  | "mouse"
  | "phone"
  | "standing"
  | "printed_documents"
  | "visual_monitoring"
  | "audio_alerts"
  | "travel"
  | "repetitive_manual"
  | "lifting"
  | "verbal_communication"
  | "screen_use"
  | "team_communication";

export interface EssentialTask {
  id: string;
  name: string;
  classification: TaskClassification;
  requirements: RequirementType[];
  liftKg?: number;
  physical: string;
  communication: string;
  technology: string;
  environment: string;
  whyEssential: string;
  alternativeMethodPossible: boolean;
  alternativeMethodNote?: string;
  workstationChangePossible: boolean;
  reassignable: boolean;
  standard: string;
  accommodationsAvailable: string[];
  trainingProvided?: string;
}

export interface FunctionalAbilities {
  keyboard: boolean;
  mouse: boolean;
  voiceInput: boolean;
  eyeTracking: boolean;
  footInput: boolean;
  screenReader: boolean;
  hearingAssistance: boolean;
  verbalCommunication: boolean;
  textCommunication: boolean;
  standLong: boolean;
  sitLong: boolean;
  liftKg: number;
  travelIndependently: boolean;
  remoteWork: boolean;
  repetitiveMovement: boolean;
  personalAssistance: boolean;
  modifiedWorkstation: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  headline: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  state: string;
  hubId: string;
  education: { degree: string; institution: string; year: number }[];
  skills: { name: string; level: SkillLevel; verified?: boolean }[];
  certifications: { name: string; issuer: string; year: number }[];
  experience: { role: string; company: string; years: number; summary: string }[];
  totalExperienceYears: number;
  languages: { name: string; level: "Basic" | "Intermediate" | "Fluent" }[];
  jobInterests: string[];
  preferredIndustry: string[];
  workMode: WorkMode[];
  expectedSalary: number;
  employmentStatus: string;
  mobilityRequirements: string[];
  assistiveTech: string[];
  accommodationRequirements: string[];
  communicationMethods: string[];
  taskPerformanceMethods: string[];
  functional: FunctionalAbilities;
  functionalConsent: boolean;
  readiness: {
    technical: number;
    communication: number;
    digitalLiteracy: number;
    jobAssessment: number;
    workplace: number;
  };
  assessments: { name: string; score: number; date: string }[];
  status: "Registered" | "Assessed" | "In Training" | "Job Ready" | "Interning" | "Placed";
}

export interface AccessibilityItem {
  name: string;
  status: "Good" | "Available" | "Needs Improvement" | "Not Available";
  relevantTo: RequirementType[];
}

export interface Employer {
  id: string;
  name: string;
  industry: string;
  cluster: string;
  city: string;
  district: string;
  state: string;
  employees: number;
  founded: number;
  contact: { name: string; role: string; email: string; phone: string };
  about: string;
  accessibility: AccessibilityItem[];
  inclusion: {
    inclusiveHiring: number;
    accessibility: number;
    retention: number;
    inclusiveRecruitment: number;
    managerTraining: number;
    employeeSupport: number;
  };
  credits: { date: string; action: string; credits: number }[];
  pwdEmployees: number;
}

export interface Job {
  id: string;
  title: string;
  employerId: string;
  location: string;
  district: string;
  salaryMin: number;
  salaryMax: number;
  employmentType: string;
  workMode: WorkMode;
  workingHours: string;
  requiredSkills: { name: string; level: SkillLevel }[];
  experienceYears: number;
  education: string;
  description: string;
  openings: number;
  tasks: EssentialTask[];
  accommodationBudget: string;
  accessibilityContact: string;
  transport: { publicTransport: boolean; accessibleTransport: boolean; relocation: boolean };
  postedOn: string;
  status: "Draft" | "Published" | "Closed";
  tasksDefined: boolean;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  provider: string;
  duration: string;
  mode: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  certification: string;
  skills: string[];
  jobOpportunities: string[];
  completion: number;
  recommendedFor?: string;
}

export interface MarketplaceProvider {
  id: string;
  provider: string;
  product: string;
  category: string;
  location: string;
  cost: string;
  costLevel: "A" | "B" | "C";
  rating: number;
  contact: string;
  cities: string[];
  supportedTasks: string[];
  setupTime: string;
  trainingSupport: boolean;
}

export interface Hub {
  id: string;
  name: string;
  city: string;
  district: string;
  state: string;
  partner: string;
  partnerType: string;
  coordinator: string;
  contact: string;
  candidates: number;
  employers: number;
  placed: number;
  trainingPrograms: string[];
  upcomingDrives: string[];
  remoteHub: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Candidates                                 */
/* -------------------------------------------------------------------------- */

const baseFunctional: FunctionalAbilities = {
  keyboard: true,
  mouse: true,
  voiceInput: true,
  eyeTracking: false,
  footInput: false,
  screenReader: false,
  hearingAssistance: false,
  verbalCommunication: true,
  textCommunication: true,
  standLong: true,
  sitLong: true,
  liftKg: 15,
  travelIndependently: true,
  remoteWork: true,
  repetitiveMovement: true,
  personalAssistance: false,
  modifiedWorkstation: false,
};

export const candidates: Candidate[] = [
  {
    id: "c-priya",
    name: "Priya Selvam",
    initials: "PS",
    headline: "Customer Support Executive · Tamil & English · Screen-reader user",
    email: "priya.selvam@example.in",
    phone: "+91 98431 20114",
    city: "Nagercoil",
    district: "Kanyakumari",
    state: "Tamil Nadu",
    hubId: "hub-nagercoil",
    education: [
      { degree: "B.Com (Computer Applications)", institution: "Scott Christian College, Nagercoil", year: 2023 },
    ],
    skills: [
      { name: "Customer Service", level: "Advanced", verified: true },
      { name: "MS Excel", level: "Advanced", verified: true },
      { name: "CRM Software", level: "Intermediate", verified: true },
      { name: "Email Communication", level: "Advanced" },
      { name: "Data Entry", level: "Advanced", verified: true },
      { name: "Tally", level: "Beginner" },
    ],
    certifications: [
      { name: "Customer Support Foundations", issuer: "3roots Skill Hub Nagercoil", year: 2026 },
      { name: "Advanced Excel with Screen Reader", issuer: "NIEPMD Partner Centre", year: 2025 },
    ],
    experience: [
      {
        role: "Helpdesk Intern",
        company: "Kanyakumari Co-operative Bank",
        years: 0.8,
        summary: "Handled member queries over email and captioned calls using JAWS with the bank's ticketing tool.",
      },
    ],
    totalExperienceYears: 0.8,
    languages: [
      { name: "Tamil", level: "Fluent" },
      { name: "English", level: "Intermediate" },
      { name: "Malayalam", level: "Basic" },
    ],
    jobInterests: ["Customer Support Executive", "Back Office Operations", "Data Entry Operator"],
    preferredIndustry: ["IT Services", "Retail", "Banking"],
    workMode: ["Remote", "Hybrid"],
    expectedSalary: 18000,
    employmentStatus: "Actively looking",
    mobilityRequirements: ["Travels independently with a white cane", "Prefers familiar routes"],
    assistiveTech: ["JAWS screen reader", "NVDA screen reader", "Keyboard-only navigation", "OCR (Seeing AI)"],
    accommodationRequirements: [
      "Screen-reader compatible software",
      "Digital (not printed) documents",
      "Text or captioned team communication",
    ],
    communicationMethods: ["Text chat", "Captioned calls", "Voice calls"],
    taskPerformanceMethods: [
      "Navigates CRM and spreadsheets fully by keyboard shortcuts",
      "Uses OCR to read scanned documents",
      "Records customer information via screen reader with form-field verification",
    ],
    functional: {
      ...baseFunctional,
      mouse: false,
      screenReader: true,
      liftKg: 10,
      standLong: true,
    },
    functionalConsent: true,
    readiness: { technical: 86, communication: 72, digitalLiteracy: 90, jobAssessment: 76, workplace: 68 },
    assessments: [
      { name: "Customer Service Assessment", score: 85, date: "2026-06-14" },
      { name: "Digital Literacy", score: 90, date: "2026-06-10" },
      { name: "Typing Accuracy (screen reader)", score: 92, date: "2026-06-10" },
      { name: "Workplace Readiness", score: 68, date: "2026-06-18" },
    ],
    status: "Job Ready",
  },
  {
    id: "c-arun",
    name: "Arun Kumar",
    initials: "AK",
    headline: "Data Entry & Tally Operator · Madurai",
    email: "arun.k@example.in",
    phone: "+91 97907 11202",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    hubId: "hub-madurai",
    education: [{ degree: "Diploma in Computer Applications", institution: "Govt. Polytechnic, Madurai", year: 2022 }],
    skills: [
      { name: "Data Entry", level: "Advanced", verified: true },
      { name: "Tally", level: "Advanced", verified: true },
      { name: "MS Excel", level: "Intermediate" },
      { name: "GST Documentation", level: "Intermediate" },
      { name: "Customer Service", level: "Intermediate" },
    ],
    certifications: [{ name: "Tally Prime with GST", issuer: "Madurai Skill Hub", year: 2025 }],
    experience: [
      { role: "Accounts Assistant", company: "Sri Meenakshi Traders", years: 1.5, summary: "Maintained daily ledgers and GST filings." },
    ],
    totalExperienceYears: 1.5,
    languages: [
      { name: "Tamil", level: "Fluent" },
      { name: "English", level: "Basic" },
    ],
    jobInterests: ["Data Entry Operator", "Accounts Assistant"],
    preferredIndustry: ["Textile", "Retail"],
    workMode: ["Onsite", "Hybrid"],
    expectedSalary: 16000,
    employmentStatus: "Employed, open to offers",
    mobilityRequirements: ["Wheelchair user", "Needs step-free entrance and accessible toilet"],
    assistiveTech: ["Adjustable-height desk"],
    accommodationRequirements: ["Step-free access", "Accessible toilet", "Accessible parking or transport"],
    communicationMethods: ["Voice calls", "Text chat"],
    taskPerformanceMethods: ["Standard keyboard and mouse at seated workstation"],
    functional: { ...baseFunctional, standLong: false, liftKg: 5, modifiedWorkstation: true },
    functionalConsent: true,
    readiness: { technical: 82, communication: 64, digitalLiteracy: 80, jobAssessment: 84, workplace: 78 },
    assessments: [{ name: "Tally Practical", score: 88, date: "2026-05-20" }],
    status: "Job Ready",
  },
  {
    id: "c-meena",
    name: "Meena Rajendran",
    initials: "MR",
    headline: "Front Office & Reservations · Tirunelveli",
    email: "meena.r@example.in",
    phone: "+91 94433 60918",
    city: "Tirunelveli",
    district: "Tirunelveli",
    state: "Tamil Nadu",
    hubId: "hub-tirunelveli",
    education: [{ degree: "B.A. English", institution: "Sarah Tucker College", year: 2024 }],
    skills: [
      { name: "Customer Service", level: "Advanced", verified: true },
      { name: "Reservations Software", level: "Intermediate" },
      { name: "MS Excel", level: "Intermediate" },
      { name: "Email Communication", level: "Advanced" },
      { name: "CRM Software", level: "Beginner" },
    ],
    certifications: [{ name: "Hospitality Front Office", issuer: "Tirunelveli Skill Hub", year: 2026 }],
    experience: [],
    totalExperienceYears: 0,
    languages: [
      { name: "Tamil", level: "Fluent" },
      { name: "English", level: "Fluent" },
    ],
    jobInterests: ["Front Office Support", "Customer Support Executive"],
    preferredIndustry: ["Hospitality", "IT Services"],
    workMode: ["Onsite", "Hybrid", "Remote"],
    expectedSalary: 15000,
    employmentStatus: "Actively looking",
    mobilityRequirements: [],
    assistiveTech: ["Hearing aids", "Live captions (Google Meet / phone)"],
    accommodationRequirements: ["Captioned calls or text chat", "Visual alerts instead of audio-only alerts"],
    communicationMethods: ["Text chat", "Captioned video calls", "Indian Sign Language"],
    taskPerformanceMethods: ["Handles customer conversations over chat, email and captioned calls"],
    functional: { ...baseFunctional, hearingAssistance: true, verbalCommunication: true },
    functionalConsent: true,
    readiness: { technical: 74, communication: 80, digitalLiteracy: 85, jobAssessment: 79, workplace: 72 },
    assessments: [{ name: "Customer Service Assessment", score: 81, date: "2026-06-02" }],
    status: "Job Ready",
  },
  {
    id: "c-suresh",
    name: "Suresh Babu",
    initials: "SB",
    headline: "Quality Inspection & Packaging · Madurai",
    email: "suresh.b@example.in",
    phone: "+91 99442 78120",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    hubId: "hub-madurai",
    education: [{ degree: "ITI Fitter", institution: "Govt. ITI Madurai", year: 2021 }],
    skills: [
      { name: "Quality Inspection", level: "Advanced", verified: true },
      { name: "Packaging", level: "Advanced" },
      { name: "Inventory Management", level: "Intermediate" },
      { name: "Documentation", level: "Intermediate" },
    ],
    certifications: [{ name: "Textile Quality Inspection", issuer: "Madurai Textile Cluster", year: 2025 }],
    experience: [{ role: "Packing Assistant", company: "Pandian Exports", years: 2, summary: "Packing and label verification on export lines." }],
    totalExperienceYears: 2,
    languages: [{ name: "Tamil", level: "Fluent" }],
    jobInterests: ["Quality Inspector", "Warehouse Assistant"],
    preferredIndustry: ["Textile", "Manufacturing", "Logistics"],
    workMode: ["Onsite"],
    expectedSalary: 14000,
    employmentStatus: "Actively looking",
    mobilityRequirements: ["Uses a prosthetic arm; prefers tasks not requiring bilateral heavy lifting"],
    assistiveTech: ["Adaptive gripping tool"],
    accommodationRequirements: ["Lifting aids or trolley for loads above 8 kg"],
    communicationMethods: ["Voice calls", "Text chat"],
    taskPerformanceMethods: ["Uses trolley and adaptive grip for load handling; maintains 99% label accuracy"],
    functional: { ...baseFunctional, liftKg: 8, repetitiveMovement: true },
    functionalConsent: true,
    readiness: { technical: 80, communication: 60, digitalLiteracy: 55, jobAssessment: 88, workplace: 82 },
    assessments: [{ name: "Quality Inspection Practical", score: 90, date: "2026-05-28" }],
    status: "Job Ready",
  },
  {
    id: "c-kavitha",
    name: "Kavitha Murugan",
    initials: "KM",
    headline: "Digital Marketing & Content · Nagercoil",
    email: "kavitha.m@example.in",
    phone: "+91 91594 30257",
    city: "Nagercoil",
    district: "Kanyakumari",
    state: "Tamil Nadu",
    hubId: "hub-nagercoil",
    education: [{ degree: "B.Sc. Visual Communication", institution: "Holy Cross College", year: 2023 }],
    skills: [
      { name: "Digital Marketing", level: "Intermediate" },
      { name: "Graphic Design", level: "Advanced", verified: true },
      { name: "Customer Service", level: "Intermediate" },
      { name: "Email Communication", level: "Advanced" },
      { name: "MS Excel", level: "Beginner" },
    ],
    certifications: [{ name: "Google Digital Garage", issuer: "Google", year: 2024 }],
    experience: [{ role: "Freelance Designer", company: "Self-employed", years: 1, summary: "Social media creatives for local retailers." }],
    totalExperienceYears: 1,
    languages: [
      { name: "Tamil", level: "Fluent" },
      { name: "English", level: "Intermediate" },
    ],
    jobInterests: ["Digital Marketing Executive", "Customer Support Executive"],
    preferredIndustry: ["IT Services", "Retail"],
    workMode: ["Remote", "Hybrid"],
    expectedSalary: 17000,
    employmentStatus: "Actively looking",
    mobilityRequirements: ["Uses voice input; limited hand dexterity"],
    assistiveTech: ["Dragon speech-to-text", "Voice control", "Head-tracking mouse"],
    accommodationRequirements: ["Speech-to-text software", "Flexible breaks"],
    communicationMethods: ["Voice calls", "Text chat"],
    taskPerformanceMethods: ["Dictates text at 60 wpm with 97% accuracy; uses voice commands for navigation"],
    functional: { ...baseFunctional, keyboard: false, mouse: false, voiceInput: true, repetitiveMovement: false, liftKg: 3 },
    functionalConsent: true,
    readiness: { technical: 70, communication: 78, digitalLiteracy: 84, jobAssessment: 66, workplace: 70 },
    assessments: [{ name: "Digital Literacy", score: 84, date: "2026-06-05" }],
    status: "In Training",
  },
];

export const primaryCandidate = candidates[0];

/* -------------------------------------------------------------------------- */
/*                                  Employers                                 */
/* -------------------------------------------------------------------------- */

export const employers: Employer[] = [
  {
    id: "e-vaigai",
    name: "Vaigai Connect Solutions",
    industry: "IT Services / BPO",
    cluster: "IT Services Cluster",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    employees: 42,
    founded: 2017,
    contact: { name: "R. Karthik", role: "Operations Head", email: "karthik@vaigaiconnect.in", phone: "+91 452 234 1188" },
    about: "Customer support and back-office SME serving regional e-commerce and utility clients from Madurai's KK Nagar.",
    accessibility: [
      { name: "Building Entrance", status: "Good", relevantTo: ["travel"] },
      { name: "Ramp Availability", status: "Available", relevantTo: ["travel"] },
      { name: "Elevator", status: "Not Available", relevantTo: ["travel"] },
      { name: "Accessible Toilet", status: "Available", relevantTo: ["travel"] },
      { name: "Workspace Layout", status: "Good", relevantTo: ["standing", "repetitive_manual"] },
      { name: "Software Accessibility", status: "Good", relevantTo: ["screen_use", "typing", "mouse", "visual_monitoring", "printed_documents"] },
      { name: "Communication Support", status: "Good", relevantTo: ["phone", "team_communication", "verbal_communication"] },
      { name: "Emergency Procedures", status: "Needs Improvement", relevantTo: ["audio_alerts", "visual_monitoring"] },
      { name: "Parking", status: "Available", relevantTo: ["travel"] },
      { name: "Transport Accessibility", status: "Available", relevantTo: ["travel"] },
      { name: "Accessible Workstation", status: "Good", relevantTo: ["typing", "mouse", "standing"] },
      { name: "Digital Document Accessibility", status: "Good", relevantTo: ["printed_documents", "screen_use"] },
      { name: "Visual and Audio Alerts", status: "Needs Improvement", relevantTo: ["audio_alerts", "visual_monitoring"] },
      { name: "Flexible Work Arrangements", status: "Good", relevantTo: ["travel", "standing"] },
    ],
    inclusion: { inclusiveHiring: 84, accessibility: 72, retention: 90, inclusiveRecruitment: 80, managerTraining: 60, employeeSupport: 85 },
    credits: [
      { date: "2026-03-02", action: "Complete Accessibility Audit", credits: 30 },
      { date: "2026-04-15", action: "Manager Inclusion Training", credits: 25 },
      { date: "2026-06-01", action: "Provide Internship (Arun Kumar)", credits: 30 },
      { date: "2026-07-20", action: "Provide Internship (Priya Selvam)", credits: 30 },
      { date: "2026-08-03", action: "Hire PwD Candidate (Priya Selvam)", credits: 100 },
      { date: "2026-08-10", action: "Refer Another Employer (Pandian Exports)", credits: 50 },
    ],
    pwdEmployees: 3,
  },
  {
    id: "e-abc",
    name: "ABC Textiles",
    industry: "Textile Manufacturing",
    cluster: "Textile Cluster",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    employees: 180,
    founded: 2004,
    contact: { name: "S. Lakshmi", role: "HR Manager", email: "hr@abctextiles.in", phone: "+91 452 260 4410" },
    about: "Cotton garment manufacturer with export lines and a packing unit in Madurai SIDCO estate.",
    accessibility: [
      { name: "Building Entrance", status: "Good", relevantTo: ["travel"] },
      { name: "Ramp Availability", status: "Good", relevantTo: ["travel"] },
      { name: "Elevator", status: "Available", relevantTo: ["travel"] },
      { name: "Accessible Toilet", status: "Available", relevantTo: ["travel"] },
      { name: "Workspace Layout", status: "Good", relevantTo: ["standing", "repetitive_manual"] },
      { name: "Software Accessibility", status: "Needs Improvement", relevantTo: ["screen_use", "typing", "mouse"] },
      { name: "Communication Support", status: "Available", relevantTo: ["phone", "team_communication"] },
      { name: "Emergency Procedures", status: "Good", relevantTo: ["audio_alerts"] },
      { name: "Parking", status: "Good", relevantTo: ["travel"] },
      { name: "Transport Accessibility", status: "Available", relevantTo: ["travel"] },
      { name: "Accessible Workstation", status: "Good", relevantTo: ["standing", "typing"] },
      { name: "Digital Document Accessibility", status: "Needs Improvement", relevantTo: ["printed_documents"] },
      { name: "Visual and Audio Alerts", status: "Good", relevantTo: ["audio_alerts"] },
      { name: "Flexible Work Arrangements", status: "Available", relevantTo: ["travel"] },
    ],
    inclusion: { inclusiveHiring: 88, accessibility: 80, retention: 82, inclusiveRecruitment: 75, managerTraining: 80, employeeSupport: 78 },
    credits: [
      { date: "2026-02-10", action: "Complete Accessibility Audit", credits: 30 },
      { date: "2026-05-05", action: "Hire PwD Candidate", credits: 100 },
      { date: "2026-05-05", action: "Hire PwD Candidate", credits: 100 },
    ],
    pwdEmployees: 9,
  },
  {
    id: "e-hotel",
    name: "Hotel Nellai Grand",
    industry: "Hospitality",
    cluster: "Hospitality Cluster",
    city: "Tirunelveli",
    district: "Tirunelveli",
    state: "Tamil Nadu",
    employees: 65,
    founded: 2011,
    contact: { name: "P. Ganesan", role: "General Manager", email: "gm@nellaigrand.in", phone: "+91 462 233 7700" },
    about: "Mid-scale business hotel near Tirunelveli Junction with 48 rooms and a banquet hall.",
    accessibility: [
      { name: "Building Entrance", status: "Good", relevantTo: ["travel"] },
      { name: "Ramp Availability", status: "Good", relevantTo: ["travel"] },
      { name: "Elevator", status: "Good", relevantTo: ["travel"] },
      { name: "Accessible Toilet", status: "Available", relevantTo: ["travel"] },
      { name: "Workspace Layout", status: "Available", relevantTo: ["standing"] },
      { name: "Software Accessibility", status: "Available", relevantTo: ["screen_use"] },
      { name: "Communication Support", status: "Needs Improvement", relevantTo: ["phone", "team_communication", "verbal_communication"] },
      { name: "Emergency Procedures", status: "Available", relevantTo: ["audio_alerts"] },
      { name: "Parking", status: "Good", relevantTo: ["travel"] },
      { name: "Transport Accessibility", status: "Good", relevantTo: ["travel"] },
      { name: "Accessible Workstation", status: "Available", relevantTo: ["standing"] },
      { name: "Digital Document Accessibility", status: "Available", relevantTo: ["printed_documents"] },
      { name: "Visual and Audio Alerts", status: "Needs Improvement", relevantTo: ["audio_alerts"] },
      { name: "Flexible Work Arrangements", status: "Available", relevantTo: ["travel"] },
    ],
    inclusion: { inclusiveHiring: 60, accessibility: 74, retention: 70, inclusiveRecruitment: 55, managerTraining: 40, employeeSupport: 65 },
    credits: [{ date: "2026-04-01", action: "Complete Accessibility Audit", credits: 30 }],
    pwdEmployees: 1,
  },
  {
    id: "e-pandian",
    name: "Pandian Exports",
    industry: "Logistics & Warehousing",
    cluster: "Logistics Cluster",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    employees: 110,
    founded: 2009,
    contact: { name: "M. Pandian", role: "Director", email: "ops@pandianexports.in", phone: "+91 452 248 9021" },
    about: "Export packaging and dispatch warehouse serving textile and food processing units.",
    accessibility: [
      { name: "Building Entrance", status: "Available", relevantTo: ["travel"] },
      { name: "Ramp Availability", status: "Needs Improvement", relevantTo: ["travel"] },
      { name: "Elevator", status: "Not Available", relevantTo: ["travel"] },
      { name: "Accessible Toilet", status: "Needs Improvement", relevantTo: ["travel"] },
      { name: "Workspace Layout", status: "Available", relevantTo: ["standing", "repetitive_manual", "lifting"] },
      { name: "Software Accessibility", status: "Needs Improvement", relevantTo: ["screen_use"] },
      { name: "Communication Support", status: "Available", relevantTo: ["phone", "team_communication"] },
      { name: "Emergency Procedures", status: "Available", relevantTo: ["audio_alerts"] },
      { name: "Parking", status: "Good", relevantTo: ["travel"] },
      { name: "Transport Accessibility", status: "Needs Improvement", relevantTo: ["travel"] },
      { name: "Accessible Workstation", status: "Needs Improvement", relevantTo: ["standing", "lifting"] },
      { name: "Digital Document Accessibility", status: "Needs Improvement", relevantTo: ["printed_documents"] },
      { name: "Visual and Audio Alerts", status: "Available", relevantTo: ["audio_alerts"] },
      { name: "Flexible Work Arrangements", status: "Needs Improvement", relevantTo: ["travel"] },
    ],
    inclusion: { inclusiveHiring: 40, accessibility: 48, retention: 60, inclusiveRecruitment: 45, managerTraining: 20, employeeSupport: 50 },
    credits: [],
    pwdEmployees: 0,
  },
];

export const primaryEmployer = employers[0];

/* -------------------------------------------------------------------------- */
/*                                    Jobs                                    */
/* -------------------------------------------------------------------------- */

export const jobs: Job[] = [
  {
    id: "j-cse",
    title: "Customer Support Executive",
    employerId: "e-vaigai",
    location: "Madurai (KK Nagar) · Remote hub option via Nagercoil",
    district: "Madurai",
    salaryMin: 16000,
    salaryMax: 20000,
    employmentType: "Full-time",
    workMode: "Hybrid",
    workingHours: "9:30 AM – 6:30 PM, Mon–Sat (flexible start)",
    requiredSkills: [
      { name: "Customer Service", level: "Intermediate" },
      { name: "CRM Software", level: "Advanced" },
      { name: "MS Excel", level: "Intermediate" },
      { name: "Email Communication", level: "Intermediate" },
    ],
    experienceYears: 1,
    education: "Any graduate",
    description:
      "Handle inbound customer queries for a regional e-commerce client, record interactions in the CRM, and coordinate with the operations team for resolutions.",
    openings: 4,
    tasks: [
      {
        id: "t1",
        name: "Answer customer calls",
        classification: "Adaptable",
        requirements: ["phone", "verbal_communication"],
        physical: "Seated desk work",
        communication: "Voice, chat or captioned calls with customers in Tamil/English",
        technology: "Cloud telephony (Exotel) with chat channel",
        environment: "Open office or remote hub",
        whyEssential: "Customers must receive a response within SLA.",
        alternativeMethodPossible: true,
        alternativeMethodNote: "Chat and email queues carry 55% of volume; captioned calling is supported by the telephony vendor.",
        workstationChangePossible: true,
        reassignable: false,
        standard: "First response under 2 minutes; CSAT above 4.2/5",
        accommodationsAvailable: ["Text chat queue", "Captioned calling", "Relay service"],
        trainingProvided: "2-day product onboarding",
      },
      {
        id: "t2",
        name: "Use CRM software",
        classification: "Mandatory",
        requirements: ["screen_use", "typing"],
        physical: "Seated desk work",
        communication: "None",
        technology: "Freshdesk (WCAG 2.1 AA, keyboard navigable, screen-reader compatible)",
        environment: "Open office or remote hub",
        whyEssential: "All customer interactions must be tracked in the CRM.",
        alternativeMethodPossible: true,
        alternativeMethodNote: "Keyboard-only navigation and screen reader verified by the vendor.",
        workstationChangePossible: true,
        reassignable: false,
        standard: "Ticket logged for 100% of interactions",
        accommodationsAvailable: ["Keyboard navigation", "Screen reader", "Speech-to-text", "Screen magnification"],
      },
      {
        id: "t3",
        name: "Record customer information",
        classification: "Mandatory",
        requirements: ["typing", "screen_use"],
        physical: "Seated desk work",
        communication: "None",
        technology: "CRM forms and Excel trackers",
        environment: "Open office or remote hub",
        whyEssential: "Accurate records are required for resolution and billing.",
        alternativeMethodPossible: true,
        alternativeMethodNote: "Voice dictation and screen reader form verification are acceptable if accuracy standard is met.",
        workstationChangePossible: true,
        reassignable: false,
        standard: "98% data accuracy on weekly audit",
        accommodationsAvailable: ["Speech-to-text", "Screen reader", "Adaptive keyboard"],
      },
      {
        id: "t4",
        name: "Communicate with the team",
        classification: "Mandatory",
        requirements: ["team_communication"],
        physical: "None",
        communication: "Daily stand-up and escalation hand-offs",
        technology: "Microsoft Teams with live captions",
        environment: "Office or remote",
        whyEssential: "Escalations must reach the operations team the same day.",
        alternativeMethodPossible: true,
        alternativeMethodNote: "Text-based stand-up channel is already used by the remote team.",
        workstationChangePossible: true,
        reassignable: false,
        standard: "Escalations logged within 30 minutes",
        accommodationsAvailable: ["Text-based team channel", "Captioned meetings", "Written escalation template"],
      },
      {
        id: "t5",
        name: "Prepare weekly Excel summary",
        classification: "Optional",
        requirements: ["typing", "screen_use"],
        physical: "Seated desk work",
        communication: "None",
        technology: "MS Excel",
        environment: "Office or remote",
        whyEssential: "Nice-to-have; team lead can consolidate.",
        alternativeMethodPossible: true,
        workstationChangePossible: true,
        reassignable: true,
        standard: "Delivered by Saturday",
        accommodationsAvailable: ["Screen reader", "Template with named ranges"],
      },
    ],
    accommodationBudget: "Level A (₹0 – ₹5,000) pre-approved; Level B on request",
    accessibilityContact: "R. Karthik · karthik@vaigaiconnect.in",
    transport: { publicTransport: true, accessibleTransport: true, relocation: false },
    postedOn: "2026-07-01",
    status: "Published",
    tasksDefined: true,
  },
  {
    id: "j-deo",
    title: "Data Entry Operator",
    employerId: "e-abc",
    location: "Madurai (SIDCO Estate)",
    district: "Madurai",
    salaryMin: 13000,
    salaryMax: 16000,
    employmentType: "Full-time",
    workMode: "Onsite",
    workingHours: "9:00 AM – 5:30 PM, Mon–Sat",
    requiredSkills: [
      { name: "Data Entry", level: "Intermediate" },
      { name: "MS Excel", level: "Intermediate" },
      { name: "Tally", level: "Beginner" },
    ],
    experienceYears: 0,
    education: "12th pass or above",
    description: "Enter production and dispatch records into the ERP and maintain daily spreadsheets for the packing unit.",
    openings: 2,
    tasks: [
      { id: "t1", name: "Enter text into computer", classification: "Mandatory", requirements: ["typing", "screen_use"], physical: "Seated", communication: "None", technology: "ERP (web-based)", environment: "Office within factory", whyEssential: "Core output of the role", alternativeMethodPossible: true, alternativeMethodNote: "Voice dictation acceptable if accuracy is met", workstationChangePossible: true, reassignable: false, standard: "35 wpm equivalent, 98% accuracy", accommodationsAvailable: ["Speech-to-text", "Adaptive keyboard"] },
      { id: "t2", name: "Use spreadsheet software", classification: "Mandatory", requirements: ["typing", "screen_use", "mouse"], physical: "Seated", communication: "None", technology: "MS Excel", environment: "Office", whyEssential: "Daily production sheets", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "Sheets updated by 5 PM", accommodationsAvailable: ["Keyboard navigation", "Screen reader"] },
      { id: "t3", name: "Navigate between applications", classification: "Mandatory", requirements: ["mouse", "screen_use"], physical: "Seated", communication: "None", technology: "Windows desktop", environment: "Office", whyEssential: "ERP and Excel used together", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "N/A", accommodationsAvailable: ["Keyboard navigation", "Voice control"] },
      { id: "t4", name: "Review entered information", classification: "Mandatory", requirements: ["visual_monitoring", "screen_use"], physical: "Seated", communication: "None", technology: "ERP reports", environment: "Office", whyEssential: "Prevents dispatch errors", alternativeMethodPossible: true, alternativeMethodNote: "ERP report can be exported to accessible CSV", workstationChangePossible: true, reassignable: false, standard: "Zero critical errors per week", accommodationsAvailable: ["Screen magnification", "Accessible CSV export"] },
      { id: "t5", name: "Collect printed dispatch slips from packing floor", classification: "Adaptable", requirements: ["travel", "printed_documents"], physical: "Walk 80 m to packing floor twice daily", communication: "None", technology: "Paper slips", environment: "Factory floor", whyEssential: "Slips are the source record", alternativeMethodPossible: true, alternativeMethodNote: "Supervisor can photograph slips into shared drive", workstationChangePossible: true, reassignable: true, standard: "Slips processed same day", accommodationsAvailable: ["Digital slip capture", "Runner support"] },
    ],
    accommodationBudget: "Level A pre-approved",
    accessibilityContact: "S. Lakshmi · hr@abctextiles.in",
    transport: { publicTransport: true, accessibleTransport: false, relocation: false },
    postedOn: "2026-06-20",
    status: "Published",
    tasksDefined: true,
  },
  {
    id: "j-wh",
    title: "Warehouse Assistant",
    employerId: "e-pandian",
    location: "Madurai (Ring Road)",
    district: "Madurai",
    salaryMin: 12000,
    salaryMax: 15000,
    employmentType: "Full-time",
    workMode: "Onsite",
    workingHours: "Shift-based, 8 hours",
    requiredSkills: [
      { name: "Inventory Management", level: "Beginner" },
      { name: "Packaging", level: "Intermediate" },
    ],
    experienceYears: 0,
    education: "10th pass or above",
    description: "Scan, verify and move export cartons; update the inventory system after every dispatch.",
    openings: 6,
    tasks: [
      { id: "t1", name: "Scan products", classification: "Mandatory", requirements: ["repetitive_manual", "screen_use"], physical: "Standing, handheld scanner", communication: "None", technology: "Handheld barcode scanner", environment: "Warehouse floor", whyEssential: "Every carton must be scanned", alternativeMethodPossible: true, alternativeMethodNote: "Fixed scanner station possible", workstationChangePossible: true, reassignable: false, standard: "100% scan rate", accommodationsAvailable: ["Fixed scanner station", "Seated scanning bay"] },
      { id: "t2", name: "Move items", classification: "Adaptable", requirements: ["lifting", "standing"], liftKg: 10, physical: "Move cartons 10–20 m", communication: "None", technology: "Trolley available", environment: "Warehouse floor", whyEssential: "Cartons must reach dispatch bay", alternativeMethodPossible: true, alternativeMethodNote: "Trolley and pallet jack available for floor moves", workstationChangePossible: true, reassignable: true, standard: "Dispatch bay cleared each shift", accommodationsAvailable: ["Trolley", "Pallet jack", "Task rotation"] },
      { id: "t3", name: "Verify labels", classification: "Mandatory", requirements: ["visual_monitoring", "printed_documents"], physical: "Standing or seated", communication: "None", technology: "Printed labels", environment: "Warehouse", whyEssential: "Wrong labels cause export rejection", alternativeMethodPossible: false, alternativeMethodNote: "No barcode verification system currently installed", workstationChangePossible: true, reassignable: false, standard: "Zero label errors", accommodationsAvailable: [] },
      { id: "t4", name: "Update inventory", classification: "Mandatory", requirements: ["typing", "screen_use"], physical: "Seated", communication: "None", technology: "Inventory desktop app (not tested for accessibility)", environment: "Warehouse office", whyEssential: "Stock accuracy", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "Updated end of shift", accommodationsAvailable: ["Keyboard navigation"] },
      { id: "t5", name: "Lift up to 10 kg", classification: "Mandatory", requirements: ["lifting"], liftKg: 10, physical: "Lift cartons onto racks up to 1.5 m", communication: "None", technology: "None", environment: "Warehouse floor", whyEssential: "Racking above trolley height", alternativeMethodPossible: false, alternativeMethodNote: "Employer has not yet assessed lift-assist equipment", workstationChangePossible: false, reassignable: false, standard: "Safe manual handling procedure", accommodationsAvailable: [] },
    ],
    accommodationBudget: "Not yet defined",
    accessibilityContact: "M. Pandian · ops@pandianexports.in",
    transport: { publicTransport: true, accessibleTransport: false, relocation: false },
    postedOn: "2026-07-15",
    status: "Published",
    tasksDefined: true,
  },
  {
    id: "j-fo",
    title: "Front Office Support Associate",
    employerId: "e-hotel",
    location: "Tirunelveli Junction",
    district: "Tirunelveli",
    salaryMin: 14000,
    salaryMax: 17000,
    employmentType: "Full-time",
    workMode: "Onsite",
    workingHours: "Rotational shifts",
    requiredSkills: [
      { name: "Customer Service", level: "Intermediate" },
      { name: "Reservations Software", level: "Beginner" },
      { name: "Email Communication", level: "Intermediate" },
    ],
    experienceYears: 0,
    education: "Any graduate",
    description: "Manage reservations, guest check-in support and guest email correspondence.",
    openings: 2,
    tasks: [
      { id: "t1", name: "Handle reservation enquiries", classification: "Adaptable", requirements: ["phone", "verbal_communication"], physical: "Seated at front desk", communication: "Phone, email, WhatsApp", technology: "Hotel PMS + WhatsApp Business", environment: "Front desk", whyEssential: "Reservations drive occupancy", alternativeMethodPossible: true, alternativeMethodNote: "60% of enquiries arrive via WhatsApp/email", workstationChangePossible: true, reassignable: false, standard: "Reply within 15 minutes", accommodationsAvailable: ["Text chat", "Email queue"] },
      { id: "t2", name: "Update reservation system", classification: "Mandatory", requirements: ["typing", "screen_use", "mouse"], physical: "Seated", communication: "None", technology: "eZee PMS", environment: "Front desk", whyEssential: "Room inventory accuracy", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "No double bookings", accommodationsAvailable: ["Keyboard navigation"] },
      { id: "t3", name: "Greet walk-in guests", classification: "Adaptable", requirements: ["verbal_communication", "standing"], physical: "Stand at reception intermittently", communication: "Face-to-face in Tamil/English", technology: "None", environment: "Lobby", whyEssential: "Guest experience", alternativeMethodPossible: true, alternativeMethodNote: "Seated reception counter exists; written/visual greeting card supported", workstationChangePossible: true, reassignable: true, standard: "Guest acknowledged within 1 minute", accommodationsAvailable: ["Seated counter", "Communication card", "Colleague support"] },
      { id: "t4", name: "Respond to guest emails", classification: "Mandatory", requirements: ["typing", "screen_use"], physical: "Seated", communication: "Written English", technology: "Gmail", environment: "Front desk", whyEssential: "Corporate bookings", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "Reply within 2 hours", accommodationsAvailable: ["Speech-to-text", "Templates"] },
    ],
    accommodationBudget: "Level A pre-approved",
    accessibilityContact: "P. Ganesan · gm@nellaigrand.in",
    transport: { publicTransport: true, accessibleTransport: true, relocation: false },
    postedOn: "2026-07-08",
    status: "Published",
    tasksDefined: true,
  },
  {
    id: "j-qi",
    title: "Quality Inspector – Garments",
    employerId: "e-abc",
    location: "Madurai (SIDCO Estate)",
    district: "Madurai",
    salaryMin: 14000,
    salaryMax: 18000,
    employmentType: "Full-time",
    workMode: "Onsite",
    workingHours: "8:30 AM – 5:00 PM",
    requiredSkills: [
      { name: "Quality Inspection", level: "Intermediate" },
      { name: "Documentation", level: "Beginner" },
    ],
    experienceYears: 1,
    education: "ITI / Diploma",
    description: "Inspect finished garments against buyer specification and log defects.",
    openings: 3,
    tasks: [
      { id: "t1", name: "Inspect garments against spec sheet", classification: "Mandatory", requirements: ["visual_monitoring", "repetitive_manual"], physical: "Seated at inspection table", communication: "None", technology: "Measuring tape, spec sheet", environment: "Finishing floor", whyEssential: "Buyer AQL compliance", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "AQL 2.5", accommodationsAvailable: ["Adjustable inspection table", "Task lighting"] },
      { id: "t2", name: "Log defects in tablet app", classification: "Mandatory", requirements: ["typing", "screen_use"], physical: "Seated", communication: "None", technology: "Android tablet", environment: "Finishing floor", whyEssential: "Defect analytics", alternativeMethodPossible: true, workstationChangePossible: true, reassignable: false, standard: "All defects logged", accommodationsAvailable: ["Voice input", "Large-touch UI"] },
      { id: "t3", name: "Move inspected bundles to rack", classification: "Adaptable", requirements: ["lifting"], liftKg: 6, physical: "Lift bundles up to 6 kg", communication: "None", technology: "Trolley", environment: "Finishing floor", whyEssential: "Flow to packing", alternativeMethodPossible: true, alternativeMethodNote: "Helper collects bundles hourly", workstationChangePossible: true, reassignable: true, standard: "Bundles cleared hourly", accommodationsAvailable: ["Trolley", "Helper collection"] },
    ],
    accommodationBudget: "Level B (up to ₹25,000) approved",
    accessibilityContact: "S. Lakshmi · hr@abctextiles.in",
    transport: { publicTransport: true, accessibleTransport: false, relocation: false },
    postedOn: "2026-07-22",
    status: "Published",
    tasksDefined: true,
  },
  {
    id: "j-draft",
    title: "Back Office Associate",
    employerId: "e-vaigai",
    location: "Madurai",
    district: "Madurai",
    salaryMin: 15000,
    salaryMax: 18000,
    employmentType: "Full-time",
    workMode: "Remote",
    workingHours: "Flexible",
    requiredSkills: [{ name: "MS Excel", level: "Intermediate" }],
    experienceYears: 0,
    education: "Any graduate",
    description: "Draft – essential tasks not yet defined. Cannot be published as compatible until tasks are added.",
    openings: 2,
    tasks: [],
    accommodationBudget: "Level A",
    accessibilityContact: "R. Karthik",
    transport: { publicTransport: true, accessibleTransport: true, relocation: false },
    postedOn: "2026-08-20",
    status: "Draft",
    tasksDefined: false,
  },
];

export const primaryJob = jobs[0];

/* -------------------------------------------------------------------------- */
/*                                   Courses                                  */
/* -------------------------------------------------------------------------- */

export const courses: Course[] = [
  { id: "co-1", name: "Customer Support Foundations", category: "Digital Skills", provider: "3roots Skill Hub Nagercoil", duration: "4 weeks", mode: "Hybrid (hub + online)", difficulty: "Beginner", certification: "3roots Certified", skills: ["Customer Service", "CRM Software", "Email Communication"], jobOpportunities: ["Customer Support Executive", "Helpdesk Associate"], completion: 100, recommendedFor: "Job-Specific Assessment" },
  { id: "co-2", name: "Workplace Communication & Professional Etiquette", category: "Digital Skills", provider: "Enable India (online)", duration: "2 weeks", mode: "Online, captioned", difficulty: "Beginner", certification: "Certificate of Completion", skills: ["Communication", "Team Collaboration"], jobOpportunities: ["All roles"], completion: 60, recommendedFor: "Workplace Readiness" },
  { id: "co-3", name: "Freshdesk CRM Advanced (Screen-Reader Track)", category: "Digital Skills", provider: "Vaigai Connect + 3roots", duration: "1 week", mode: "Online", difficulty: "Intermediate", certification: "Vendor Badge", skills: ["CRM Software"], jobOpportunities: ["Customer Support Executive"], completion: 100, recommendedFor: "Technical Skills" },
  { id: "co-4", name: "Tally Prime with GST", category: "Business Skills", provider: "Madurai Skill Hub", duration: "6 weeks", mode: "Hub classroom", difficulty: "Intermediate", certification: "Tally Certified", skills: ["Tally", "GST Documentation", "Bookkeeping"], jobOpportunities: ["Accounts Assistant", "Data Entry Operator"], completion: 0 },
  { id: "co-5", name: "AI Data Annotation Essentials", category: "Digital Skills", provider: "iMerit Academy (online)", duration: "3 weeks", mode: "Online", difficulty: "Beginner", certification: "Certificate", skills: ["Data Annotation", "Attention to Detail"], jobOpportunities: ["Data Annotator (remote)"], completion: 0 },
  { id: "co-6", name: "Retail Billing & Inventory (Tally + POS)", category: "Retail", provider: "Tirunelveli Skill Hub", duration: "3 weeks", mode: "Hub classroom", difficulty: "Beginner", certification: "3roots Certified", skills: ["Billing", "Inventory Management", "Customer Service"], jobOpportunities: ["Billing Executive", "Store Associate"], completion: 0 },
  { id: "co-7", name: "Textile Quality Inspection", category: "Manufacturing", provider: "Madurai Textile Cluster", duration: "2 weeks", mode: "On-floor training", difficulty: "Intermediate", certification: "Cluster Certified", skills: ["Quality Inspection", "Documentation"], jobOpportunities: ["Quality Inspector"], completion: 0 },
  { id: "co-8", name: "Hotel Front Office & Reservations", category: "Hospitality", provider: "Tirunelveli Skill Hub", duration: "4 weeks", mode: "Hybrid", difficulty: "Beginner", certification: "3roots Certified", skills: ["Reservations Software", "Customer Service"], jobOpportunities: ["Front Office Support"], completion: 0 },
  { id: "co-9", name: "Digital Marketing for Local Business", category: "Digital Skills", provider: "Google + 3roots", duration: "5 weeks", mode: "Online", difficulty: "Intermediate", certification: "Google Certificate", skills: ["Digital Marketing", "Content Writing"], jobOpportunities: ["Digital Marketing Executive"], completion: 0 },
  { id: "co-10", name: "Software Testing Fundamentals", category: "Digital Skills", provider: "Enable India (online)", duration: "6 weeks", mode: "Online", difficulty: "Intermediate", certification: "ISTQB Prep", skills: ["Software Testing", "Documentation"], jobOpportunities: ["QA Tester (remote)"], completion: 0 },
];

export const trainingCategories = [
  { name: "Digital Skills", items: ["Data Entry", "Web Development", "Software Testing", "Digital Marketing", "Graphic Design", "AI Data Annotation", "Customer Support", "Microsoft Office", "Excel", "Accounting Software"] },
  { name: "Business Skills", items: ["Tally", "GST Documentation", "Bookkeeping", "Payroll", "Office Administration"] },
  { name: "Retail", items: ["Billing", "Inventory Management", "Customer Service", "E-commerce Operations"] },
  { name: "Manufacturing", items: ["Quality Inspection", "Packaging", "Documentation", "Machine Monitoring"] },
  { name: "Hospitality", items: ["Reservations", "Customer Service", "Front Office Support", "Back Office Operations"] },
];

/* -------------------------------------------------------------------------- */
/*                                 Marketplace                                */
/* -------------------------------------------------------------------------- */

export const marketplace: MarketplaceProvider[] = [
  { id: "m-1", provider: "Freedom Scientific (via Karishma Enterprises)", product: "JAWS Screen Reader – Annual Licence", category: "Screen Readers", location: "Chennai", cost: "₹0 (NVDA) – ₹18,000 (JAWS)", costLevel: "B", rating: 4.8, contact: "sales@karishma-at.in", cities: ["Chennai", "Madurai", "Coimbatore"], supportedTasks: ["Use CRM software", "Record customer information", "Review entered information"], setupTime: "1 day", trainingSupport: true },
  { id: "m-2", provider: "Exotel", product: "Captioned Calling + Chat Queue Add-on", category: "Captioning and Relay Services", location: "Bangalore (remote setup)", cost: "₹1,200 / agent / month", costLevel: "A", rating: 4.6, contact: "support@exotel.com", cities: ["All India"], supportedTasks: ["Answer customer calls", "Handle reservation enquiries"], setupTime: "2 hours", trainingSupport: true },
  { id: "m-3", provider: "Nuance (Dragon India Partner)", product: "Dragon Professional Speech-to-Text", category: "Speech-to-Text Software", location: "Chennai", cost: "₹22,000 one-time", costLevel: "B", rating: 4.5, contact: "dragon@voiceindia.in", cities: ["Chennai", "Madurai"], supportedTasks: ["Enter text into computer", "Record customer information", "Respond to guest emails"], setupTime: "1 day", trainingSupport: true },
  { id: "m-4", provider: "Godrej Interio", product: "Height-Adjustable Accessible Desk", category: "Accessible Desks", location: "Madurai", cost: "₹14,500", costLevel: "B", rating: 4.4, contact: "madurai@godrejinterio.com", cities: ["Madurai", "Tirunelveli", "Nagercoil"], supportedTasks: ["Use spreadsheet software", "Update inventory"], setupTime: "3 days", trainingSupport: false },
  { id: "m-5", provider: "Ramp India", product: "Portable Aluminium Ramp (up to 3 steps)", category: "Ramps", location: "Coimbatore", cost: "₹8,000 – ₹15,000", costLevel: "B", rating: 4.3, contact: "orders@rampindia.in", cities: ["All Tamil Nadu"], supportedTasks: ["Building entrance access"], setupTime: "1 day", trainingSupport: false },
  { id: "m-6", provider: "Braille Bharati", product: "Braille + Tactile Signage Kit", category: "Braille Signage", location: "Madurai", cost: "₹3,500 per kit", costLevel: "A", rating: 4.7, contact: "hello@braillebharati.org", cities: ["Madurai", "Trichy"], supportedTasks: ["Wayfinding", "Emergency exits"], setupTime: "2 days", trainingSupport: false },
  { id: "m-7", provider: "Ergoworks", product: "Ergonomic Keyboard + Vertical Mouse Set", category: "Ergonomic Equipment", location: "Chennai", cost: "₹4,200", costLevel: "A", rating: 4.2, contact: "sales@ergoworks.in", cities: ["All India (courier)"], supportedTasks: ["Enter text into computer", "Use spreadsheet software"], setupTime: "Same day", trainingSupport: false },
  { id: "m-8", provider: "Indian Sign Language Interpreters Collective", product: "ISL Interpreter – On-demand (video/in-person)", category: "Sign Language Support", location: "Madurai / Tirunelveli", cost: "₹800 / hour", costLevel: "A", rating: 4.9, contact: "book@islcollective.in", cities: ["Madurai", "Tirunelveli", "Chennai"], supportedTasks: ["Interviews", "Team meetings", "Training sessions"], setupTime: "24 hours notice", trainingSupport: true },
  { id: "m-9", provider: "Tobii Dynavox (via Adaptive India)", product: "PCEye Eye-Tracking Device", category: "Eye-Tracking Devices", location: "Bangalore", cost: "₹1,10,000", costLevel: "C", rating: 4.6, contact: "info@adaptiveindia.in", cities: ["Bangalore", "Chennai"], supportedTasks: ["Navigate between applications", "Enter text into computer"], setupTime: "1 week", trainingSupport: true },
  { id: "m-10", provider: "Clevy India", product: "Large-Key Adaptive Keyboard", category: "Adaptive Keyboards", location: "Chennai", cost: "₹6,500", costLevel: "B", rating: 4.1, contact: "orders@clevy.in", cities: ["All India (courier)"], supportedTasks: ["Enter text into computer", "Record customer information"], setupTime: "Same day", trainingSupport: false },
  { id: "m-11", provider: "Kinesis (via Assistive Tech Foundation)", product: "Savant Elite Foot Pedal Input", category: "Foot-Operated Input Devices", location: "Chennai", cost: "₹9,800", costLevel: "B", rating: 4.0, contact: "atf@assistivetech.org.in", cities: ["Chennai", "Madurai"], supportedTasks: ["Navigate between applications"], setupTime: "2 days", trainingSupport: true },
  { id: "m-12", provider: "Microsoft Seeing AI / Envision", product: "OCR & Document Accessibility Setup", category: "OCR and Document Accessibility Tools", location: "Remote", cost: "₹0 – ₹2,500", costLevel: "A", rating: 4.7, contact: "3roots Accessibility Desk", cities: ["All India"], supportedTasks: ["Verify labels", "Collect printed dispatch slips", "Review entered information"], setupTime: "Same day", trainingSupport: true },
  { id: "m-13", provider: "Phonak India", product: "Roger On Hearing Assistance Microphone", category: "Hearing Assistance", location: "Madurai", cost: "₹24,000", costLevel: "B", rating: 4.5, contact: "madurai@phonak.in", cities: ["Madurai", "Tirunelveli"], supportedTasks: ["Communicate with the team", "Greet walk-in guests"], setupTime: "1 day", trainingSupport: true },
  { id: "m-14", provider: "Safety Alert Systems", product: "Visual + Vibration Emergency Alert Kit", category: "Hearing Assistance", location: "Coimbatore", cost: "₹12,000 per floor", costLevel: "B", rating: 4.3, contact: "info@safetyalert.in", cities: ["All Tamil Nadu"], supportedTasks: ["Emergency procedures", "Machine monitoring"], setupTime: "2 days", trainingSupport: false },
];

/* -------------------------------------------------------------------------- */
/*                            Accommodation catalogue                         */
/* -------------------------------------------------------------------------- */

export interface AccommodationOption {
  name: string;
  costLevel: "A" | "B" | "C";
  estimatedCost: string;
  implementationTime: string;
  duration: "Ongoing" | "Temporary" | "One-time";
  productivityImpact: string;
  /** Functional keys on the candidate that make this option workable */
  enabledBy: (keyof FunctionalAbilities)[];
  marketplaceIds: string[];
}

export const accommodationCatalogue: Record<RequirementType, { label: string; options: AccommodationOption[] }> = {
  typing: {
    label: "Manual typing required",
    options: [
      { name: "Speech-to-text software", costLevel: "B", estimatedCost: "₹0 – ₹22,000", implementationTime: "1 day", duration: "Ongoing", productivityImpact: "Comparable output; accuracy verified in trial", enabledBy: ["voiceInput"], marketplaceIds: ["m-3"] },
      { name: "Screen reader with keyboard-only entry", costLevel: "A", estimatedCost: "₹0 (NVDA)", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "No impact when software is accessible", enabledBy: ["screenReader", "keyboard"], marketplaceIds: ["m-1"] },
      { name: "Eye-tracking input", costLevel: "C", estimatedCost: "₹1,10,000", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "Slower for long text; suitable for form entry", enabledBy: ["eyeTracking"], marketplaceIds: ["m-9"] },
      { name: "Adaptive keyboard", costLevel: "B", estimatedCost: "₹6,500", implementationTime: "Same day", duration: "One-time", productivityImpact: "Minimal", enabledBy: ["keyboard"], marketplaceIds: ["m-10"] },
      { name: "Foot-operated input", costLevel: "B", estimatedCost: "₹9,800", implementationTime: "2 days", duration: "Ongoing", productivityImpact: "Best combined with voice input", enabledBy: ["footInput"], marketplaceIds: ["m-11"] },
    ],
  },
  mouse: {
    label: "Mouse usage required",
    options: [
      { name: "Keyboard navigation", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "Often faster for repetitive tasks", enabledBy: ["keyboard"], marketplaceIds: [] },
      { name: "Voice control", costLevel: "A", estimatedCost: "₹0 – ₹22,000", implementationTime: "1 day", duration: "Ongoing", productivityImpact: "Minimal", enabledBy: ["voiceInput"], marketplaceIds: ["m-3"] },
      { name: "Head-controlled or eye-tracking mouse", costLevel: "C", estimatedCost: "₹35,000 – ₹1,10,000", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "Minimal after training", enabledBy: ["eyeTracking"], marketplaceIds: ["m-9"] },
    ],
  },
  phone: {
    label: "Phone communication required",
    options: [
      { name: "Text chat queue", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "Chat agents typically handle 2–3 concurrent conversations", enabledBy: ["textCommunication"], marketplaceIds: ["m-2"] },
      { name: "Captioned calling", costLevel: "A", estimatedCost: "₹1,200 / month", implementationTime: "2 hours", duration: "Ongoing", productivityImpact: "Comparable handle time", enabledBy: ["textCommunication", "verbalCommunication"], marketplaceIds: ["m-2"] },
      { name: "Relay service", costLevel: "A", estimatedCost: "₹0 – ₹2,000 / month", implementationTime: "1 day", duration: "Ongoing", productivityImpact: "Slightly longer handle time", enabledBy: ["textCommunication"], marketplaceIds: ["m-2"] },
    ],
  },
  standing: {
    label: "Standing required",
    options: [
      { name: "Seated workstation if task permits", costLevel: "A", estimatedCost: "₹0 – ₹14,500", implementationTime: "1–3 days", duration: "One-time", productivityImpact: "None for desk-based tasks", enabledBy: ["sitLong"], marketplaceIds: ["m-4"] },
    ],
  },
  printed_documents: {
    label: "Printed documents required",
    options: [
      { name: "Screen reader / OCR / digital documents", costLevel: "A", estimatedCost: "₹0 – ₹2,500", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None when documents are provided digitally", enabledBy: ["screenReader", "keyboard", "voiceInput"], marketplaceIds: ["m-12"] },
    ],
  },
  visual_monitoring: {
    label: "Visual monitoring required",
    options: [
      { name: "Accessible software alerts", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["screenReader", "hearingAssistance", "keyboard"], marketplaceIds: [] },
      { name: "Screen magnification", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["keyboard", "mouse"], marketplaceIds: [] },
      { name: "Audio notifications", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["screenReader"], marketplaceIds: [] },
    ],
  },
  audio_alerts: {
    label: "Hearing-dependent alerts required",
    options: [
      { name: "Visual alerts", costLevel: "B", estimatedCost: "₹12,000 per floor", implementationTime: "2 days", duration: "One-time", productivityImpact: "None", enabledBy: ["textCommunication", "hearingAssistance"], marketplaceIds: ["m-14"] },
      { name: "Vibration alerts", costLevel: "A", estimatedCost: "₹2,000", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["hearingAssistance", "textCommunication"], marketplaceIds: ["m-14"] },
      { name: "Text notifications", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["textCommunication"], marketplaceIds: [] },
    ],
  },
  travel: {
    label: "Travel between locations required",
    options: [
      { name: "Remote work option where feasible", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None for digital tasks", enabledBy: ["remoteWork"], marketplaceIds: [] },
      { name: "Accessible transport", costLevel: "A", estimatedCost: "₹1,500 – ₹4,000 / month", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "None", enabledBy: ["travelIndependently", "personalAssistance"], marketplaceIds: [] },
      { name: "Adjusted route or schedule", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["travelIndependently"], marketplaceIds: [] },
    ],
  },
  repetitive_manual: {
    label: "Repetitive manual movement required",
    options: [
      { name: "Ergonomic equipment", costLevel: "A", estimatedCost: "₹4,200", implementationTime: "Same day", duration: "One-time", productivityImpact: "Reduces fatigue", enabledBy: ["repetitiveMovement", "keyboard"], marketplaceIds: ["m-7"] },
      { name: "Task rotation", costLevel: "A", estimatedCost: "₹0", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "Neutral across team", enabledBy: ["sitLong", "standLong"], marketplaceIds: [] },
      { name: "Modified workflow", costLevel: "A", estimatedCost: "₹0", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "Assessed in trial", enabledBy: ["voiceInput", "keyboard"], marketplaceIds: [] },
    ],
  },
  lifting: {
    label: "Lifting required",
    options: [
      { name: "Trolley / pallet jack / lift-assist", costLevel: "B", estimatedCost: "₹6,000 – ₹25,000", implementationTime: "3 days", duration: "One-time", productivityImpact: "Often faster for bulk moves", enabledBy: ["standLong", "travelIndependently"], marketplaceIds: [] },
      { name: "Task rotation or reassignment", costLevel: "A", estimatedCost: "₹0", implementationTime: "1 week", duration: "Ongoing", productivityImpact: "Neutral across team", enabledBy: ["standLong", "sitLong"], marketplaceIds: [] },
    ],
  },
  verbal_communication: {
    label: "Verbal communication required",
    options: [
      { name: "Text chat or email channel", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["textCommunication"], marketplaceIds: [] },
      { name: "Captioned calls / video", costLevel: "A", estimatedCost: "₹0 – ₹1,200 / month", implementationTime: "2 hours", duration: "Ongoing", productivityImpact: "None", enabledBy: ["textCommunication", "hearingAssistance"], marketplaceIds: ["m-2"] },
      { name: "Sign language interpreter for key meetings", costLevel: "A", estimatedCost: "₹800 / hour", implementationTime: "24 hours", duration: "Temporary", productivityImpact: "None", enabledBy: ["textCommunication"], marketplaceIds: ["m-8"] },
    ],
  },
  screen_use: {
    label: "Screen-based software required",
    options: [
      { name: "Screen reader compatible software + keyboard navigation", costLevel: "A", estimatedCost: "₹0 – ₹18,000", implementationTime: "1 day", duration: "Ongoing", productivityImpact: "None when software meets WCAG AA", enabledBy: ["screenReader", "keyboard"], marketplaceIds: ["m-1"] },
      { name: "Voice control", costLevel: "B", estimatedCost: "₹22,000", implementationTime: "1 day", duration: "Ongoing", productivityImpact: "Minimal", enabledBy: ["voiceInput"], marketplaceIds: ["m-3"] },
      { name: "Screen magnification / high contrast", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["keyboard", "mouse"], marketplaceIds: [] },
    ],
  },
  team_communication: {
    label: "Team communication required",
    options: [
      { name: "Text-based team channel", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["textCommunication"], marketplaceIds: [] },
      { name: "Captioned meetings", costLevel: "A", estimatedCost: "₹0", implementationTime: "Same day", duration: "Ongoing", productivityImpact: "None", enabledBy: ["textCommunication", "hearingAssistance", "verbalCommunication"], marketplaceIds: [] },
      { name: "ISL interpreter for key meetings", costLevel: "A", estimatedCost: "₹800 / hour", implementationTime: "24 hours", duration: "Temporary", productivityImpact: "None", enabledBy: ["textCommunication"], marketplaceIds: ["m-8"] },
    ],
  },
};

export const costLevels = [
  { level: "A", range: "₹0 – ₹5,000", examples: ["Flexible Work Timing", "Work From Home", "Desk Arrangement", "Software Settings", "Keyboard Navigation", "Communication Changes", "Text Alerts", "Captioned Meetings"] },
  { level: "B", range: "₹5,000 – ₹25,000", examples: ["Accessible Desk", "Signage", "Basic Ramp", "Ergonomic Equipment", "Hearing Assistance", "Adaptive Keyboard", "Alternative Input Devices"] },
  { level: "C", range: "₹25,000+", examples: ["Structural Changes", "Major Ramp Construction", "Accessible Restroom Modification", "Elevator Modification", "Major Workplace Redesign"] },
];

/* -------------------------------------------------------------------------- */
/*                                    Hubs                                    */
/* -------------------------------------------------------------------------- */

export const hubs: Hub[] = [
  { id: "hub-madurai", name: "Madurai Inclusive Employment Hub", city: "Madurai", district: "Madurai", state: "Tamil Nadu", partner: "Thiagarajar Polytechnic + Madurai Chamber of Commerce", partnerType: "Polytechnic College + Business Association", coordinator: "V. Anitha", contact: "madurai@3roots.in · +91 452 431 0021", candidates: 420, employers: 72, placed: 138, trainingPrograms: ["Tally Prime with GST", "Textile Quality Inspection", "Retail Billing", "Customer Support Foundations"], upcomingDrives: ["Madurai Inclusive Hiring Drive – 20 Sep 2026", "Textile Cluster Walk-in – 5 Oct 2026"], remoteHub: true },
  { id: "hub-tirunelveli", name: "Tirunelveli Skill & Employment Hub", city: "Tirunelveli", district: "Tirunelveli", state: "Tamil Nadu", partner: "Sarah Tucker College + Nellai NGO Forum", partnerType: "College + NGO", coordinator: "J. Solomon", contact: "tirunelveli@3roots.in · +91 462 250 8811", candidates: 310, employers: 46, placed: 92, trainingPrograms: ["Hotel Front Office", "Retail Billing & Inventory", "Workplace Communication"], upcomingDrives: ["Hospitality Cluster Drive – 28 Sep 2026"], remoteHub: true },
  { id: "hub-nagercoil", name: "Nagercoil Remote Work Hub", city: "Nagercoil", district: "Kanyakumari", state: "Tamil Nadu", partner: "Scott Christian College + Kanyakumari Rehabilitation Centre", partnerType: "College + Rehabilitation Centre + Coworking", coordinator: "S. Beulah", contact: "nagercoil@3roots.in · +91 4652 27 6640", candidates: 270, employers: 32, placed: 70, trainingPrograms: ["Customer Support Foundations", "AI Data Annotation", "Digital Marketing"], upcomingDrives: ["Remote Roles Virtual Drive (Chennai/Bangalore employers) – 12 Oct 2026"], remoteHub: true },
];

export const hubTeamRoles = ["Employment Coordinator", "Skill Trainer", "Employer Relationship Manager", "Accessibility Partner"];

export const clusters = [
  { name: "Textile Cluster", city: "Madurai", companies: 22, jobs: 94, candidates: 160 },
  { name: "IT Services Cluster", city: "Madurai / Remote", companies: 18, jobs: 76, candidates: 210 },
  { name: "Retail Cluster", city: "Madurai / Tirunelveli", companies: 31, jobs: 120, candidates: 180 },
  { name: "Hospitality Cluster", city: "Tirunelveli", companies: 14, jobs: 48, candidates: 95 },
  { name: "Manufacturing Cluster", city: "Madurai", companies: 20, jobs: 82, candidates: 130 },
  { name: "Healthcare Cluster", city: "Nagercoil", companies: 12, jobs: 36, candidates: 60 },
  { name: "Logistics Cluster", city: "Madurai", companies: 9, jobs: 44, candidates: 55 },
];

export const hiringDrives = [
  { name: "Madurai Inclusive Hiring Drive", date: "20 Sep 2026", companies: 50, jobs: 100, candidates: 200, location: "Thiagarajar Polytechnic, Madurai" },
  { name: "Hospitality Cluster Drive", date: "28 Sep 2026", companies: 14, jobs: 40, candidates: 90, location: "Hotel Nellai Grand, Tirunelveli" },
  { name: "Remote Roles Virtual Drive", date: "12 Oct 2026", companies: 25, jobs: 60, candidates: 150, location: "Nagercoil Remote Work Hub (virtual)" },
];

export const remoteHubCities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi"];

/* -------------------------------------------------------------------------- */
/*                         Applications / internships / etc                   */
/* -------------------------------------------------------------------------- */

export type ApplicationStatus = "Applied" | "Shortlisted" | "Interview Scheduled" | "Internship Offered" | "Interning" | "Offered" | "Hired" | "On Hold" | "Requires Accessibility Review" | "Not Selected";

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedOn: string;
  timeline: { date: string; event: string }[];
}

export const applications: Application[] = [
  {
    id: "a-1",
    candidateId: "c-priya",
    jobId: "j-cse",
    status: "Hired",
    appliedOn: "2026-07-03",
    timeline: [
      { date: "2026-07-03", event: "Applied · AI match 94% · Compatible With Accommodation" },
      { date: "2026-07-05", event: "Employer shortlisted after reviewing accommodation options" },
      { date: "2026-07-06", event: "Candidate submitted 'How I can perform this job' explanation" },
      { date: "2026-07-09", event: "Accessible online interview (captioned) · Selected" },
      { date: "2026-07-14", event: "2-week micro-internship started" },
      { date: "2026-07-28", event: "Internship evaluation: 4.6 / 5 · Converted to employee" },
      { date: "2026-08-03", event: "Employment offer accepted · Joining 4 Aug 2026" },
      { date: "2026-09-03", event: "Day-30 retention review completed" },
    ],
  },
  { id: "a-2", candidateId: "c-priya", jobId: "j-deo", status: "On Hold", appliedOn: "2026-06-25", timeline: [{ date: "2026-06-25", event: "Applied · Match 71%" }, { date: "2026-06-28", event: "Employer paused hiring for this role" }] },
  { id: "a-3", candidateId: "c-arun", jobId: "j-deo", status: "Interview Scheduled", appliedOn: "2026-08-22", timeline: [{ date: "2026-08-22", event: "Applied · Match 91%" }, { date: "2026-08-26", event: "Shortlisted" }, { date: "2026-09-05", event: "Interview scheduled (onsite, step-free access confirmed)" }] },
  { id: "a-4", candidateId: "c-meena", jobId: "j-fo", status: "Interning", appliedOn: "2026-08-01", timeline: [{ date: "2026-08-01", event: "Applied · Match 88%" }, { date: "2026-08-18", event: "3-week internship started" }] },
  { id: "a-5", candidateId: "c-suresh", jobId: "j-wh", status: "Requires Accessibility Review", appliedOn: "2026-08-10", timeline: [{ date: "2026-08-10", event: "Applied · Match 74%" }, { date: "2026-08-11", event: "Task 'Lift up to 10 kg' referred for accessibility expert review" }] },
  { id: "a-6", candidateId: "c-meena", jobId: "j-cse", status: "Shortlisted", appliedOn: "2026-08-25", timeline: [{ date: "2026-08-25", event: "Applied · Match 89%" }, { date: "2026-08-29", event: "Shortlisted" }] },
  { id: "a-7", candidateId: "c-kavitha", jobId: "j-cse", status: "Applied", appliedOn: "2026-08-30", timeline: [{ date: "2026-08-30", event: "Applied · Match 82%" }] },
  { id: "a-8", candidateId: "c-suresh", jobId: "j-qi", status: "Shortlisted", appliedOn: "2026-08-12", timeline: [{ date: "2026-08-12", event: "Applied · Match 93%" }, { date: "2026-08-15", event: "Shortlisted" }] },
];

export interface Internship {
  id: string;
  candidateId: string;
  employerId: string;
  jobId: string;
  title: string;
  start: string;
  end: string;
  weeks: number;
  status: "Assigned" | "In Progress" | "Completed" | "Converted";
  tasks: { name: string; status: "Done" | "In Progress" | "Pending"; rating?: number }[];
  evaluation?: {
    skillPerformance: number;
    attendance: number;
    communication: number;
    taskCompletion: number;
    workplaceAdaptation: number;
    accommodationEffectiveness: number;
    essentialTaskWithSupport: number;
    notes: string;
  };
}

export const internships: Internship[] = [
  {
    id: "i-1",
    candidateId: "c-priya",
    employerId: "e-vaigai",
    jobId: "j-cse",
    title: "Customer Support Trial – E-commerce queue",
    start: "2026-07-14",
    end: "2026-07-28",
    weeks: 2,
    status: "Converted",
    tasks: [
      { name: "Handle 40 chat tickets in Freshdesk", status: "Done", rating: 5 },
      { name: "Take 20 captioned calls", status: "Done", rating: 4 },
      { name: "Record 60 customer records with 98% accuracy", status: "Done", rating: 5 },
      { name: "Post daily stand-up update in Teams channel", status: "Done", rating: 5 },
    ],
    evaluation: { skillPerformance: 4.7, attendance: 5, communication: 4.3, taskCompletion: 4.8, workplaceAdaptation: 4.5, accommodationEffectiveness: 4.8, essentialTaskWithSupport: 4.7, notes: "Priya's CRM accuracy (99.1%) exceeded the team average. Captioned calling worked well; recommend adding a second chat licence. Converted to full-time." },
  },
  {
    id: "i-2",
    candidateId: "c-meena",
    employerId: "e-hotel",
    jobId: "j-fo",
    title: "Front Office Trial – Reservations desk",
    start: "2026-08-18",
    end: "2026-09-08",
    weeks: 3,
    status: "In Progress",
    tasks: [
      { name: "Respond to 50 WhatsApp reservation enquiries", status: "Done", rating: 5 },
      { name: "Update PMS for 30 bookings", status: "In Progress" },
      { name: "Shadow check-in for 5 shifts", status: "Pending" },
    ],
  },
  {
    id: "i-3",
    candidateId: "c-arun",
    employerId: "e-vaigai",
    jobId: "j-draft",
    title: "Back Office Trial – Excel reconciliation",
    start: "2026-06-01",
    end: "2026-06-14",
    weeks: 2,
    status: "Completed",
    tasks: [{ name: "Reconcile 3 client invoices", status: "Done", rating: 4 }],
    evaluation: { skillPerformance: 4.2, attendance: 4.8, communication: 3.9, taskCompletion: 4.4, workplaceAdaptation: 4.0, accommodationEffectiveness: 4.5, essentialTaskWithSupport: 4.3, notes: "Reliable and accurate. Ramp installed before start; accessible toilet confirmed." },
  },
];

export interface EmploymentRecord {
  id: string;
  candidateId: string;
  employerId: string;
  jobId: string;
  role: string;
  salary: number;
  joiningDate: string;
  workMode: WorkMode;
  essentialTasks: string[];
  accessibilityProvided: string[];
  accommodationProvided: string[];
  assistiveTechProvided: string[];
  status: "Active" | "Resigned" | "Terminated" | "Completed" | "On Leave";
  retention: RetentionCheck[];
}

export interface RetentionCheck {
  checkpoint: "Day 7" | "Day 30" | "Day 90" | "6 Months" | "12 Months";
  date: string;
  status: "Completed" | "Due" | "Upcoming";
  candidateFeedback?: string;
  employerFeedback?: string;
  workplaceIssues?: string;
  accessibilityProblems?: string;
  performanceRating?: number;
  jobSatisfaction?: number;
  supportRequired?: string;
  accommodationEffectiveness?: number;
  essentialTaskCompletion?: number;
  environmentChanges?: string;
}

export const employmentRecords: EmploymentRecord[] = [
  {
    id: "emp-1",
    candidateId: "c-priya",
    employerId: "e-vaigai",
    jobId: "j-cse",
    role: "Customer Support Executive",
    salary: 18400,
    joiningDate: "2026-08-04",
    workMode: "Hybrid",
    essentialTasks: ["Answer customer calls", "Use CRM software", "Record customer information", "Communicate with the team"],
    accessibilityProvided: ["Screen-reader compatible CRM", "Keyboard navigation", "Digital documents"],
    accommodationProvided: ["Chat + captioned call queue", "Text-based stand-up channel", "Remote hub days (Nagercoil) 3× per week"],
    assistiveTechProvided: ["JAWS licence (Level B, ₹18,000)", "Exotel captioned calling add-on (Level A)"],
    status: "Active",
    retention: [
      { checkpoint: "Day 7", date: "2026-08-11", status: "Completed", candidateFeedback: "Onboarding was accessible; Teams captions worked from day one.", employerFeedback: "Settled in quickly; CRM logging accurate.", workplaceIssues: "None", accessibilityProblems: "One PDF SOP was not tagged; fixed by day 3.", performanceRating: 4.4, jobSatisfaction: 4.5, supportRequired: "None", accommodationEffectiveness: 4.6, essentialTaskCompletion: 100, environmentChanges: "None" },
      { checkpoint: "Day 30", date: "2026-09-03", status: "Completed", candidateFeedback: "Comfortable with chat queue; would like more captioned call practice.", employerFeedback: "CSAT 4.5/5; escalations always logged in time.", workplaceIssues: "None", accessibilityProblems: "Emergency alert on remote hub floor is audio-only for other staff; visual alert requested.", performanceRating: 4.6, jobSatisfaction: 4.6, supportRequired: "Second chat licence", accommodationEffectiveness: 4.7, essentialTaskCompletion: 100, environmentChanges: "Visual alert kit ordered for hub" },
      { checkpoint: "Day 90", date: "2026-11-02", status: "Upcoming" },
      { checkpoint: "6 Months", date: "2027-02-04", status: "Upcoming" },
      { checkpoint: "12 Months", date: "2027-08-04", status: "Upcoming" },
    ],
  },
  {
    id: "emp-2",
    candidateId: "c-arun",
    employerId: "e-abc",
    jobId: "j-deo",
    role: "Accounts Assistant (Tally)",
    salary: 16500,
    joiningDate: "2026-05-05",
    workMode: "Onsite",
    essentialTasks: ["Enter production records", "Maintain GST ledgers"],
    accessibilityProvided: ["Step-free entrance", "Accessible toilet", "Reserved parking"],
    accommodationProvided: ["Adjustable desk", "Flexible start time"],
    assistiveTechProvided: ["Height-adjustable desk (Level B, ₹14,500)"],
    status: "Active",
    retention: [
      { checkpoint: "Day 7", date: "2026-05-12", status: "Completed", performanceRating: 4.2, jobSatisfaction: 4.3, accommodationEffectiveness: 4.5, essentialTaskCompletion: 100 },
      { checkpoint: "Day 30", date: "2026-06-04", status: "Completed", performanceRating: 4.4, jobSatisfaction: 4.4, accommodationEffectiveness: 4.5, essentialTaskCompletion: 100 },
      { checkpoint: "Day 90", date: "2026-08-03", status: "Completed", performanceRating: 4.5, jobSatisfaction: 4.2, accommodationEffectiveness: 4.4, essentialTaskCompletion: 100, workplaceIssues: "Requested transport allowance for monsoon months", supportRequired: "Accessible auto arrangement" },
      { checkpoint: "6 Months", date: "2026-11-05", status: "Upcoming" },
      { checkpoint: "12 Months", date: "2027-05-05", status: "Upcoming" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                           Human review / task explanations                 */
/* -------------------------------------------------------------------------- */

export interface ReviewCase {
  id: string;
  candidateId: string;
  jobId: string;
  taskName: string;
  status: "Open" | "Awaiting Employer" | "Expert Assigned" | "Resolved";
  candidateMethod: string;
  optionsConsidered: string[];
  employerResponse?: string;
  expertRecommendation?: string;
  finalDecision?: string;
  reason?: string;
  openedOn: string;
}

export const reviewCases: ReviewCase[] = [
  {
    id: "r-1",
    candidateId: "c-suresh",
    jobId: "j-wh",
    taskName: "Lift up to 10 kg",
    status: "Expert Assigned",
    candidateMethod: "I use a trolley and adaptive grip for loads above 8 kg. At Pandian Exports' packing line I handled 12 kg cartons with a two-step lift using the rack-side platform, at line speed, for 2 years without incident.",
    optionsConsidered: ["Trolley / pallet jack", "Lift-assist arm at rack", "Task rotation with 2nd assistant"],
    employerResponse: "Racking above 1.2 m currently requires manual lift; open to lift-assist if cost is Level B.",
    openedOn: "2026-08-11",
  },
  {
    id: "r-2",
    candidateId: "c-priya",
    jobId: "j-cse",
    taskName: "Answer customer calls",
    status: "Resolved",
    candidateMethod: "At the co-operative bank helpdesk I handled member calls using captioned calling and the chat queue. My average handle time was 4m 10s versus a team average of 4m 30s, with 92% CSAT.",
    optionsConsidered: ["Text chat queue", "Captioned calling", "Relay service"],
    employerResponse: "Chat queue is 55% of volume; captioned calling supported by Exotel. Willing to assign chat-first queue.",
    expertRecommendation: "Task is adaptable. Equivalent output achievable via chat-first assignment plus captioned calls. No safety concern.",
    finalDecision: "Compatible With Accommodation",
    reason: "Task 'Answer customer calls' can be performed via chat queue and captioned calling with equivalent response time and CSAT. Accommodation cost Level A.",
    openedOn: "2026-07-06",
  },
  {
    id: "r-3",
    candidateId: "c-kavitha",
    jobId: "j-cse",
    taskName: "Record customer information",
    status: "Awaiting Employer",
    candidateMethod: "I dictate using Dragon at ~60 wpm with 97% accuracy and correct by voice. Freshdesk fields accept dictation; I have tested on the trial account.",
    optionsConsidered: ["Speech-to-text", "Voice control for navigation"],
    openedOn: "2026-08-31",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Credits & incentives                          */
/* -------------------------------------------------------------------------- */

export const creditRules = [
  { action: "Hire PwD Candidate", credits: 100 },
  { action: "Retain Employee for 6 Months", credits: 100 },
  { action: "Provide Internship", credits: 30 },
  { action: "Complete Accessibility Audit", credits: 30 },
  { action: "Manager Inclusion Training", credits: 25 },
  { action: "Refer Another Employer", credits: 50 },
];

export const creditRewards = [
  { name: "Recruitment Discount (20%)", cost: 150 },
  { name: "Free Accessibility Audit", cost: 100 },
  { name: "Training Support Voucher", cost: 120 },
  { name: "Priority Candidate Matching (3 months)", cost: 200 },
  { name: "Inclusion Certification", cost: 300 },
];

export const employerBenefit = {
  recruitmentSaving: 25000,
  accessibilitySupport: 10000,
  trainingSupport: 5000,
  governmentSchemes: [
    { name: "EPF employer contribution reimbursement (3 years)", body: "Ministry of Social Justice & Empowerment", value: "Up to ₹1,800 / month / employee" },
    { name: "Assistive device support (ADIP)", body: "Govt. of India", value: "Up to ₹10,000 per device" },
    { name: "Tamil Nadu Differently Abled Welfare incentives", body: "Govt. of Tamil Nadu", value: "Workplace modification grant" },
  ],
  csr: "CSR-sponsored training slots available from 2 Madurai corporates for FY 2026-27",
};

export const smePlan = {
  price: 499,
  includes: ["5 Job Posts", "Candidate Matching", "Essential Task Mapping", "Accessibility Checklist", "Basic Hiring Support", "Accommodation Recommendations"],
};

export const revenueSources = ["Employer Recruitment Fees", "SME Subscription", "Enterprise Hiring Programs", "Accessibility Services", "CSR-Sponsored Training", "Skill Program Partnerships", "Corporate Inclusion Consulting"];

/* -------------------------------------------------------------------------- */
/*                                Pilot metrics                               */
/* -------------------------------------------------------------------------- */

export const pilot = {
  name: "Tamil Nadu Pilot",
  cities: ["Madurai", "Tirunelveli", "Nagercoil"],
  durationMonths: 12,
  registered: 1000,
  assessed: 850,
  trained: 600,
  jobReady: 420,
  employers: 150,
  jobsIdentified: 500,
  internships: 350,
  placed: 300,
  retention3m: 85,
  retention6m: 75,
  retention12m: 68,
  averageSalary: 18400,
  citiesCovered: 3,
  accessibilityImprovements: 212,
  avgInclusionScore: 71,
  directlyCompatible: 184,
  compatibleWithAccommodation: 246,
  requiresAssessment: 58,
  currentlyNotCompatible: 12,
  accommodationRequests: 174,
  avgEmploymentMonths: 9,
  sustainedEmploymentMonths: 2700,
  activeJobs: 212,
};

export const analytics = {
  registrations: [
    { month: "Oct", value: 60 }, { month: "Nov", value: 95 }, { month: "Dec", value: 120 }, { month: "Jan", value: 140 },
    { month: "Feb", value: 160 }, { month: "Mar", value: 175 }, { month: "Apr", value: 190 }, { month: "May", value: 205 },
    { month: "Jun", value: 220 }, { month: "Jul", value: 240 }, { month: "Aug", value: 260 }, { month: "Sep", value: 275 },
  ],
  funnel: [
    { stage: "Registered", value: 1000 }, { stage: "Assessed", value: 850 }, { stage: "Trained", value: 600 },
    { stage: "Job Ready", value: 420 }, { stage: "Internships", value: 350 }, { stage: "Placed", value: 300 },
  ],
  placementsByMonth: [
    { month: "Jan", placements: 8, employers: 22 }, { month: "Feb", placements: 14, employers: 38 }, { month: "Mar", placements: 22, employers: 55 },
    { month: "Apr", placements: 30, employers: 72 }, { month: "May", placements: 38, employers: 90 }, { month: "Jun", placements: 45, employers: 108 },
    { month: "Jul", placements: 52, employers: 126 }, { month: "Aug", placements: 58, employers: 140 }, { month: "Sep", placements: 33, employers: 150 },
  ],
  byCity: [
    { city: "Madurai", placed: 138, employers: 72 }, { city: "Tirunelveli", placed: 92, employers: 46 }, { city: "Nagercoil", placed: 70, employers: 32 },
  ],
  jobCategories: [
    { name: "Customer Support", value: 72 }, { name: "Data Entry / Back Office", value: 64 }, { name: "Retail", value: 48 },
    { name: "Manufacturing QA", value: 42 }, { name: "Hospitality", value: 34 }, { name: "Accounts / Tally", value: 26 }, { name: "Other", value: 14 },
  ],
  salaryDistribution: [
    { band: "₹10–13k", value: 42 }, { band: "₹13–16k", value: 88 }, { band: "₹16–19k", value: 96 }, { band: "₹19–22k", value: 52 }, { band: "₹22k+", value: 22 },
  ],
  retention: [
    { checkpoint: "Day 7", rate: 98 }, { checkpoint: "Day 30", rate: 94 }, { checkpoint: "Day 90", rate: 85 }, { checkpoint: "6 Months", rate: 75 }, { checkpoint: "12 Months", rate: 68 },
  ],
  gender: [
    { name: "Women", value: 46 }, { name: "Men", value: 52 }, { name: "Other", value: 2 },
  ],
  industry: [
    { name: "IT Services", value: 28 }, { name: "Textile", value: 22 }, { name: "Retail", value: 18 }, { name: "Manufacturing", value: 14 }, { name: "Hospitality", value: 10 }, { name: "Logistics", value: 8 },
  ],
  compatibilityOutcomes: [
    { name: "Directly Compatible", value: 184 }, { name: "Compatible With Accommodation", value: 246 }, { name: "Requires Assessment", value: 58 }, { name: "Currently Not Compatible", value: 12 },
  ],
  accommodationTypes: [
    { name: "Flexible timing / WFH", value: 96 }, { name: "Screen reader / keyboard nav", value: 58 }, { name: "Chat / captioned calls", value: 44 }, { name: "Seated workstation", value: 38 }, { name: "Trolley / lift assist", value: 22 }, { name: "Visual alerts", value: 18 }, { name: "ISL interpreter", value: 9 },
  ],
  reviewOutcomes: [
    { name: "Compatible after review", value: 41 }, { name: "Job requirement revised", value: 12 }, { name: "Trial recommended", value: 9 }, { name: "Not compatible (task-specific)", value: 6 },
  ],
  accessibilityScores: [
    { band: "< 50", value: 18 }, { band: "50–64", value: 42 }, { band: "65–79", value: 58 }, { band: "80+", value: 32 },
  ],
  inclusionLevels: [
    { name: "Inclusive Starter", value: 74 }, { name: "Inclusive Partner", value: 52 }, { name: "Inclusive Champion", value: 24 },
  ],
};

export const notifications = {
  candidate: [
    { id: "n1", title: "Day-30 retention review completed", body: "Thanks for your feedback. A visual alert kit has been ordered for the Nagercoil hub floor.", date: "2026-09-03", read: false },
    { id: "n2", title: "New job match: Back Office Associate (Remote)", body: "Vaigai Connect drafted a remote role. You'll be notified once essential tasks are defined.", date: "2026-08-21", read: false },
    { id: "n3", title: "Training recommendation", body: "Workplace Communication & Professional Etiquette (60% complete) – finish to lift your Workplace Readiness score.", date: "2026-08-15", read: true },
  ],
  employer: [
    { id: "n1", title: "+100 3roots Credits earned", body: "Hire recorded: Priya Selvam – Customer Support Executive.", date: "2026-08-03", read: false },
    { id: "n2", title: "Day-30 retention review due", body: "Complete the employer feedback for Priya Selvam.", date: "2026-09-01", read: false },
    { id: "n3", title: "New shortlisted candidate explanation", body: "Kavitha Murugan explained how she performs 'Record customer information' using speech-to-text.", date: "2026-08-31", read: false },
    { id: "n4", title: "Draft job cannot be published", body: "Back Office Associate has no essential tasks defined.", date: "2026-08-20", read: true },
  ],
  admin: [
    { id: "n1", title: "Accessibility expert review pending", body: "Pandian Exports – Warehouse Assistant – 'Lift up to 10 kg' (Suresh Babu).", date: "2026-08-12", read: false },
    { id: "n2", title: "Madurai Inclusive Hiring Drive", body: "50 companies confirmed · 200 candidates registered.", date: "2026-09-01", read: false },
  ],
};

export const successStories = [
  { name: "Priya Selvam", city: "Nagercoil", role: "Customer Support Executive, Vaigai Connect Solutions", quote: "The CRM was already screen-reader friendly. The platform showed the employer that before we even spoke — so the interview was about my work, not my eyesight.", outcome: "94% match · Compatible With Accommodation · Hired after 2-week internship" },
  { name: "Arun Kumar", city: "Madurai", role: "Accounts Assistant, ABC Textiles", quote: "A ₹14,500 desk and a ramp were all it took. I've now filed four quarters of GST returns.", outcome: "Retained 90+ days · Level B accommodation" },
  { name: "S. Lakshmi", city: "Madurai", role: "HR Manager, ABC Textiles", quote: "Defining essential tasks made us realise half our 'requirements' were habits, not needs. We hire faster now for every role.", outcome: "Inclusive Champion · 9 PwD employees" },
];

export const partners = ["Thiagarajar Polytechnic", "Scott Christian College", "Sarah Tucker College", "Madurai Chamber of Commerce", "Kanyakumari Rehabilitation Centre", "Nellai NGO Forum", "Enable India", "NIEPMD Chennai"];

export const faqs = [
  { q: "Does 3roots match candidates by disability category?", a: "No. Every job is broken into essential tasks and compared against a candidate's skills, functional abilities, assistive technology, workplace accessibility and reasonable accommodation options. Disability labels are never used as a matching or rejection criterion." },
  { q: "What does 'Compatible With Accommodation' mean?", a: "The candidate can perform the essential tasks if a reasonable accommodation or assistive technology is provided — for example, a chat queue instead of voice calls. We show the estimated cost, setup time and marketplace providers alongside it." },
  { q: "Who decides when compatibility is uncertain?", a: "Never the algorithm. Uncertain cases are routed to an accessibility expert or an employer–candidate discussion, and the candidate can explain how they perform the task." },
  { q: "How much does accessibility cost for an SME?", a: "Most accommodations are Level A (₹0–₹5,000): flexible timing, software settings, keyboard navigation, captioned meetings. Level B (₹5,000–₹25,000) covers desks, ramps and adaptive devices. Level C structural changes are rare and flagged early." },
  { q: "What happens after hiring?", a: "Retention check-ins at Day 7, Day 30, Day 90, 6 and 12 months collect feedback from both sides, track accommodation effectiveness and trigger support. Our headline metric is Sustained Employment Months, not placements." },
  { q: "Is my functional ability information private?", a: "Yes. It is optional, consent-based, used only for task compatibility and accommodation analysis, and visible only to authorised employers and reviewers for roles you engage with." },
];

/* Helpers */
export const byId = <T extends { id: string }>(list: T[], id: string) => list.find((x) => x.id === id);
export const employerOf = (job: Job) => employers.find((e) => e.id === job.employerId)!;
export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
