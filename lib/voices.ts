/**
 * Drafted homepage lines for the study-abroad guidance layout.
 * The names match students who have a published Eduvert review.
 * The sentences below were written for this section. They are not those
 * students' published words, and they are not verified testimonials.
 * Replace them with real study-abroad reviews before treating this as public proof.
 *
 * No admissions, visa, scholarship, or university outcome is claimed.
 */

export const voicesHref = "https://www.eduvert.co/testimonials/";

export type Voice = {
  id: string;
  name: string;
  quote: string;
  source: "Eduvert";
  sourceLabel: "Study abroad guidance";
};

export const voices: Voice[] = [
  {
    id: "sabaali-khan",
    name: "Sabaali Khan",
    quote: "The counselling made the next step clear before I chose a country.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
  {
    id: "rahil-kazi",
    name: "Rahil Kazi",
    quote: "I left knowing which questions to ask.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
  {
    id: "vinay-kashid",
    name: "Vinay Kashid",
    quote: "They walked me through documents, deadlines, and budget.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
  {
    id: "tejas-dandekar",
    name: "Tejas Dandekar",
    quote: "Sandeep sir explained the path in an order I could follow.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
  {
    id: "nihad-ubare",
    name: "Nihad Ubare",
    quote: "The advice stayed practical, across fit, cost, and timing.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
  {
    id: "sidd",
    name: "Sidd",
    quote: "I finally understood how to prepare, one step at a time.",
    source: "Eduvert",
    sourceLabel: "Study abroad guidance",
  },
];
