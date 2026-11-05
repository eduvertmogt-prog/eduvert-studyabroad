import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | Eduvert Study Abroad",
  description: "The terms that apply when you use Eduvert’s study abroad pages.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="How to read these pages."
      lede="The pages describe Eduvert’s study abroad counselling. They are not an offer of admission from any university."
      sourceHref="https://www.eduvert.co/terms-and-conditions/"
      sourceLabel="eduvert.co/terms-and-conditions"
    >
      <p>
        Tuition bands, living costs, work-hour caps, and visa names are planning guidance. A university offer and the
        immigration website of that country replace them.
      </p>
      <p>
        Scholarships are mentioned only where a university or a public scheme publishes them. Eduvert does not guarantee
        an award, a visa, or a place.
      </p>
      <p>
        Counselling starts when you contact the office and agree the scope with the team. These pages do not, by
        themselves, create a paid engagement.
      </p>
    </PolicyPage>
  );
}
