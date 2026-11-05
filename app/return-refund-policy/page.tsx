import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = {
  title: "Return and Refund Policy | Eduvert Study Abroad",
  description: "Refunds for Eduvert study abroad counselling, separate from university and visa fees.",
};

export default function RefundPage() {
  return (
    <PolicyPage
      eyebrow="Refunds"
      title="Fees that can and cannot come back."
      lede="Study abroad counselling is a service. It is not a product you return."
      sourceHref="https://www.eduvert.co/return-refund-policy/"
      sourceLabel="eduvert.co/return-refund-policy"
    >
      <p>
        Any refund of an Eduvert counselling fee follows the written agreement and the policy published on eduvert.co.
        Ask for it in writing at communication@eduvert.co.
      </p>
      <p>
        Money paid to a university, a test provider, a visa centre, or a landlord is outside that refund. Those bodies
        set their own rules.
      </p>
    </PolicyPage>
  );
}
