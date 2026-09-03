/**
 * 3roots rule-based Job Compatibility Engine.
 *
 * Principles (enforced in code):
 *  - Never uses a disability category; only task requirements vs functional abilities,
 *    assistive technology, workplace accessibility and reasonable accommodation.
 *  - Always checks accommodation before marking a task incompatible.
 *  - Routes uncertain cases to human / accessibility-expert review.
 *  - Produces transparent, task-level explanations.
 */
import {
  accommodationCatalogue,
  employerOf,
  marketplace,
  type AccommodationOption,
  type Candidate,
  type EssentialTask,
  type FunctionalAbilities,
  type Job,
  type RequirementType,
  type SkillLevel,
} from "./demo-data";

export type CompatibilityStatus =
  | "Directly Compatible"
  | "Compatible With Accommodation"
  | "Requires Assessment"
  | "Currently Not Compatible";

export interface TaskResult {
  task: EssentialTask;
  status: CompatibilityStatus;
  directRequirements: RequirementType[];
  accommodatedRequirements: { requirement: RequirementType; option: AccommodationOption }[];
  unresolvedRequirements: RequirementType[];
  explanation: string;
  recommendations: AccommodationOption[];
  humanReviewReason?: string;
}

export interface MatchResult {
  candidate: Candidate;
  job: Job;
  overall: number;
  breakdown: {
    skills: number;
    communication: number;
    location: number;
    taskCompatibility: number;
    accessibility: number;
    experience: number;
  };
  status: CompatibilityStatus;
  tasks: TaskResult[];
  summary: string;
  humanReviewRequired: boolean;
  unresolvedQuestions: string[];
  accommodationCostLevel: "A" | "B" | "C" | "None";
}

/* ----------------------------- Direct checks ------------------------------ */

function canDirectly(req: RequirementType, f: FunctionalAbilities, task: EssentialTask): boolean {
  switch (req) {
    case "typing":
      return f.keyboard && !f.screenReader ? true : f.keyboard && f.screenReader && /screen.?reader|wcag|accessible/i.test(task.technology);
    case "mouse":
      return f.mouse;
    case "phone":
      return f.verbalCommunication && !f.hearingAssistance;
    case "standing":
      return f.standLong;
    case "printed_documents":
      return !f.screenReader;
    case "visual_monitoring":
      return !f.screenReader;
    case "audio_alerts":
      return !f.hearingAssistance;
    case "travel":
      return f.travelIndependently;
    case "repetitive_manual":
      return f.repetitiveMovement;
    case "lifting":
      return f.liftKg >= (task.liftKg ?? 5);
    case "verbal_communication":
      return f.verbalCommunication && !f.hearingAssistance;
    case "screen_use":
      return !f.screenReader ? f.keyboard || f.mouse || f.voiceInput : /screen.?reader|wcag|accessible|keyboard/i.test(task.technology);
    case "team_communication":
      return (f.verbalCommunication && !f.hearingAssistance) || f.textCommunication;
  }
}

/** Find an accommodation the candidate can use AND the employer can plausibly provide. */
function findAccommodation(req: RequirementType, candidate: Candidate, task: EssentialTask): AccommodationOption | undefined {
  const options = accommodationCatalogue[req].options;
  const employerOffers = task.accommodationsAvailable.map((a) => a.toLowerCase());
  const candidateAT = candidate.assistiveTech.join(" ").toLowerCase();

  const usable = options.filter((o) => o.enabledBy.some((k) => Boolean(candidate.functional[k])));
  // Prefer options the employer already listed, then options matching candidate's own AT, then Level A.
  const byEmployer = usable.find((o) => employerOffers.some((e) => o.name.toLowerCase().includes(e.split(" ")[0]!) || e.includes(o.name.toLowerCase().split(" ")[0]!)));
  if (byEmployer) return byEmployer;
  const byAT = usable.find((o) => candidateAT.includes(o.name.toLowerCase().split(" ")[0]!));
  if (byAT && (task.alternativeMethodPossible || task.workstationChangePossible)) return byAT;
  const levelA = usable.find((o) => o.costLevel === "A");
  if (levelA && (task.alternativeMethodPossible || task.workstationChangePossible)) return levelA;
  return undefined;
}

export function evaluateTask(task: EssentialTask, candidate: Candidate): TaskResult {
  const f = candidate.functional;
  const direct: RequirementType[] = [];
  const accommodated: TaskResult["accommodatedRequirements"] = [];
  const unresolved: RequirementType[] = [];
  const recommendations: AccommodationOption[] = [];

  for (const req of task.requirements) {
    if (canDirectly(req, f, task)) {
      direct.push(req);
      continue;
    }
    const option = findAccommodation(req, candidate, task);
    if (option) {
      accommodated.push({ requirement: req, option });
      recommendations.push(option);
    } else {
      unresolved.push(req);
      // Still surface possible adaptations for discussion
      recommendations.push(...accommodationCatalogue[req].options.slice(0, 2));
    }
  }

  let status: CompatibilityStatus;
  let humanReviewReason: string | undefined;

  if (unresolved.length === 0) {
    status = accommodated.length === 0 ? "Directly Compatible" : "Compatible With Accommodation";
  } else if (task.classification === "Optional") {
    status = "Compatible With Accommodation";
    humanReviewReason = "Optional task can be reassigned; confirm with employer.";
  } else if (task.classification === "Adaptable" || task.alternativeMethodPossible || task.reassignable || task.workstationChangePossible) {
    status = "Requires Assessment";
    humanReviewReason = "Task is adaptable but the specific alternative method has not been confirmed. Employer–candidate discussion or accessibility expert review recommended.";
  } else if (!candidate.functionalConsent) {
    status = "Requires Assessment";
    humanReviewReason = "Functional information is incomplete; do not infer inability.";
  } else {
    // Mandatory, employer states no alternative and no accommodation found.
    status = "Currently Not Compatible";
    humanReviewReason = "Mandatory task with no available alternative recorded. Accessibility expert review is recommended before any decision.";
  }

  const label = (r: RequirementType) => accommodationCatalogue[r].label.replace(" required", "").toLowerCase();
  const parts: string[] = [];
  if (direct.length) parts.push(`Can perform ${direct.map(label).join(", ")} directly.`);
  if (accommodated.length) parts.push(`${accommodated.map((a) => `${label(a.requirement)} via ${a.option.name.toLowerCase()} (Level ${a.option.costLevel})`).join("; ")}.`);
  if (unresolved.length) {
    parts.push(
      `The task requires ${unresolved.map(label).join(", ")}${task.liftKg ? ` (${task.liftKg} kg)` : ""} as a ${task.classification.toLowerCase()} requirement. ${
        task.alternativeMethodNote ?? "No alternative method or equipment has been recorded by the employer yet."
      }`,
    );
  }
  if (task.requirements.length === 0) parts.push("No specific functional requirement recorded for this task.");

  return {
    task,
    status,
    directRequirements: direct,
    accommodatedRequirements: accommodated,
    unresolvedRequirements: unresolved,
    explanation: parts.join(" "),
    recommendations: dedupe(recommendations),
    ...(humanReviewReason ? { humanReviewReason } : {}),
  };
}

function dedupe(list: AccommodationOption[]) {
  const seen = new Set<string>();
  return list.filter((o) => (seen.has(o.name) ? false : (seen.add(o.name), true)));
}

/* ------------------------------ Score parts ------------------------------- */

const levelRank: Record<SkillLevel, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export function skillScore(candidate: Candidate, job: Job) {
  if (job.requiredSkills.length === 0) return 70;
  const scores = job.requiredSkills.map((rs) => {
    const cs = candidate.skills.find((s) => s.name.toLowerCase() === rs.name.toLowerCase());
    if (!cs) return 30;
    const gap = levelRank[rs.level] - levelRank[cs.level];
    return gap <= 0 ? 100 : gap === 1 ? 80 : 50;
  });
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

const statusPoints: Record<CompatibilityStatus, number> = {
  "Directly Compatible": 100,
  "Compatible With Accommodation": 90,
  "Requires Assessment": 60,
  "Currently Not Compatible": 30,
};

export function communicationScore(tasks: TaskResult[]) {
  const comm = tasks.filter((t) => t.task.requirements.some((r) => ["phone", "verbal_communication", "team_communication"].includes(r)));
  if (comm.length === 0) return 95;
  return Math.round(comm.reduce((a, t) => a + statusPoints[t.status], 0) / comm.length);
}

export function locationScore(candidate: Candidate, job: Job) {
  if (job.workMode === "Remote" && candidate.functional.remoteWork) return 100;
  if (job.district === candidate.district) return 100;
  if (job.workMode === "Hybrid" && candidate.workMode.includes("Hybrid") && candidate.functional.remoteWork) return 95;
  if (job.transport.accessibleTransport && candidate.functional.travelIndependently) return 75;
  return 60;
}

export function taskCompatibilityScore(tasks: TaskResult[]) {
  const essential = tasks.filter((t) => t.task.classification !== "Optional");
  if (essential.length === 0) return 0;
  const ok = essential.filter((t) => t.status === "Directly Compatible" || t.status === "Compatible With Accommodation").length;
  return Math.round((ok / essential.length) * 100);
}

export function accessibilityScoreFor(candidate: Candidate, job: Job) {
  const employer = employerOf(job);
  const needs = new Set<RequirementType>();
  job.tasks.forEach((t) => t.requirements.forEach((r) => !canDirectly(r, candidate.functional, t) && needs.add(r)));
  if (!candidate.functional.travelIndependently || candidate.functional.modifiedWorkstation || !candidate.functional.standLong) needs.add("travel");
  const relevant = employer.accessibility.filter((a) => a.relevantTo.some((r) => needs.has(r)));
  if (relevant.length === 0) return 100;
  const pts = { Good: 100, Available: 100, "Needs Improvement": 60, "Not Available": 30 } as const;
  return Math.round(relevant.reduce((a, i) => a + pts[i.status], 0) / relevant.length);
}

export function experienceScore(candidate: Candidate, job: Job) {
  if (job.experienceYears === 0) return 100;
  return Math.min(100, Math.round((candidate.totalExperienceYears / job.experienceYears) * 100));
}

export const matchWeights = { skills: 0.2, communication: 0.2, location: 0.15, taskCompatibility: 0.2, accessibility: 0.1, experience: 0.15 };

/* ------------------------------- Main match ------------------------------- */

export function matchCandidateToJob(candidate: Candidate, job: Job): MatchResult {
  const tasks = job.tasks.map((t) => evaluateTask(t, candidate));
  const breakdown = {
    skills: skillScore(candidate, job),
    communication: communicationScore(tasks),
    location: locationScore(candidate, job),
    taskCompatibility: taskCompatibilityScore(tasks),
    accessibility: accessibilityScoreFor(candidate, job),
    experience: experienceScore(candidate, job),
  };
  const overall = Math.round(
    breakdown.skills * matchWeights.skills +
      breakdown.communication * matchWeights.communication +
      breakdown.location * matchWeights.location +
      breakdown.taskCompatibility * matchWeights.taskCompatibility +
      breakdown.accessibility * matchWeights.accessibility +
      breakdown.experience * matchWeights.experience,
  );

  const essential = tasks.filter((t) => t.task.classification !== "Optional");
  let status: CompatibilityStatus = "Directly Compatible";
  if (!job.tasksDefined || essential.length === 0) status = "Requires Assessment";
  else if (essential.some((t) => t.status === "Currently Not Compatible")) status = "Currently Not Compatible";
  else if (essential.some((t) => t.status === "Requires Assessment")) status = "Requires Assessment";
  else if (essential.some((t) => t.status === "Compatible With Accommodation")) status = "Compatible With Accommodation";

  const unresolvedQuestions = tasks.filter((t) => t.humanReviewReason).map((t) => `${t.task.name}: ${t.humanReviewReason}`);
  if (!job.tasksDefined) unresolvedQuestions.push("Employer has not defined essential tasks; compatibility cannot be assessed.");
  const humanReviewRequired = status === "Requires Assessment" || status === "Currently Not Compatible";

  const directTasks = tasks.filter((t) => t.status === "Directly Compatible").map((t) => t.task.name);
  const atTasks = tasks.filter((t) => t.status === "Compatible With Accommodation");
  const summaryParts: string[] = [];
  if (directTasks.length) summaryParts.push(`Candidate can perform ${listify(directTasks)} directly.`);
  if (atTasks.length) {
    const methods = dedupe(atTasks.flatMap((t) => t.accommodatedRequirements.map((a) => a.option))).map((o) => o.name.toLowerCase());
    summaryParts.push(`${listify(atTasks.map((t) => t.task.name))} can be performed using ${listify(methods)}.`);
  }
  if (status === "Compatible With Accommodation") summaryParts.push("Standard interaction methods should not be treated as mandatory where equivalent work output can be achieved.");
  if (humanReviewRequired) summaryParts.push("One or more tasks need human or accessibility expert review before a decision. This is not a rejection.");

  const levels = tasks.flatMap((t) => t.accommodatedRequirements.map((a) => a.option.costLevel));
  const accommodationCostLevel: MatchResult["accommodationCostLevel"] = levels.includes("C") ? "C" : levels.includes("B") ? "B" : levels.length ? "A" : "None";

  return { candidate, job, overall, breakdown, status, tasks, summary: summaryParts.join(" "), humanReviewRequired, unresolvedQuestions, accommodationCostLevel };
}

function listify(items: string[]) {
  const u = Array.from(new Set(items));
  if (u.length <= 1) return u[0] ?? "";
  return `${u.slice(0, -1).join(", ")} and ${u[u.length - 1]}`;
}

/* ----------------------------- Other scores ------------------------------- */

export function readinessScore(r: Candidate["readiness"]) {
  return Math.round(r.technical * 0.3 + r.communication * 0.2 + r.digitalLiteracy * 0.15 + r.jobAssessment * 0.2 + r.workplace * 0.15);
}

export const readinessWeights = [
  { key: "technical", label: "Technical Skills", weight: 30 },
  { key: "communication", label: "Communication", weight: 20 },
  { key: "digitalLiteracy", label: "Digital Literacy", weight: 15 },
  { key: "jobAssessment", label: "Job-Specific Assessment", weight: 20 },
  { key: "workplace", label: "Workplace Readiness", weight: 15 },
] as const;

export function accessibilityScore(items: { status: string }[]) {
  const pts: Record<string, number> = { Good: 100, Available: 80, "Needs Improvement": 40, "Not Available": 0 };
  return Math.round(items.reduce((a, i) => a + (pts[i.status] ?? 0), 0) / items.length);
}

export function inclusionScore(i: { inclusiveHiring: number; accessibility: number; retention: number; inclusiveRecruitment: number; managerTraining: number; employeeSupport: number }) {
  return Math.round(i.inclusiveHiring * 0.25 + i.accessibility * 0.25 + i.retention * 0.2 + i.inclusiveRecruitment * 0.1 + i.managerTraining * 0.1 + i.employeeSupport * 0.1);
}

export function inclusionLevel(score: number) {
  return score >= 80 ? "Inclusive Champion" : score >= 60 ? "Inclusive Partner" : "Inclusive Starter";
}

export const inclusionWeights = [
  { key: "inclusiveHiring", label: "Inclusive Hiring", weight: 25 },
  { key: "accessibility", label: "Accessibility", weight: 25 },
  { key: "retention", label: "Employee Retention", weight: 20 },
  { key: "inclusiveRecruitment", label: "Inclusive Recruitment", weight: 10 },
  { key: "managerTraining", label: "Manager Training", weight: 10 },
  { key: "employeeSupport", label: "Employee Support", weight: 10 },
] as const;

export function providersFor(option: AccommodationOption) {
  return marketplace.filter((m) => option.marketplaceIds.includes(m.id));
}

export const statusTone: Record<CompatibilityStatus, "success" | "info" | "warning" | "neutral"> = {
  "Directly Compatible": "success",
  "Compatible With Accommodation": "info",
  "Requires Assessment": "warning",
  "Currently Not Compatible": "neutral",
};

export const statusDescription: Record<CompatibilityStatus, string> = {
  "Directly Compatible": "Candidate can perform the essential tasks without additional accommodation.",
  "Compatible With Accommodation": "Candidate can perform the essential tasks if reasonable accommodation or assistive technology is provided.",
  "Requires Assessment": "Compatibility cannot be automatically determined and needs human or accessibility expert review, employer discussion or candidate explanation.",
  "Currently Not Compatible": "One or more essential tasks cannot currently be performed safely or reasonably even after available accommodation is considered. Based on specific task requirements, never on labels.",
};
