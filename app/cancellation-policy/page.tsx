import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = {
  title: "Cancellation Policy | Eduvert Study Abroad",
  description: "How to cancel a study abroad counselling enquiry with Eduvert.",
};

export default function CancellationPage() {
  return (
    <PolicyPage
      eyebrow="Cancellation"
      title="Stopping an enquiry."
      lede="You can stop a counselling conversation by writing to communication@eduvert.co or calling +91-9619678085."
      sourceHref="https://www.eduvert.co/cancellation-policy/"
      sourceLabel="eduvert.co/cancellation-policy"
    >
      <p>
        If a fee has been agreed for a counselling service, the cancellation terms on Eduvert’s published policy, and
        anything written in that agreement, decide what is refundable.
      </p>
      <p>
        University application fees, visa fees, and test fees are charged by those organisations. Eduvert cannot cancel
        them on your behalf unless the university or authority allows it.
      </p>
    </PolicyPage>
  );
}
