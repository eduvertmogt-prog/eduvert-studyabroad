import { costNote, countries, type Country } from "./countries";

export type DestinationPoint = { title: string; text: string };

export type DestinationFact = { label: string; value: string };

export type DestinationLink = { label: string; href: string };

export type DestinationContent = {
  country: Country;
  index: string;
  total: string;
  region: string;
  place: string;
  photo: string;
  photoSm: string;
  photoAlt: string;
  heroPosition: string;
  whyPosition: string;
  studyPosition: string;
  heroSupport: string;
  decision: string;
  consider: string;
  institutions: string[];
  eligibility: DestinationPoint[];
  facts: DestinationFact[];
  livingLabel: string;
  afterLabel: string;
  tuitionText: string;
  guidance: DestinationLink;
  longName: boolean;
};

export type DestinationNavItem = {
  name: string;
  href: string;
  index: string;
  current: boolean;
};

const regions: Record<string, string> = {
  uk: "Europe",
  usa: "North America",
  canada: "North America",
  australia: "Oceania",
  ireland: "Europe",
  france: "Europe",
  nz: "Oceania",
};

const heroSupport: Record<string, string> = {
  uk: "Recognised universities, three-year bachelor’s degrees, one-year master’s degrees, and more than one intake in the year.",
  usa: "A wide course range and research-led universities, with three intakes. Harvard, MIT, and Stanford are examples, not a promise of those campuses.",
  canada:
    "Recognised universities, part-time work during study, and a post-graduation work permit as a possible next step. Toronto, McGill, and UBC are the examples named here.",
  australia:
    "Universities in Sydney, Melbourne, Brisbane, Canberra, and Perth, three-year bachelor’s degrees, master’s degrees of one to two years, and a February main intake.",
  ireland: "An English-speaking country, degrees with international recognition, and a one-to-two-year stay-back option after study.",
  france:
    "Recognised universities, many English-taught programmes, and lower tuition at public universities than at many private schools. Many applications from India pass through Campus France.",
  nz: "Eight universities, English-taught courses, February and July intakes, and part-time work during study.",
};

const institutions: Record<string, string[]> = {
  uk: ["Oxford", "Cambridge", "Imperial College London"],
  usa: ["Harvard", "MIT", "Stanford"],
  canada: ["University of Toronto", "McGill University", "University of British Columbia"],
  australia: ["University of Melbourne", "Australian National University", "University of Sydney"],
};

const guidance: Record<string, DestinationLink> = {
  uk: { label: "UK Student visa guidance on GOV.UK", href: "https://www.gov.uk/student-visa" },
  usa: { label: "Study in the States", href: "https://studyinthestates.dhs.gov/" },
  canada: {
    label: "Study in Canada on canada.ca",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
  },
  australia: {
    label: "Student visa (subclass 500) on Home Affairs",
    href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
  },
  ireland: { label: "Irish Immigration Service", href: "https://www.irishimmigration.ie/" },
  france: { label: "France-Visas", href: "https://france-visas.gouv.fr/" },
  nz: { label: "Immigration New Zealand", href: "https://www.immigration.govt.nz/" },
};

const photos: Record<string, { alt: string; hero: string; why: string; study: string }> = {
  uk: {
    alt: "Stone university buildings along a lawn on a British campus.",
    hero: "center 40%",
    why: "center 62%",
    study: "center 28%",
  },
  usa: {
    alt: "Students walking between brick university buildings on an American campus.",
    hero: "center 45%",
    why: "center 30%",
    study: "center 70%",
  },
  canada: {
    alt: "A lakeside city skyline under a wide Canadian sky.",
    hero: "center 42%",
    why: "center 68%",
    study: "center 24%",
  },
  australia: {
    alt: "Sydney Harbour with the Opera House and harbour bridge.",
    hero: "center 48%",
    why: "center 32%",
    study: "center 70%",
  },
  ireland: {
    alt: "A coloured street in Dublin with Georgian buildings and shopfronts.",
    hero: "center 46%",
    why: "center 28%",
    study: "center 72%",
  },
  france: {
    alt: "A Paris boulevard looking toward the Eiffel Tower.",
    hero: "center 40%",
    why: "center 64%",
    study: "center 22%",
  },
  nz: {
    alt: "A lake and mountain valley in New Zealand under a clear sky.",
    hero: "center 50%",
    why: "center 36%",
    study: "center 72%",
  },
};

const eligibilityTitles = ["Academic record", "Language", "Supporting documents", "Funds"];

const eligibilityTitleOverrides: Record<string, Partial<Record<number, string>>> = {
  australia: { 3: "Health cover" },
  france: { 2: "Campus France" },
};

const fallbackGuidance: DestinationLink = {
  label: "All destinations",
  href: "/study-abroad",
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function inCountry(name: string) {
  if (name === "United Kingdom" || name === "United States") return `the ${name}`;
  return name;
}

export function presentCountry(country: Country): DestinationContent {
  const at = Math.max(0, countries.findIndex((item) => item.slug === country.slug));
  const photo = photos[country.slug];
  const livingLabel = country.planning.livingShort.includes("/mo") ? "Living" : "Living / year";
  const afterLabel = country.slug === "france" ? "During study" : "After study";
  const place = inCountry(country.name);
  const tuitionText = country.tuition.includes(costNote)
    ? country.tuition.replace(costNote, "").replace(/\s{2,}/g, " ").trim()
    : country.tuition;

  return {
    country,
    index: pad(at + 1),
    total: pad(countries.length),
    region: regions[country.slug] ?? "Destination",
    place,
    photo: `/study-abroad/${country.slug}.jpg`,
    photoSm: `/study-abroad/${country.slug}-sm.jpg`,
    photoAlt: photo?.alt ?? `${country.name}.`,
    heroPosition: photo?.hero ?? "center",
    whyPosition: photo?.why ?? "center",
    studyPosition: photo?.study ?? "center",
    heroSupport: heroSupport[country.slug] ?? country.overview,
    decision: `Explore the universities, costs, intakes and decisions that shape studying in ${place} — before you commit to an application.`,
    consider: "Before you apply, weigh the course, the full cost, the intake you can reach, and the visa conditions in force that year.",
    institutions: institutions[country.slug] ?? [],
    eligibility: country.eligibility.map((text, index) => ({
      title: eligibilityTitleOverrides[country.slug]?.[index] ?? eligibilityTitles[index] ?? "Preparation",
      text,
    })),
    facts: [
      { label: "Tuition / year", value: country.planning.tuitionShort },
      { label: livingLabel, value: country.planning.livingShort },
      { label: "Major intake", value: country.intakes[0]?.title ?? "See intakes" },
      { label: afterLabel, value: country.planning.afterStudy },
    ],
    livingLabel,
    afterLabel,
    tuitionText,
    guidance: guidance[country.slug] ?? fallbackGuidance,
    longName: country.name.length > 10,
  };
}

export function destinationNav(currentSlug: string): DestinationNavItem[] {
  return countries.map((country, index) => ({
    name: country.name,
    href: `/${country.path}`,
    index: pad(index + 1),
    current: country.slug === currentSlug,
  }));
}

export { costNote };
