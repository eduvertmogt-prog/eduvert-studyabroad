import type { Exam } from "./types";
import { examVerified } from "./types";

const pearsonFees = "https://www.pearsonpte.com/test-centers-and-fees";
const pearsonUpdates = "https://www.pearsonpte.com/pte-updates-2025/";

export const pte: Exam = {
  slug: "pte",
  name: "PTE",
  fullName: "PTE Academic",
  provider: "Pearson",
  headline: "PTE Academic, made clear.",
  lede: "PTE Academic is a computer-based English test of about two hours. From 7 August 2025 it includes two extra speaking tasks. The score runs from 10 to 90. It is not the same booking as PTE Core, PTE Academic UKVI, or PTE Home.",
  panelBlurb:
    "Three timed sections on a computer, a 10–90 score, and a result that is usually ready within a few days. The version name on the booking has to match the request.",
  bookingUrl: "https://www.pearsonpte.com/",
  bookingLabel: "Book on the official Pearson PTE site",
  facts: [
    { label: "Test duration", value: "About 2 hours" },
    { label: "Score range", value: "10–90" },
    { label: "Examination mode", value: "Secure test centre" },
    { label: "Typical results", value: "Often within a few days" },
    { label: "Score validity", value: "Receivers usually expect 2 years" },
    { label: "Test provider", value: "Pearson" },
  ],
  overview: [
    "PTE Academic tests speaking, writing, reading and listening in one computer sitting. Pearson scores the responses with an automated system. A human review can be requested afterwards under Pearson’s rescore rules.",
    "Universities use the overall score and, often, one or more communicative skill scores. An overall 65 with a lower writing score can miss an offer that sets both. The programme page is the requirement.",
    "Pearson also runs PTE Academic UKVI, PTE Core and PTE Home. They serve different decisions. A strong Academic score does not become a UKVI or a Core result because the number looks similar.",
  ],
  variantWarning:
    "Book the product named in the offer or the visa page. Academic, Academic UKVI, Core and Home are not interchangeable, and a home test is not the academic test taken at a centre.",
  variants: [
    {
      title: "PTE Academic",
      text: "The test this page describes. It is the version universities usually mean. From 7 August 2025 it includes Summarize Group Discussion and Respond to a Situation. Australia can accept a centre sitting for some visas. That is a visa rule, not a reason to ignore the university’s own score.",
    },
    {
      title: "PTE Academic UKVI",
      text: "A Secure English Language Test for UK visa routes that require one. The academic tasks are the UKVI secure sitting, not a normal PTE Academic result renamed later. The 2025 speaking updates apply to this test as well.",
    },
    {
      title: "PTE Core",
      text: "A different Pearson test used for some Canadian immigration pathways. It is not the test a university means when it asks for PTE Academic, and an Academic score is not automatically an immigration result.",
    },
    {
      title: "PTE Home",
      text: "Shorter tests at CEFR levels such as A1, A2 and B1, used for some UK family and settlement routes. They do not produce the 10–90 Academic score a degree programme asks for.",
    },
  ],
  sections: [
    {
      id: "speaking-writing",
      name: "Speaking & Writing",
      purpose: "Speak and write in the same section, including reading aloud, describing what you see, and responding to a situation.",
      duration: "The longest of the three sections. The full test is about two hours, and this part takes the largest share.",
      structure: "Personal introduction is recorded but not scored. Scored tasks include the two types added in August 2025. Pearson’s updated specification uses more items than the older 52-item test. Exact counts on your form can still vary.",
      assessment: "Most speaking and writing is scored by the automated system. The communicative scores for speaking and writing are reported separately from the overall score.",
      rules: "You wear a headset. Speak when the microphone is open. A silent recording is a missed answer. Short preparation times are part of the task, not extra time you can save up.",
      tasks: [
        { name: "Read Aloud", text: "A short text appears. You read it aloud as accurately and as smoothly as you can." },
        { name: "Repeat Sentence", text: "You hear a sentence once and repeat it. The task is memory and accuracy." },
        { name: "Describe Image", text: "A graph, picture or process appears. You describe the main information in the time given." },
        { name: "Retell Lecture", text: "You hear a lecture, take notes, and retell the main points." },
        { name: "Answer Short Question", text: "You hear a question and give a short spoken answer." },
        { name: "Summarize Group Discussion", text: "You hear three people discussing an academic topic, then summarise the discussion aloud.", marker: "Added 7 August 2025" },
        { name: "Respond to a Situation", text: "You read and hear a situation, then say what you would say in it.", marker: "Added 7 August 2025" },
        { name: "Summarize Written Text", text: "You read a passage and write a one-sentence summary." },
        { name: "Write Essay", text: "You write an essay of the length the task states, on the prompt on screen." },
      ],
    },
    {
      id: "reading",
      name: "Reading",
      purpose: "Read academic English and answer by choosing, reordering or filling gaps.",
      duration: "A timed block inside the two-hour test. The on-screen timer for the section is the one that counts.",
      structure: "Five scored task types. Fill-in-the-blank items come in two different formats. They are not the same task.",
      assessment: "Some items award partial credit. Multiple-answer questions can penalise a wrong choice. The section contributes to the reading score and to the overall score.",
      rules: "Do not leave a multiple-answer item blank if you can eliminate options, and do not select every option. The instructions on screen say how that item is marked.",
      tasks: [
        { name: "Reading & Writing: Fill in the Blanks", text: "A text with gaps. You choose the word for each gap from a drop-down list." },
        { name: "Multiple Choice, Multiple Answers", text: "More than one option is correct. Wrong selections can cost a mark." },
        { name: "Re-order Paragraphs", text: "Sentences of a paragraph are shuffled. You put them back in order." },
        { name: "Reading: Fill in the Blanks", text: "A text with gaps and a list of words. You drag the word into the gap. This is not the drop-down task." },
        { name: "Multiple Choice, Single Answer", text: "One correct option for a question on a short text." },
      ],
    },
    {
      id: "listening",
      name: "Listening",
      purpose: "Follow lectures, conversations and shorter clips, then summarise, complete or correct what you heard.",
      duration: "The final timed section. Audio plays once.",
      structure: "Eight scored task types, from a written summary of a lecture to dictation of a sentence.",
      assessment: "A mix of partial-credit and single-mark items. Listening contributes its own communicative score.",
      rules: "Take notes when the task allows it. Spelling matters for words you type. You cannot replay the clip.",
      tasks: [
        { name: "Summarize Spoken Text", text: "You hear a recording and write a summary of a set length." },
        { name: "Multiple Choice, Multiple Answers", text: "More than one answer can be correct, with the same caution about extra selections." },
        { name: "Fill in the Blanks", text: "A transcript appears with gaps while you listen. You type the missing words." },
        { name: "Highlight Correct Summary", text: "After a recording, you choose the summary that matches it." },
        { name: "Multiple Choice, Single Answer", text: "One correct answer to a question on the recording." },
        { name: "Select Missing Word", text: "The recording ends early. You choose the word or phrase that best completes it." },
        { name: "Highlight Incorrect Words", text: "You hear a recording and see a transcript. You select the words that differ from what was said." },
        { name: "Write from Dictation", text: "You hear a sentence and type it exactly." },
      ],
    },
  ],
  scoring: {
    intro:
      "PTE Academic reports an overall score from 10 to 90, and four communicative scores on the same scale: listening, reading, speaking and writing. The overall score is not a figure you can rebuild by averaging the four skills yourself. Pearson’s scoring model uses the whole test, including tasks that draw on more than one skill.",
    points: [
      {
        title: "Why the overall score can differ from a skill",
        text: "Integrated tasks feed more than one skill. A university that asks for 65 overall and 60 in each skill is setting five conditions, not one.",
      },
      {
        title: "Automated scoring, and a human review",
        text: "The result you receive is produced by Pearson’s automated scoring. Pearson offers a rescore, reviewed by a person, under the rules and the fee shown when you request it. This page does not quote that fee, because Pearson does not publish it as a fixed rupee amount on a static India price list.",
      },
      {
        title: "Enabling skills",
        text: "The report can also show grammar, oral fluency, pronunciation, spelling, vocabulary and written discourse. Institutions rarely set a cut-off on those lines. They are a description, not a second overall score.",
      },
    ],
    markers: [
      { label: "10", note: "Bottom of the scale" },
      { label: "36", note: "Not a pass mark" },
      { label: "50", note: "Programme rules differ" },
      { label: "65", note: "Often requested, never universal" },
      { label: "90", note: "Top of the scale" },
    ],
    caveat:
      "A PTE score of 65 is not a published equivalent of an IELTS 6.5 or a TOEFL band. Concordance studies exist and they have limits. Use the score the university printed for PTE, not a conversion.",
  },
  countries: [
    {
      name: "United Kingdom",
      href: "/study-in-united-kingdom",
      admission: "Many universities accept PTE Academic and publish an overall score plus skill minima. That acceptance is for the offer.",
      immigration: "A visa route that needs a SELT requires PTE Academic UKVI at an approved centre, not a standard Academic booking. PTE Home covers some family routes at a stated CEFR level. Neither replaces the other.",
      atHome: "PTE Home is a different product. It is not a way to take PTE Academic remotely for a degree.",
    },
    {
      name: "United States",
      href: "/study-in-usa",
      admission: "A growing number of US universities accept PTE Academic. There is no national score. Use the department’s page.",
      immigration: "The student visa is a separate decision from the English score the university set.",
      atHome: "PTE Academic is a centre test. Do not book a different Pearson product and expect it to be read as Academic.",
    },
    {
      name: "Canada",
      href: "/study-in-canada",
      admission: "Where a Canadian university accepts PTE, it is usually PTE Academic, with the score on the programme page.",
      immigration: "IRCC has designated PTE Core for some immigration pathways. Core is not Academic. An Academic result used for a study application does not automatically meet a pathway that names Core. Read the current IRCC list.",
      atHome: "Immigration pathways that name a secure test will not treat an at-home product as the same evidence.",
    },
    {
      name: "Australia",
      href: "/study-in-australia",
      admission: "Australian universities commonly accept PTE Academic and publish their own scores, sometimes with a skill minimum.",
      immigration: "Home Affairs accepts PTE Academic taken at a secure centre for tests on or after 7 August 2025, within the visa’s own score and date rules. Those scores are not reprinted here. The August 2025 test update is the version that date refers to.",
      atHome: "Home Affairs does not accept English tests delivered completely online.",
    },
    {
      name: "Ireland",
      href: "/study-in-ireland",
      admission: "Irish institutions that accept PTE Academic publish the score with the course. A pathway year can differ from the degree.",
      immigration: "Check the student-permission guidance as well as the college page.",
      atHome: "Assume a centre test unless the college has said otherwise in writing.",
    },
    {
      name: "Germany",
      admission: "English-taught programmes sometimes list PTE Academic next to IELTS or TOEFL. The number is the programme’s, not a German national score.",
      immigration: "Use the university letter and the visa checklist together. German-language proof is a separate question.",
      atHome: "Book a centre test unless the programme has accepted something else.",
    },
    {
      name: "New Zealand",
      href: "/study-in-new-zealand",
      admission: "Universities that accept PTE Academic publish overall and sometimes skill scores. Writing is a common minimum.",
      immigration: "Immigration New Zealand publishes its own accepted tests and scores. A university offer does not set the visa score.",
      atHome: "Use the centre test unless both the university and Immigration New Zealand have said otherwise.",
    },
  ],
  eligibility: [
    {
      title: "Who can book",
      text: "PTE Academic is open to candidates who can register with a valid passport. Pearson does not require a prior qualification.",
    },
    {
      title: "Age",
      text: "Pearson does not set a single worldwide minimum age on the public test pages. The tasks are written for study and work. If you are under 18, ask the centre about consent and whether the sitting is appropriate.",
    },
    {
      title: "Identity",
      text: "The passport used to book is the passport you bring. The name, including middle names, has to match. Pearson checks a photograph and biometric data at a centre.",
    },
    {
      title: "Arrangements",
      text: "Extra time and other arrangements must be approved before the test. They are requested through Pearson, not on the day.",
    },
  ],
  fees: [
    {
      label: "PTE Academic in India",
      amountLabel: null,
      status: "confirm",
      country: "India",
      sourceLabel: "Pearson test centres and fees",
      sourceUrl: pearsonFees,
      note: "Pearson shows the India price inside its fee finder after you choose the country and the test. It is not a single figure this page can honestly freeze. Read the price on that page on the day you book.",
    },
    {
      label: "PTE Academic UKVI, PTE Core and PTE Home in India",
      amountLabel: null,
      status: "confirm",
      country: "India",
      sourceLabel: "Pearson test centres and fees",
      sourceUrl: pearsonFees,
      note: "These are different products. Their India prices are on the same finder. Do not assume they cost the same as Academic.",
    },
  ],
  feeNote:
    "On 12 November 2026 Pearson’s public fee page confirmed that prices are in local currency, vary by country and test type, and appear before you pay. It did not publish a stable India rupee figure in the page text, so this guide does not invent one. Reschedule and cancellation terms are shown in the booking flow. Read them there. A rescore, if you request one, is priced when Pearson offers it.",
  lastVerified: examVerified,
  steps: [
    { title: "Name the right test", text: "Academic for most degrees. Academic UKVI only when the UK route requires a SELT. Core only when IRCC names Core. Home only for the CEFR level that route uses." },
    { title: "Create a Pearson account", text: "Use the passport name, including middle names in the given-name field if that is how the passport prints them." },
    { title: "Find a centre", text: "Search India on Pearson’s test-centre page. UKVI and Home tests are limited to approved centres." },
    { title: "Read the price", text: "The fee finder shows the amount for that test and country before you pay. That amount is the fee. This page will not guess it." },
    { title: "Choose a date", text: "Pearson allows booking close to the test date, subject to seats. The terms on the screen say how close, and what a late cancellation costs." },
    { title: "Pay Pearson", text: "Pay on the Pearson site. Keep the confirmation, the test name, and the centre address." },
  ],
  testDay: [
    { title: "Passport and arrival", text: "Arrive at the time in the confirmation, commonly with time to spare for check-in. Bring the passport used to book." },
    { title: "Check-in", text: "Centres photograph you and take biometric data, which can include a palm-vein scan. Personal items go into a locker." },
    { title: "Headset", text: "Pearson provides a headset. Speaking is recorded. Writing is typed. There is no examiner interview." },
    { title: "A break", text: "PTE Academic includes a short optional break. Leave only when the test offers it." },
    { title: "What you cannot take in", text: "Notes, phones, watches and study material stay outside. The centre’s list on the day is the one that applies." },
  ],
  results: [
    { title: "When they arrive", text: "Pearson usually posts score reports within a few days. The account is the confirmation. A result can take longer if it is under review." },
    { title: "What you can send", text: "From the Pearson account you send the report to institutions. Sending is part of Pearson’s process, not a separate Eduvert service." },
    { title: "How long receivers use it", text: "Universities and visa offices commonly want a test taken within two years. Confirm the window on their page. Pearson’s account access is not the same thing as a visa’s validity rule." },
    { title: "A rescore", text: "You can ask Pearson to rescore a test under its published deadline and fee. If you are going to ask, do it from the account as soon as the score appears, because the window is short." },
    { title: "Another test", text: "You can book again. There is no IELTS-style one-skill retake on PTE Academic. A new attempt is a full test, and the cancellation terms of the old booking still apply." },
  ],
  faqs: [
    {
      question: "What is the difference between PTE Academic and PTE Core?",
      answer: "Academic is the study test, scored 10–90, and it is the one universities usually name. Core is a different test used for some Canadian immigration pathways. A score in one does not satisfy a request for the other.",
    },
    {
      question: "When do I need PTE Academic UKVI?",
      answer: "When a UK visa route requires a Secure English Language Test and you have chosen Pearson’s SELT. A normal PTE Academic booking, even with a high score, is not that test.",
    },
    {
      question: "How does the scoring work?",
      answer: "An automated system scores the test and reports 10–90 overall plus four communicative skills. You cannot recalculate the overall score by averaging those four. A human rescore can be requested under Pearson’s rules.",
    },
    {
      question: "What was added in August 2025?",
      answer: "From 7 August 2025, Speaking & Writing includes Summarize Group Discussion and Respond to a Situation. The same update applies to PTE Academic UKVI. The test is still about two hours.",
    },
    {
      question: "How long is a score used?",
      answer: "Most universities and visa authorities want a test from the last two years. The exact window is theirs. Check it against the date on the report.",
    },
    {
      question: "Can I retake one section?",
      answer: "No. PTE Academic does not offer a one-skill retake. A second attempt is a full test and a new booking.",
    },
    {
      question: "Can I take PTE Academic at home?",
      answer: "The academic test is taken at a Pearson centre. PTE Home is a different, lower-stakes product for some UK visa routes. It will not meet a request for PTE Academic.",
    },
    {
      question: "How do institutions receive the score?",
      answer: "You send it from your Pearson account to the institutions you choose. They can also verify a report. Send the Academic report only where Academic was requested.",
    },
    {
      question: "Does one score work for every country?",
      answer: "No. The UK may need UKVI, Canada may need Core for a specific immigration pathway, and Australia’s visa settings name PTE Academic at a centre. Read the page that will actually receive the result.",
    },
  ],
  references: [
    { label: "Pearson PTE", href: "https://www.pearsonpte.com/" },
    { label: "August 2025 updates", href: pearsonUpdates },
    { label: "Test centres and fees", href: pearsonFees },
    { label: "Australian visa English tests", href: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language" },
    { label: "UK SELT guidance", href: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt" },
  ],
  compare: {
    provider: "Pearson",
    format: "Speaking & Writing, Reading, Listening",
    duration: "About 2 hours",
    score: "10–90",
    results: "Often within a few days",
    validity: "Usually treated as 2 years",
    delivery: "Secure test centre",
    fee: "Confirm the India fee with Pearson",
    use: "Degree admissions; UKVI or Core only when that product is named",
  },
  alternatives: [
    {
      slug: "ielts",
      difference: "IELTS separates the four skills and tests speaking with an examiner, on a 0–9 band.",
    },
    {
      slug: "toefl",
      difference: "TOEFL iBT, from January 2026, reports 1–6 and can be taken at home where the receiver allows it.",
    },
  ],
  seo: {
    title: "PTE Academic, made clear | Eduvert",
    description:
      "PTE Academic after the August 2025 changes: the three sections, the 10–90 score, how it differs from Core and UKVI, and where to confirm the India fee.",
  },
};
