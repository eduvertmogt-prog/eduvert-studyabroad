import type { Metadata } from "next";
import { ExamHub } from "@/components/exams/hub-view";

export const metadata: Metadata = {
  title: "IELTS, TOEFL and PTE | Eduvert",
  description:
    "Compare IELTS, the 2026 TOEFL iBT and PTE Academic: format, scores, validity and India fees where the provider has published them.",
  alternates: { canonical: "/exams" },
  openGraph: {
    title: "IELTS, TOEFL and PTE | Eduvert",
    description:
      "A plain-language comparison of IELTS, TOEFL iBT and PTE Academic for students planning to study abroad.",
    url: "/exams",
  },
};

export default function ExamsPage() {
  return <ExamHub />;
}
