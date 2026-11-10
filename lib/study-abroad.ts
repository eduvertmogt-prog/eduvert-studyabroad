import { costNote, countries } from "./countries";
import { globeDestinations } from "./globe-destinations";
import { faqs, services } from "./site";

export function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

const platePhotos: Record<string, { alt: string }> = {
  uk: { alt: "Stone university buildings along a lawn on a British campus." },
  usa: { alt: "Students walking between brick university buildings on an American campus." },
  canada: { alt: "A lakeside city skyline under a wide Canadian sky." },
  australia: { alt: "Sydney Harbour with the Opera House and harbour bridge." },
  ireland: { alt: "A coloured street in Dublin with Georgian buildings and shopfronts." },
  france: { alt: "A Paris boulevard looking toward the Eiffel Tower." },
  nz: { alt: "A lake and mountain valley in New Zealand under a clear sky." },
};

export type FolioPlate = {
  slug: string;
  index: string;
  name: string;
  href: string;
  description: string;
  tuitionShort: string;
  livingShort: string;
  afterStudy: string;
  afterStudyLabel: string;
  intake: string;
  courses: string[];
  photo: string;
  photoSm: string;
  photoAlt: string;
};

function firstSentence(text: string) {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

export const folioPlates: FolioPlate[] = countries.map((country, index) => {
  const globe = globeDestinations.find((item) => item.id === country.slug);
  const photo = platePhotos[country.slug];
  return {
    slug: country.slug,
    index: pad(index),
    name: country.name,
    href: `/${country.path}`,
    description: globe?.description ?? firstSentence(country.overview),
    tuitionShort: country.planning.tuitionShort,
    livingShort: country.planning.livingShort,
    afterStudy: country.planning.afterStudy,
    afterStudyLabel: country.slug === "france" ? "During study" : "After study",
    intake: country.intakes[0]?.title ?? "",
    courses: country.courses.slice(0, 4),
    photo: `/study-abroad/${country.slug}.jpg`,
    photoSm: `/study-abroad/${country.slug}-sm.jpg`,
    photoAlt: photo?.alt ?? `${country.name} campus.`,
  };
});

export { costNote };

export const agenda = services;

export const counselChapters = [
  { index: "01", title: "Discover", items: services.slice(0, 2) },
  { index: "02", title: "Prepare", items: services.slice(2, 4) },
  { index: "03", title: "Progress", items: services.slice(4, 6) },
];

export const briefing = faqs;

export const eligibility = [
  {
    title: "Academic record",
    text: "Universities set their own grade requirements. For a longer degree, they often want proof you have already started or finished the level below the one you are applying for.",
  },
  {
    title: "Language",
    text: "If the course is not taught in your first language, the university may ask for a test such as IELTS. Some courses taught in English do not remove that requirement.",
  },
  {
    title: "Visa",
    text: "Most countries need a student visa or study permit before you travel. Each country sets its own documents, funds, and timing.",
  },
  {
    title: "Money",
    text: "You need a way to show tuition, living costs, and travel. The amount depends on the country and the university, not on a single Eduvert package.",
  },
  {
    title: "Health cover",
    text: "Many countries require health insurance for the length of the course. Some universities offer a plan. Others expect you to buy one.",
  },
];

export const application = [
  {
    title: "Research programmes",
    text: "Research programmes that match the subject, the budget, and the intake you can actually make.",
  },
  {
    title: "Prepare your documents",
    text: "Prepare transcripts, test scores, references, and a personal statement.",
  },
  {
    title: "Submit applications",
    text: "Submit applications before each university’s deadline, with every document the form asks for.",
  },
  {
    title: "Prepare the visa application",
    text: "After an offer, apply for that country’s student visa with the acceptance letter, funds, and other papers it lists.",
  },
  {
    title: "Plan finances and accommodation",
    text: "Plan tuition, housing, and living costs. A counsellor can help you read what is required. The payments themselves go to the university, the insurer, or the visa authority.",
  },
  {
    title: "Prepare for departure",
    text: "Before departure, book travel, confirm housing, and attend any pre-departure briefing the university or Eduvert provides.",
  },
];
