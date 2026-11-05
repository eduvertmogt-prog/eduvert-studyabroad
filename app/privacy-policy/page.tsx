import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Eduvert Study Abroad",
  description: "How Eduvert uses the details you send with a study abroad enquiry.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="What happens to an enquiry."
      lede="A counselling enquiry on this site asks for your name, email, mobile number, a destination, and a message."
      sourceHref="https://www.eduvert.co/privacy-policy/"
      sourceLabel="eduvert.co/privacy-policy"
    >
      <p>
        Those details are used to reply about study abroad. The form opens an email to communication@eduvert.co. It does
        not create an account.
      </p>
      <p>
        Do not send passport scans, bank statements, or exam transcripts in the first message. Send those only when a
        counsellor asks for them, through a channel you both agree.
      </p>
      <p>
        Phone and WhatsApp links leave this site for your phone provider or WhatsApp. Their own privacy rules apply
        there.
      </p>
    </PolicyPage>
  );
}
