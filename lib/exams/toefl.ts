import type { Exam } from "./types";
import { examVerified } from "./types";

const feeSource = "https://www.in.ets.org/toefl/test-takers/ibt/register/fees.html";
const bulletin = "https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-bulletin.pdf";

function listed(label: string, amountLabel: string, note?: string) {
  return {
    label,
    amountLabel,
    status: "listed" as const,
    country: "India",
    sourceLabel: "ETS India TOEFL iBT fees",
    sourceUrl: feeSource,
    note,
  };
}

export const toefl: Exam = {
  slug: "toefl",
  name: "TOEFL",
  fullName: "TOEFL iBT",
  provider: "ETS",
  headline: "Understand the new TOEFL.",
  lede: "From 21 January 2026, TOEFL iBT uses a shorter, updated test and a 1–6 score scale. Older 0–120 totals still appear on reports for a transition period. They are no longer the only score the test produces.",
  panelBlurb:
    "A four-skill computer test. Reading and Listening adapt. The score you plan around is 1–6, with a comparable 0–120 overall printed for two years.",
  bookingUrl: "https://www.ets.org/toefl/test-takers/ibt/register.html",
  bookingLabel: "Register on the official ETS TOEFL site",
  facts: [
    { label: "Test duration", value: "About 2 hours of tasks, plus check-in" },
    { label: "Score range", value: "1–6, in half points" },
    { label: "Examination mode", value: "Test centre or Home Edition" },
    { label: "Typical results", value: "About 3 days in your ETS account" },
    { label: "Score validity", value: "2 years" },
    { label: "Test provider", value: "ETS" },
  ],
  overview: [
    "TOEFL iBT is ETS’s test of academic English in reading, listening, writing and speaking. Universities use it as one part of an application. It does not, by itself, admit you or grant a visa.",
    "The version that started on 21 January 2026 keeps the four skills and changes the tasks. Reading and Listening are multistage: later questions depend on how earlier ones went. Writing and Speaking use the task types listed on this page, not the older independent-essay pattern.",
    "ETS also offers other products, including TOEFL Essentials and the institutional TOEFL ITP. A score from one is not a score from another. If an offer says TOEFL iBT, that is the test to book.",
  ],
  variantWarning:
    "Test-centre and Home Edition scores are both TOEFL iBT, but they are not accepted in the same places. Australian visas require a specific registration path at a centre. A Home Edition result is not a workaround.",
  variants: [
    {
      title: "TOEFL iBT at a test centre",
      text: "The standard sitting, taken under ETS centre rules with a passport check. This is the version to choose when a visa authority requires a secure centre.",
    },
    {
      title: "TOEFL iBT Home Edition",
      text: "The same updated test, taken at home with a remote proctor and ETS equipment rules. Some universities accept it. Some visas do not. Australia’s Department of Home Affairs does not accept at-home English tests.",
    },
    {
      title: "Taking TOEFL for Australia",
      text: "Home Affairs says that for an Australian visa you must select “Taking TOEFL for Australia” when you register, and sit at a secure centre. A result that was not registered that way may be refused for the visa, even if a university would have read it.",
    },
    {
      title: "Other TOEFL tests",
      text: "TOEFL Essentials is a different, shorter test. TOEFL ITP is an institutional test and is not the iBT score universities and visa offices usually mean. Do not book either of them as a replacement unless the written requirement names them.",
    },
  ],
  sections: [
    {
      id: "reading",
      name: "Reading",
      purpose: "Read academic and everyday English closely enough to complete words, short practical texts and a longer passage.",
      duration: "ETS estimates about 18–27 minutes. That is task time, not the time you spend in the centre.",
      structure: "A multistage section. The tasks are Complete the Words, Read in Daily Life, and Read an Academic Passage. Item counts can include unscored pretest material and can change.",
      assessment: "The section is reported as a band from 1 to 6, in half-point steps.",
      rules: "Because the section adapts, you cannot move back through it in the way an older linear test allowed. Follow the on-screen instructions for that module.",
      tasks: [
        { name: "Complete the Words", text: "A passage with missing pieces of words. You complete them from the context." },
        { name: "Read in Daily Life", text: "Short practical texts, such as a notice or a message, with questions on the meaning." },
        { name: "Read an Academic Passage", text: "A longer academic text and questions on its argument and detail." },
      ],
    },
    {
      id: "listening",
      name: "Listening",
      purpose: "Understand a short response, a conversation, an announcement and an academic talk.",
      duration: "ETS estimates about 18–27 minutes of task time.",
      structure: "Also multistage. You hear the audio once.",
      assessment: "Reported on the same 1–6 scale as the other skills.",
      rules: "Headsets are provided at a centre. Volume is checked before the section starts. Pretest items, if you receive them, are not labelled.",
      tasks: [
        { name: "Listen and Choose a Response", text: "A short remark, then a choice of the response that fits." },
        { name: "Listen to a Conversation", text: "A conversation, then questions on what was said and why." },
        { name: "Listen to an Announcement", text: "A short public or campus announcement and questions on the practical point." },
        { name: "Listen to an Academic Talk", text: "A talk of the kind given in a class, with questions on the content." },
      ],
    },
    {
      id: "writing",
      name: "Writing",
      purpose: "Build accurate sentences, write a practical email, and contribute to an academic discussion.",
      duration: "ETS estimates about 23 minutes of task time.",
      structure: "Three task types. This is not the retired pair of an integrated essay plus a long independent essay.",
      assessment: "The section band is 1–6. ETS can review speaking and writing scores through the paid score-review process in the India fee table.",
      rules: "Type the answers. A response that ignores the prompt, or that is copied from the prompt, will not meet the task.",
      tasks: [
        { name: "Build a Sentence", text: "Arrange the given words into a grammatical sentence that fits the context." },
        { name: "Write an Email", text: "Write an email for a stated situation, to a stated reader, covering the points the task lists." },
        { name: "Write for an Academic Discussion", text: "Read a professor’s question and other students’ posts, then add your own contribution to that discussion." },
      ],
    },
    {
      id: "speaking",
      name: "Speaking",
      purpose: "Repeat what you hear with accuracy, then answer interview questions aloud.",
      duration: "ETS estimates about 8 minutes of task time.",
      structure: "Two task types, both recorded. There is no live examiner in the room.",
      assessment: "Reported on the 1–6 scale. A speaking score review can be requested under the India fee schedule.",
      rules: "You speak into a microphone. At home, ETS sets extra rules for the room, the camera and who else may be present.",
      tasks: [
        { name: "Listen and Repeat", text: "Hear a sentence and repeat it. The task is about accuracy, not a new opinion." },
        { name: "Take an Interview", text: "Answer a short series of interview questions on a topic the test introduces." },
      ],
    },
  ],
  scoring: {
    intro:
      "Each skill and the overall result are reported from 1 to 6, in half-point steps. The overall score is the average of the four section scores, rounded to the nearest half point. ETS’s own example: an average of 5.25 becomes 5.5, and an average of 5.125 becomes 5.",
    points: [
      {
        title: "The comparable 0–120 score",
        text: "For two years after January 2026, the score report also shows a comparable overall score on the old 0–120 scale. ETS describes it as the midpoint of the matching range. It is a bridge for institutions that have not updated their tables. It is not a second test, and it is not the only current score.",
      },
      {
        title: "MyBest scores",
        text: "MyBest scores take the highest section scores from all valid tests in the last two years and average those section scores for an overall band. An institution decides whether it will read MyBest or only the single sitting. Ask before you rely on it.",
      },
      {
        title: "What a university should be asked",
        text: "Some offers will still print a 0–120 number. Send the official report, which carries both scales during the transition, and ask the university which figure it is using. Do not convert the score yourself.",
      },
    ],
    markers: [
      { label: "1", note: "Lowest reported band" },
      { label: "3", note: "Half-point steps" },
      { label: "4", note: "Section and overall" },
      { label: "5", note: "Not a pass mark" },
      { label: "6", note: "Highest reported band" },
    ],
    caveat:
      "ETS publishes a CEFR alignment for the 1–6 scale, and a suggested way for institutions to restate old 0–120 requirements. That guidance is for universities setting policy. It is not an IELTS or PTE conversion, and Eduvert does not treat it as one.",
  },
  countries: [
    {
      name: "United Kingdom",
      href: "/study-in-united-kingdom",
      admission: "Some UK universities accept TOEFL iBT for admission and print the score on the programme page. Others ask for a SELT and will not read TOEFL for the visa even if they read it for the offer.",
      immigration: "A UK visa that requires a Secure English Language Test does not use TOEFL iBT as that test. Check GOV.UK if the route names a SELT.",
      atHome: "Ask the university whether Home Edition is accepted for the offer. It will not satisfy a route that requires a SELT.",
    },
    {
      name: "United States",
      href: "/study-in-usa",
      admission: "TOEFL iBT is widely used by US universities. The number on the department page is the requirement, and after January 2026 that page may still show 0–120 while ETS is also reporting 1–6.",
      immigration: "The university’s English requirement and the student-visa process are separate. A score does not issue the visa.",
      atHome: "Many US universities accept Home Edition. Confirm it on the admissions page rather than assuming every campus does.",
    },
    {
      name: "Canada",
      href: "/study-in-canada",
      admission: "Canadian universities that accept TOEFL publish their own iBT scores. Use the programme page, and ask which scale they are reading in 2026.",
      immigration: "IRCC designates language tests for specific immigration programmes. TOEFL iBT is not automatically the test those programmes use. Read the IRCC page for the pathway. A study permit and an Express Entry language result are different requests.",
      atHome: "Do not assume a Home Edition score will be read for an immigration application.",
    },
    {
      name: "Australia",
      href: "/study-in-australia",
      admission: "Some Australian institutions accept TOEFL iBT for admission. The score and the accepted version belong to that institution.",
      immigration: "Home Affairs lists TOEFL iBT among tests that can support a visa when taken at a secure centre on or after 7 August 2025, and it tells candidates to select “Taking TOEFL for Australia” at registration. Results outside that path may not be accepted. Visa scores are set by subclass and are not reprinted here.",
      atHome: "Home Affairs does not accept TOEFL iBT Home Edition, or any English test delivered completely online.",
    },
    {
      name: "Ireland",
      href: "/study-in-ireland",
      admission: "Irish colleges that accept TOEFL print the score with the course. Pathway programmes can differ from the degree.",
      immigration: "A student-permission checklist is separate from the college’s English condition.",
      atHome: "Confirm Home Edition with the college before you book it.",
    },
    {
      name: "Germany",
      admission: "English-taught programmes in Germany sometimes accept TOEFL iBT and publish the score themselves. There is no single national TOEFL cut-off.",
      immigration: "The university requirement and the visa checklist are both required reading. Some courses still expect German.",
      atHome: "Ask the university whether a Home Edition report is enough.",
    },
    {
      name: "New Zealand",
      href: "/study-in-new-zealand",
      admission: "Universities set their own TOEFL iBT scores. Check the current page, because older 0–120 wording may sit beside the new scale.",
      immigration: "Immigration New Zealand publishes the tests and scores it accepts. Use that page for the visa, not a conversion from a university offer.",
      atHome: "Confirm both the university and Immigration New Zealand before booking Home Edition.",
    },
  ],
  eligibility: [
    {
      title: "Who can book",
      text: "Anyone who can register with an accepted passport and follow the test rules. ETS does not ask for a prior degree.",
    },
    {
      title: "Age",
      text: "ETS does not publish a universal minimum age for TOEFL iBT. The tasks assume academic English. If you are booking for a younger student, ask ETS whether that sitting is appropriate.",
    },
    {
      title: "Identity in India",
      text: "The 2026–27 India bulletin says a passport is the only primary ID for a centre or the Home Edition in India. The name on the ETS account must match the passport exactly. Accounts and registrations are not transferable.",
    },
    {
      title: "Accommodations",
      text: "Disability accommodations are requested through ETS before the test date, with the documents ETS asks for. They are not granted at the door.",
    },
  ],
  fees: [
    listed("TOEFL iBT registration", "₹15,729"),
    listed("Late registration", "₹3,305.08"),
    listed("Test rescheduling", "₹5,000"),
    listed("Reinstatement of cancelled scores", "₹1,652.54"),
    listed("Additional score reports", "₹2,000", "The fees page also prints “50%” beside this line. Confirm what you will be charged before you order extra reports."),
    listed("Speaking or Writing section score review", "₹6,694.92"),
    listed("Payment return", "₹2,900"),
  ],
  feeNote:
    "Figures are copied from the ETS India TOEFL iBT fees page as read on 12 November 2026. That page says test fees are inclusive of sales, use, value-added or similar taxes, and then lists countries where tax is added instead. India is not in that exception list. The India bulletin for July 2026–June 2027 also says consumption taxes can be added when the order is placed, and it points fee amounts back to the website. Pay the total shown in the ETS account. The bulletin says a cancellation made by the four-day deadline is refunded at 50 percent of the original test fee, and that a later cancellation is not refunded.",
  lastVerified: examVerified,
  steps: [
    { title: "Confirm the version", text: "Decide whether the receiver wants a centre test, will accept Home Edition, or, for an Australian visa, requires “Taking TOEFL for Australia”." },
    { title: "Create an ETS account", text: "Use the passport name. The account cannot be transferred to someone else." },
    { title: "Choose a date", text: "Regular online registration closes seven full days before the test. After that, ETS charges the late fee. Express registration closes two days before the test." },
    { title: "Check the spacing rule", text: "The India bulletin says you cannot register another date within three days of an appointment you already hold." },
    { title: "Add score recipients", text: "You can name institutions before the test. Changing them later can be a paid extra report. Do this before the deadline in the bulletin." },
    { title: "Pay on ETS", text: "Pay in the ETS account. Do not use a third-party form that claims to book TOEFL for you." },
    { title: "Read the confirmation", text: "Check the date, the centre or the Home Edition rules, and the name on the booking." },
  ],
  testDay: [
    { title: "Passport", text: "Bring the passport on the account. A different document is not a backup in India." },
    { title: "Centre check-in", text: "Arrive at the reporting time. You will be photographed and assigned a seat. Personal items stay outside the room." },
    { title: "Headset", text: "Listening and speaking use a headset and microphone. Check the volume when the test offers that step." },
    { title: "Home Edition", text: "ETS requires a private room, a compatible computer, and a check of the desk and the surroundings. Another person in the room can void the test." },
    { title: "Breaks", text: "Follow only the breaks the test itself offers. Leaving at another time can end the sitting." },
  ],
  results: [
    { title: "When they post", text: "ETS says scores are in the account about three days after the test, and that a PDF report follows about a day after the electronic scores. The date shown at the end of your test is the one to watch." },
    { title: "What the report contains", text: "Four section bands and an overall band on the 1–6 scale, a CEFR alignment, MyBest scores, and, during the two-year transition, a comparable 0–120 overall." },
    { title: "Validity", text: "Scores are valid for two years. MyBest only draws on tests inside that window." },
    { title: "Sending scores", text: "Recipients named before the deadline are part of the registration. Later reports are ordered from the account and may be charged." },
    { title: "A review or a retake", text: "Speaking or writing can be reviewed for the fee on the India table. A new test is a new registration, subject to the three-day appointment spacing rule in the bulletin." },
  ],
  faqs: [
    {
      question: "What changed on 21 January 2026?",
      answer: "The tasks changed, Reading and Listening became multistage, and the reported score became 1–6 in half points. The older long independent essay is not the current writing section. ETS still prints a comparable 0–120 overall for two years so that institutions can read both.",
    },
    {
      question: "How does the 1–6 score work?",
      answer: "Each skill is a band from 1 to 6. The overall band is the average of the four, rounded to the nearest half point. It is not the sum of four scores out of 30.",
    },
    {
      question: "Do older 0–120 scores still count?",
      answer: "A test taken before the change still has the score it was given, for as long as the receiver accepts a result of that age. Tests taken after the change report 1–6, plus a comparable 0–120 overall during the transition. Ask the university which one it is reading.",
    },
    {
      question: "What does adaptive mean?",
      answer: "In Reading and Listening, the test is delivered in stages. Performance earlier in the section affects what you see later. You should not expect to review the whole section freely at the end.",
    },
    {
      question: "Is Home Edition accepted?",
      answer: "Only where the receiver says so. It is still TOEFL iBT, but Australian visas do not accept at-home tests, and a UK route that needs a SELT will not use it either.",
    },
    {
      question: "How long do results take?",
      answer: "ETS says about three days for the scores to appear in the account. That is the usual timing, not a guarantee if a test is under review.",
    },
    {
      question: "What are MyBest scores?",
      answer: "They combine your highest section scores from valid tests in the last two years. The institution chooses whether to accept that combination or only one test date.",
    },
    {
      question: "Can I retake quickly?",
      answer: "You can register again, but the India bulletin does not let you hold an appointment within three days of one you already have. Read the current bulletin before you book the second date.",
    },
    {
      question: "What about an Australian visa?",
      answer: "Select “Taking TOEFL for Australia” when you register, and take the test at a centre. Home Affairs has said results outside that path may not be accepted, and it does not accept Home Edition.",
    },
  ],
  references: [
    { label: "TOEFL iBT", href: "https://www.ets.org/toefl.html" },
    { label: "Current test content", href: "https://www.ets.org/toefl/test-takers/ibt/about/content.html" },
    { label: "1–6 score scale", href: "https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html" },
    { label: "ETS India fees", href: feeSource },
    { label: "India bulletin 2026–27", href: bulletin },
    { label: "Australian visa English tests", href: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language" },
  ],
  compare: {
    provider: "ETS",
    format: "Reading, Listening, Writing, Speaking",
    duration: "About 2 hours of tasks",
    score: "1–6, plus a comparable 0–120 overall",
    results: "About 3 days",
    validity: "2 years",
    delivery: "Test centre or Home Edition",
    fee: "₹15,729 registration",
    use: "University admissions; visas only where that version is named",
  },
  alternatives: [
    {
      slug: "ielts",
      difference: "IELTS reports a 0–9 band and tests speaking with an examiner. Academic and General Training are different papers.",
    },
    {
      slug: "pte",
      difference: "PTE Academic is scored 10–90 by computer and combines speaking and writing in one section.",
    },
  ],
  seo: {
    title: "The new TOEFL iBT | Eduvert",
    description:
      "The TOEFL iBT format from 21 January 2026, the 1–6 score, MyBest, Home Edition limits, and the ETS India fees listed on 12 November 2026.",
  },
};
