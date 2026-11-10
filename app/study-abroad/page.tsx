import type { Metadata } from "next";
import { StudyAbroadView } from "../../components/study-abroad/view";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Navi Mumbai | Overseas Education Consultant for International Colleges",
  description:
    "Our expert overseas education consultants in Navi Mumbai provide personalized support for students seeking to study in top colleges worldwide. Start your study abroad journey today.",
};

export default function StudyAbroadPage() {
  return (
    <main id="content">
      <StudyAbroadView />
    </main>
  );
}
