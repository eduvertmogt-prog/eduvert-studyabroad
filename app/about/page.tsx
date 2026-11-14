import type { Metadata } from "next";
import { AboutView } from "@/components/about/view";
import "@/app/about.css";

export const metadata: Metadata = {
  title: "About Eduvert Study Abroad",
  description:
    "Eduvert is a study-abroad counselling office in Seawoods, Navi Mumbai. Country choice, applications, scholarships, and visa preparation.",
};

export default function AboutPage() {
  return <AboutView />;
}
