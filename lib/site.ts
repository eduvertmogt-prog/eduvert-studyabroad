import { countries } from "./countries";

export const contact = {
  phoneDisplay: "+91-9619678085",
  phoneHref: "tel:+919619678085",
  whatsappHref: "https://wa.me/919619678085",
  email: "communication@eduvert.co",
  emailHref: "mailto:communication@eduvert.co",
  address: "S-10-B, Haware Centurion Mall, 2nd Floor, Seawoods, Navi Mumbai - 400706",
};

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/eduvertinstitute" },
  { label: "Instagram", href: "https://www.instagram.com/eduvertonline/" },
  { label: "YouTube", href: "https://www.youtube.com/@eduvertonline" },
];

export const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonials", href: "https://www.eduvert.co/testimonials/" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Return and Refund Policy", href: "/return-refund-policy" },
];

export const destinations = countries.map((country) => ({
  name: country.name,
  href: `/${country.path}`,
}));

export const reasons = [
  {
    title: "Careers that cross borders",
    text: "Employers look for people who can work with more than one culture. An international degree is one way students build that experience.",
  },
  {
    title: "Academic choice",
    text: "Students compare universities and courses abroad when they want a programme that fits a specific subject, length, or teaching style.",
  },
  {
    title: "A wider personal world",
    text: "Living in another country is part of the education. Daily life, friendships, and independence sit alongside the degree.",
  },
  {
    title: "Language in daily use",
    text: "Many programmes are taught in English. Learning the local language, where it differs, makes study and life outside class easier.",
  },
  {
    title: "People you would not meet at home",
    text: "Classmates, faculty, and workplaces become a network that is hard to build from a single city.",
  },
];

export const journey = [
  {
    title: "Profile and eligibility",
    text: "Grades, tests, work experience, budget, and the intake you can realistically make.",
  },
  {
    title: "Country and university shortlist",
    text: "A mix of reach, match, and safer options, chosen around the course and the country.",
  },
  {
    title: "Application preparation",
    text: "Deadlines, documents, and the order in which applications should go out.",
  },
  {
    title: "Scholarships and funding",
    text: "Where a scholarship or other funding exists, the counselling looks at merit and country-specific options. Amounts are confirmed case by case.",
  },
  {
    title: "Visa guidance",
    text: "Once an offer is in hand, preparation for that country’s student visa.",
  },
  {
    title: "Pre-departure",
    text: "Practical preparation before you travel, after the offer and visa path are clear.",
  },
];

export const services = [
  {
    title: "Course and country selection",
    text: "Matched to academic background, budget, and the direction you want after the degree.",
  },
  {
    title: "Eligibility assessment",
    text: "Your grades, test scores, and any work experience set against university requirements.",
  },
  {
    title: "University shortlisting",
    text: "A realistic list, not a catalogue of every campus that will take an application.",
  },
  {
    title: "Application planning",
    text: "Intake timing, deadlines, and the documents each application needs.",
  },
  {
    title: "Scholarship guidance",
    text: "Guidance where funding is available. Eduvert does not publish a guaranteed award.",
  },
  {
    title: "Visa and pre-departure",
    text: "Visa preparation after an offer, then the steps before you leave.",
  },
];

export const faqs = [
  {
    question: "How much does it cost to study abroad?",
    answer:
      "It depends on the destination, the university, and the programme. The USA and the UK are often more expensive. Other countries, including Canada, can cost less. A single price does not fit every student, so counselling starts from your budget rather than a published package fee.",
  },
  {
    question: "Do I need to know a foreign language to study abroad?",
    answer:
      "It depends on the country and the programme. Many universities in countries where English is not the first language still teach in English. Learning the local language can help with daily life.",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "In many countries, international students may work part-time during their studies. There is often a limit on hours. The rule belongs to the country, so it has to be checked for the destination you choose.",
  },
  {
    question: "How long can I study abroad?",
    answer:
      "Programmes run from a few weeks to a full degree of several years. The length follows the programme and the level of study.",
  },
  {
    question: "Can I stay abroad after my studies?",
    answer:
      "Some countries offer a post-study work visa for a period after the degree. Whether that applies, and for how long, depends on that country’s visa rules.",
  },
];
