import type { Exam } from "./types";
import { examVerified } from "./types";

const feeSource = "https://ieltsidpindia.com/information/ielts-test-fee";
const centreSource = "https://ielts.org/test-centres/idp-education-india-mumbai";

function listed(label: string, amountLabel: string, note?: string) {
  return {
    label,
    amountLabel,
    status: "listed" as const,
    country: "India",
    sourceLabel: "IDP IELTS India fee page",
    sourceUrl: feeSource,
    note,
  };
}

export const ielts: Exam = {
  slug: "ielts",
  name: "IELTS",
  fullName: "International English Language Testing System",
  provider: "IELTS partners, including IDP, British Council and Cambridge",
  headline: "The IELTS, explained.",
  lede: "IELTS is a four-skill English test used by universities, employers and some visa authorities. The useful question is not whether IELTS is “the” test, but which version the organisation in front of you actually accepts.",
  panelBlurb:
    "A four-skill test with a 0–9 band score. Academic and General Training are not the same product, and a UK visa may ask for a UKVI sitting.",
  bookingUrl: "https://ieltsidpindia.com/",
  bookingLabel: "Book on the official IDP IELTS India site",
  facts: [
    { label: "Test duration", value: "About 2 hours 45 minutes" },
    { label: "Score range", value: "Band 0–9, in half bands" },
    { label: "Examination mode", value: "Computer, or Writing on Paper where offered" },
    { label: "Typical results", value: "Often a few days on computer" },
    { label: "Score validity", value: "Organisations usually expect 2 years" },
    { label: "Test provider", value: "IELTS partners, booked in India via IDP" },
  ],
  overview: [
    "IELTS assesses listening, reading, writing and speaking. It is jointly owned by the British Council, IDP and Cambridge University Press & Assessment. In India, most candidates book through IDP.",
    "Universities ask for it because they want a common way to read English proficiency across countries. A published band is not an offer of admission. Each university, and sometimes each programme, sets its own overall band and its own minimum for a single skill.",
    "Some governments also accept specified IELTS versions for visas. That acceptance is never automatic. A result that satisfies a university can still be the wrong version for a visa, and the reverse is also true.",
  ],
  variantWarning:
    "These versions are not interchangeable. Academic, General Training, UKVI, Life Skills and IELTS Online answer different requests. Book the one named in your offer letter or visa guidance.",
  variants: [
    {
      title: "IELTS Academic",
      text: "The version most degree programmes ask for. Reading uses three long texts. Writing Task 1 asks you to describe visual information, such as a chart, diagram or map, in at least 150 words.",
    },
    {
      title: "IELTS General Training",
      text: "Used for many work and migration routes, and for some non-degree study. Reading starts with everyday texts. Writing Task 1 is a letter of at least 150 words. It is not a substitute for Academic when a university asks for Academic.",
    },
    {
      title: "IELTS for UKVI",
      text: "A Secure English Language Test taken at an approved centre when a UK visa route requires one. The skills match Academic or General Training, but the sitting itself has to be the UKVI version. A normal IELTS result is not relabelled as UKVI afterwards.",
    },
    {
      title: "IELTS Life Skills",
      text: "A speaking and listening test at A1 or B1, used for certain UK visa routes such as family routes. It does not produce a 0–9 Academic band and it is not a university admissions test.",
    },
    {
      title: "IELTS Online",
      text: "A remote Academic test offered in some locations. Many visa authorities, including the UK for SELT purposes and Australia for visa evidence, do not accept a fully online English test. Confirm acceptance with the university and the visa office before you book it.",
    },
    {
      title: "IELTS One Skill Retake",
      text: "After a full IELTS on computer at a centre that offers it, you may retake one skill once, within 60 days. The retake uses the same writing mode as the original test. You receive a new Test Report Form and you choose whether to use the original or the new one.",
    },
  ],
  sections: [
    {
      id: "listening",
      name: "Listening",
      purpose: "Follow spoken English in everyday and educational settings, including a conversation, a monologue, a discussion and a lecture.",
      duration: "About 30 minutes on computer, for 40 questions.",
      structure: "Four parts. The recording is played once. On computer you type the answers during the test.",
      assessment: "One mark for each correct answer. Raw scores are converted to a band from 0 to 9.",
      rules: "You cannot ask for the recording to be replayed. Spelling counts for answers that have to be written, not chosen.",
      tasks: [
        { name: "Parts 1 and 2", text: "A conversation and a monologue set in everyday social contexts." },
        { name: "Parts 3 and 4", text: "A discussion and a talk set in education or training." },
      ],
    },
    {
      id: "reading",
      name: "Reading",
      purpose: "Read for gist, detail, argument and the writer’s opinion under a time limit.",
      duration: "60 minutes, 40 questions.",
      structure: "Three sections. Academic uses three long texts. General Training moves from short practical texts to a longer passage.",
      assessment: "One mark for each correct answer, then converted to a band. Academic and General Training use different conversion tables.",
      rules: "There is no extra transfer time on computer. Answers the sheet does not accept, including unclear spelling, can be marked wrong.",
      tasks: [
        { name: "Academic texts", text: "Texts drawn from books, journals and newspapers, written for a non-specialist reader." },
        { name: "General Training texts", text: "Notices, advertisements, workplace documents and one longer descriptive text." },
        { name: "Question types", text: "Multiple choice, identifying information, matching headings, sentence completion, summary completion, and short-answer questions." },
      ],
    },
    {
      id: "writing",
      name: "Writing",
      purpose: "Produce clear written English for a specific reader, at a length the task sets.",
      duration: "60 minutes for two tasks. Spend about 20 minutes on Task 1 and about 40 on Task 2.",
      structure: "Task 2 is an essay of at least 250 words in both Academic and General Training. Task 1 differs.",
      assessment: "Trained examiners mark task response, coherence, vocabulary and grammar. Task 2 carries more weight than Task 1.",
      rules: "Under-length answers lose marks. Copying the question, or a memorised essay that does not answer it, is penalised. Writing on Paper, where a centre offers it, shows the tasks on screen and collects the answers by hand. The tasks and the timing do not change.",
      tasks: [
        { name: "Academic Task 1", text: "Describe visual information in at least 150 words. You summarise the main features. You do not explain causes the graphic does not show." },
        { name: "General Training Task 1", text: "Write a letter of at least 150 words in a style the situation asks for: formal, semi-formal or personal." },
        { name: "Task 2", text: "An essay of at least 250 words that answers the question asked, with a position and supporting points." },
      ],
    },
    {
      id: "speaking",
      name: "Speaking",
      purpose: "Hold a spoken conversation with an examiner, from familiar topics to a short individual talk.",
      duration: "11–14 minutes, face to face with an examiner. It may be on the same day as the written papers or on another day.",
      structure: "Three parts. The examiner records the interview.",
      assessment: "Examiners mark fluency, vocabulary, grammar and pronunciation against the public band descriptors.",
      rules: "This is not a computer-delivered speaking section. Accent is not marked. You are marked on how clearly and fully you respond.",
      tasks: [
        { name: "Part 1", text: "Short questions about familiar topics such as home, work or study." },
        { name: "Part 2", text: "One minute to prepare, then up to two minutes speaking on a topic card. The examiner may ask a short follow-up." },
        { name: "Part 3", text: "A longer discussion of the ideas behind the Part 2 topic." },
      ],
    },
  ],
  scoring: {
    intro:
      "Each skill receives a band from 0 to 9, including half bands such as 6.5. The overall band is the average of the four skills, rounded to the nearest half band. A quarter band (.25) rounds up to the next half, and a three-quarter band (.75) rounds up to the next whole band.",
    points: [
      {
        title: "Overall and section bands are different requirements",
        text: "A university can ask for 6.5 overall and no skill below 6.0. Meeting the overall band does not repair a skill that falls short.",
      },
      {
        title: "There is no universal pass mark",
        text: "IELTS does not set a pass score. The organisation receiving the result decides what is enough.",
      },
      {
        title: "What the bands are for",
        text: "Band 9 is an expert user, 8 a very good user, 7 a good user, 6 a competent user and 5 a modest user. The published descriptors explain the difference. They are not a promise that a given band will satisfy a given visa.",
      },
    ],
    markers: [
      { label: "0", note: "Did not attempt" },
      { label: "5", note: "Modest" },
      { label: "6", note: "Competent" },
      { label: "7", note: "Good" },
      { label: "8", note: "Very good" },
      { label: "9", note: "Expert" },
    ],
    caveat:
      "Do not treat an IELTS band as equal to a TOEFL or PTE score. Providers publish research concordances with limits. Only the receiving institution can say which score it will accept.",
  },
  countries: [
    {
      name: "United Kingdom",
      href: "/study-in-united-kingdom",
      admission: "Many universities accept IELTS Academic. The offer letter states the overall band and any skill minimum. General Training is not a substitute when the offer names Academic.",
      immigration: "A Student visa or another route that requires a Secure English Language Test needs IELTS for UKVI, taken at an approved SELT centre. Life Skills is for specific visa routes, not for a degree offer. Check GOV.UK for the route you are using.",
      atHome: "IELTS Online is not a UKVI SELT. Do not book it for a visa that asks for a SELT.",
    },
    {
      name: "United States",
      href: "/study-in-usa",
      admission: "Many US universities accept IELTS Academic. There is no national cut-off. The graduate or undergraduate admissions page of that university is the requirement.",
      immigration: "A student visa decision is separate from the university’s English score. The score does not by itself grant a visa.",
      atHome: "Ask the university whether it accepts IELTS Online before you book a remote test.",
    },
    {
      name: "Canada",
      href: "/study-in-canada",
      admission: "Universities that ask for IELTS usually want Academic. Confirm the programme page, including any skill minimum.",
      immigration: "IRCC uses designated language tests for specific immigration pathways, and the accepted version is not always the academic test. IELTS General Training is the version named for some economic immigration programmes. A university’s Academic result does not automatically satisfy that pathway. Read the current IRCC page for the programme.",
      atHome: "IRCC has not treated a fully online language test as visa evidence. Confirm the current list before you book.",
    },
    {
      name: "Australia",
      href: "/study-in-australia",
      admission: "Australian universities commonly accept IELTS Academic, with their own scores. The offer, not a general country rule, is what you prepare for.",
      immigration: "Home Affairs accepts specified IELTS Academic and General Training results, including One Skill Retake, when the test was taken at a secure centre and the visa’s score and date rules are met. Those scores are set by the visa subclass. This page does not reprint them.",
      atHome: "Home Affairs does not accept English tests delivered completely online, and it names IELTS Online as an example.",
    },
    {
      name: "Ireland",
      href: "/study-in-ireland",
      admission: "Irish universities set their own IELTS Academic requirements. A foundation or pathway programme can ask for a different band from the degree that follows it.",
      immigration: "A student-permission rule is not the same document as the university offer. Check both.",
      atHome: "Confirm whether the college accepts a remote IELTS result. Do not assume it does.",
    },
    {
      name: "Germany",
      admission: "German universities that teach in English often accept IELTS Academic, and they publish the band on the programme page. Some still require German for the visa or for enrolment even when the course is in English.",
      immigration: "There is no single German national IELTS score for every programme. Use the university’s requirement and the mission’s current visa checklist.",
      atHome: "Ask the university before booking IELTS Online.",
    },
    {
      name: "New Zealand",
      href: "/study-in-new-zealand",
      admission: "Universities publish their own IELTS Academic bands, sometimes with a writing minimum that is higher than the other skills.",
      immigration: "Immigration New Zealand names the tests and the scores it accepts for each visa. Those figures change. Use the current INZ page rather than a blog summary.",
      atHome: "Confirm both the university and INZ before booking a remote test.",
    },
  ],
  eligibility: [
    {
      title: "Who can book",
      text: "IELTS is open to people who can present an accepted identity document. There is no educational qualification you must hold before you register.",
    },
    {
      title: "Age",
      text: "The partners do not set a universal minimum age for Academic or General Training. A test centre may apply its own rule for very young candidates, and the test is designed with adult and young-adult tasks. Ask the centre if you are booking for someone under 16.",
    },
    {
      title: "Identity",
      text: "In India, the passport used at registration is the document you bring on test day. The name must match. A result issued in a different name is a problem for universities and visas.",
    },
    {
      title: "Access arrangements",
      text: "Extra time, enlarged print and other arrangements exist, but they have to be requested and approved before the test. They are not arranged on the day.",
    },
  ],
  fees: [
    listed("IELTS on computer, Academic or General Training", "₹19,000"),
    listed("IELTS Writing on Paper, Academic or General Training", "₹19,000", "Listening, Reading and Speaking stay on the computer-delivered test. Only Writing is handwritten."),
    listed("IELTS for UKVI", "₹19,250"),
    listed("IELTS on computer for UKVI", "₹19,250"),
    listed("IELTS Life Skills, A1 and B1", "₹18,000"),
    listed("One Skill Retake", "₹12,650"),
    listed("Transfer, IELTS on computer or Writing on Paper", "₹4,750"),
    listed("Transfer, IELTS for UKVI or on computer for UKVI", "₹4,850"),
    listed("Transfer, Life Skills", "₹4,500"),
    listed("Transfer, One Skill Retake", "₹3,200"),
    listed("Enquiry on Results, on computer or Writing on Paper", "₹14,250"),
    listed("Enquiry on Results, UKVI", "₹14,400"),
    listed("Enquiry on Results, Life Skills", "₹13,500"),
    listed("Enquiry on Results, One Skill Retake", "₹9,450"),
  ],
  feeNote:
    "These rupee figures are the ones IDP IELTS India and the IDP Mumbai centre listing on ielts.org showed on 12 November 2026. The same standard fee was listed across Indian centres on that page. IDP says prices can change and can include local tax. Cancellation terms depend on the test type and how close the date is. Read the fee page and the terms on your booking before you pay. The Mumbai centre listing is a second official check for the main test fees.",
  lastVerified: examVerified,
  steps: [
    { title: "Choose the correct examination", text: "Match the name in the offer or the visa guidance: Academic, General Training, UKVI, or Life Skills." },
    { title: "Choose the delivery", text: "Computer is the standard. Writing on Paper is an option in selected markets from mid-2026, and it is not available for UKVI." },
    { title: "Create the booking account", text: "Register on the official IDP IELTS India site, or the British Council if that is the centre you are using. Use the passport name." },
    { title: "Pick a centre and a date", text: "Confirm that the centre offers the version you need, including One Skill Retake if you want that option later." },
    { title: "Upload the passport", text: "IDP asks for a clear colour scan of the passport as part of the application." },
    { title: "Pay and read the confirmation", text: "Pay only on the official site. Check the test type, the date, and the speaking appointment when it arrives." },
  ],
  testDay: [
    { title: "What to bring", text: "The same passport used to register. The centre’s confirmation email tells you if anything else is required. Leave notes and electronic devices outside the room." },
    { title: "Arrival", text: "Arrive at the time on the confirmation. Late arrival can be refused. Identity is checked before you start, including a photograph." },
    { title: "Speaking", text: "You sit with an examiner, not at a recorded prompt. The speaking test can be scheduled on a different day from the other papers." },
    { title: "Writing on Paper", text: "If you booked that option, the writing tasks appear on screen and you handwrite the answers. The other skills stay on computer." },
  ],
  results: [
    { title: "When they arrive", text: "Computer results are often ready in a few days. Writing on Paper is published by IELTS as within five days. Paper-based timings, where a centre still offers that older sitting, are longer. The date in your confirmation is the one to use." },
    { title: "The Test Report Form", text: "You receive a form with four skill bands and an overall band. You choose which institutions receive it through the process your centre describes. A university can also verify a result directly." },
    { title: "How long it is used", text: "IELTS recommends that organisations treat a result as current for two years, because language ability changes. The organisation can set a shorter window. The form itself does not expire on a single worldwide date." },
    { title: "A review", text: "An Enquiry on Results asks for a remark. IDP India lists a fee, refunded if the band changes. There is a deadline. Ask the centre as soon as the result arrives if you are considering it." },
    { title: "A retake", text: "You can book a full test again, or, where the centre offers it, one One Skill Retake within 60 days of that original computer test. Only one One Skill Retake is allowed per original test." },
  ],
  faqs: [
    {
      question: "Which is the right choice, Academic or General Training?",
      answer: "Academic is the usual request for a degree. General Training is the usual request for many work and migration routes. If the offer or the visa page names one of them, that is the one to book. They are scored on the same 0–9 scale, but the reading and the first writing task are different.",
    },
    {
      question: "Is a normal IELTS result accepted as IELTS for UKVI?",
      answer: "No. UKVI is a separate booking at a Secure English Language Test centre. The skills look the same. The administrative conditions do not. If the visa guidance says UKVI or SELT, a standard Test Report Form will not replace it.",
    },
    {
      question: "Is there a passing score?",
      answer: "No. IELTS reports a band. The university or the visa authority decides the minimum, including any skill that cannot fall below a stated band.",
    },
    {
      question: "How is the overall band calculated?",
      answer: "Average the four skill bands and round to the nearest half band. An average ending in .25 rounds up to the next half band. An average ending in .75 rounds up to the next whole band.",
    },
    {
      question: "Is speaking with a person?",
      answer: "Yes. The speaking test is an interview with an examiner, in three parts, and it is recorded. It is not a set of recorded prompts on a computer.",
    },
    {
      question: "What is One Skill Retake?",
      answer: "It lets you repeat one skill within 60 days of a full IELTS on computer, once only, at a centre that offers it. The writing mode has to match the original test. You can then choose the original form or the new one.",
    },
    {
      question: "How long is a result valid?",
      answer: "Organisations are advised to accept a result for two years. A university or a visa office can ask for a more recent test. Check the date on the form against their rule.",
    },
    {
      question: "Will IELTS Online work for my visa?",
      answer: "Often it will not. UKVI and Australian visa evidence, among others, do not accept a fully online English test. Ask the specific office before you pay for a remote sitting.",
    },
    {
      question: "How do I share the result?",
      answer: "The Test Report Form is the official record. Centres explain how to send it to institutions, and recognising organisations can verify it. Keep the form details exactly as they are printed.",
    },
  ],
  references: [
    { label: "IELTS", href: "https://ielts.org/" },
    { label: "Updates to IELTS test delivery", href: "https://ielts.org/news-and-insights/updates-to-ielts-test-delivery" },
    { label: "One Skill Retake", href: "https://ielts.org/take-a-test/booking-your-test/one-skill-retake" },
    { label: "IDP IELTS India fees", href: feeSource },
    { label: "IDP Mumbai centre listing", href: centreSource },
    { label: "UK SELT guidance", href: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt" },
  ],
  compare: {
    provider: "IELTS partners; IDP in India",
    format: "Listening, Reading, Writing, Speaking",
    duration: "About 2 hours 45 minutes",
    score: "Band 0–9",
    results: "Often a few days on computer",
    validity: "Usually treated as 2 years",
    delivery: "Computer; Writing on Paper in selected markets",
    fee: "₹19,000 Academic or General Training",
    use: "Degree admissions and some visas, if the version matches",
  },
  alternatives: [
    {
      slug: "toefl",
      difference: "TOEFL iBT is delivered on computer, including speaking, and from January 2026 it reports a 1–6 scale rather than a 0–9 band.",
    },
    {
      slug: "pte",
      difference: "PTE Academic is a single computer sitting of about two hours, with speaking and writing combined, and a 10–90 score.",
    },
  ],
  seo: {
    title: "IELTS explained | Eduvert",
    description:
      "How IELTS Academic, General Training and UKVI differ, how the 0–9 band is calculated, and what IDP India listed for fees on 12 November 2026.",
  },
};
