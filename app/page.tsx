import type { Metadata } from "next";
import { DestinationExplorer } from "../components/destination-explorer";
import { HeroFlight } from "../components/hero-flight";
import { PersonalInvitation } from "../components/personal-invitation";
import { CounsellorDesk } from "../components/counsellor-desk";
import { JourneyRoadmap } from "../components/journey-roadmap";
import { ReachBand } from "../components/reach-band";
import { FaqIndex } from "../components/faq-index";
import { Voices } from "../components/voices";
import { WhyBand } from "../components/why-band";

export const metadata: Metadata = {
  title: "Eduvert Study Abroad",
  description:
    "Your future has no borders. Eduvert helps students in Navi Mumbai choose a country, a university, and the steps that follow.",
};

export default function Home() {
  return (
      <main id="content">
        <HeroFlight />
        <ReachBand />

        <WhyBand />

        <DestinationExplorer />

        <JourneyRoadmap />

        <CounsellorDesk />

        <Voices />

        <FaqIndex />

        <PersonalInvitation />
      </main>
  );
}
