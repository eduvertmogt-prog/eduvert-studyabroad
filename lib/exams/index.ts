import { ielts } from "./ielts";
import { pte } from "./pte";
import { toefl } from "./toefl";
import type { Exam, ExamSlug } from "./types";

export const exams: Exam[] = [ielts, toefl, pte];

const bySlug = new Map<ExamSlug, Exam>(exams.map((exam) => [exam.slug, exam]));

export function getExam(slug: string) {
  return bySlug.get(slug as ExamSlug);
}

export function otherExams(slug: ExamSlug) {
  return exams.filter((exam) => exam.slug !== slug);
}

export const compareRows: { key: keyof Exam["compare"]; label: string }[] = [
  { key: "provider", label: "Provider" },
  { key: "format", label: "Test format" },
  { key: "duration", label: "Test duration" },
  { key: "score", label: "Score range" },
  { key: "results", label: "Typical results" },
  { key: "validity", label: "Validity" },
  { key: "delivery", label: "Where you can take it" },
  { key: "fee", label: "India fee" },
  { key: "use", label: "Main academic use" },
];

export const examSections = [
  { id: "overview", label: "Overview" },
  { id: "format", label: "Exam format" },
  { id: "scoring", label: "Scoring" },
  { id: "acceptance", label: "Acceptance" },
  { id: "eligibility", label: "Eligibility" },
  { id: "fees", label: "Fees" },
  { id: "registration", label: "Registration" },
  { id: "results", label: "Results" },
  { id: "faqs", label: "FAQs" },
] as const;
