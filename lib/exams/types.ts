export type FeeLine = {
  label: string;
  amountLabel: string | null;
  status: "listed" | "confirm";
  country: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
};

export type NamedText = {
  title: string;
  text: string;
};

export type ExamTask = {
  name: string;
  text: string;
  marker?: string;
};

export type ExamSection = {
  id: string;
  name: string;
  purpose: string;
  duration: string;
  structure: string;
  assessment: string;
  rules: string;
  tasks: ExamTask[];
};

export type CountryNote = {
  name: string;
  href?: string;
  admission: string;
  immigration: string;
  atHome: string;
};

export type ExamFaq = {
  question: string;
  answer: string;
};

export type ExamSlug = "ielts" | "toefl" | "pte";

export type Exam = {
  slug: ExamSlug;
  name: string;
  fullName: string;
  provider: string;
  headline: string;
  lede: string;
  panelBlurb: string;
  bookingUrl: string;
  bookingLabel: string;
  facts: { label: string; value: string }[];
  overview: string[];
  variantWarning: string;
  variants: NamedText[];
  sections: ExamSection[];
  scoring: {
    intro: string;
    points: NamedText[];
    markers: { label: string; note: string }[];
    caveat: string;
  };
  countries: CountryNote[];
  eligibility: NamedText[];
  fees: FeeLine[];
  feeNote: string;
  lastVerified: string;
  steps: NamedText[];
  testDay: NamedText[];
  results: NamedText[];
  faqs: ExamFaq[];
  references: { label: string; href: string }[];
  compare: {
    provider: string;
    format: string;
    duration: string;
    score: string;
    results: string;
    validity: string;
    delivery: string;
    fee: string;
    use: string;
  };
  alternatives: { slug: ExamSlug; difference: string }[];
  seo: { title: string; description: string };
};

export const examVerified = "12 November 2026";
