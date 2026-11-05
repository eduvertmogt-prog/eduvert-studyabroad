export type CountryFact = { title: string; text: string };

export type Country = {
  slug: string;
  path: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  overview: string;
  reasons: CountryFact[];
  courses: string[];
  universities: string;
  eligibility: string[];
  tuition: string;
  living: string;
  scholarships: string;
  intakes: CountryFact[];
  visa: string;
  work: string;
  faqs: CountryFact[];
};

const costNote =
  "These are broad public ranges for planning. They are not an Eduvert fee and not a university offer. Confirm tuition on the offer letter and living-cost rules on the visa guidance in force when you apply.";

export const countries: Country[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    path: "study-in-united-kingdom",
    metaTitle: "Study in the United Kingdom | Eduvert",
    metaDescription:
      "Counselling for UK universities, UCAS and direct applications, scholarships where they exist, and the UK Student visa. Based in Navi Mumbai.",
    headline: "Study in the United Kingdom.",
    overview:
      "Eduvert’s UK page describes a destination with recognised universities, three-year bachelor’s degrees, one-year master’s degrees, and more than one intake in the year. Counselling covers profile, course choice, applications, a statement of purpose, visa papers, and pre-departure.",
    reasons: [
      {
        title: "Shorter degrees",
        text: "Eduvert notes bachelor’s degrees of three years and master’s degrees of one year, which can reduce time and cost compared with longer systems.",
      },
      {
        title: "More than one start date",
        text: "The main intake is September or October. January or February is a second window. May exists for a smaller set of courses.",
      },
      {
        title: "Work during and after study",
        text: "A Student visa can allow part-time work in term. The Graduate route has allowed eligible graduates to stay and work afterwards. Check the length and conditions on the current gov.uk guidance.",
      },
    ],
    courses: [
      "Business and management",
      "Computer science and IT",
      "Engineering",
      "Law",
      "Finance and accounting",
      "Data science",
      "Hospitality",
      "Media",
    ],
    universities:
      "Eduvert’s UK page names Oxford, Cambridge, and Imperial College London as examples of the kind of institution students ask about. Most applicants are counselled across a wider set of universities that match their grades and budget, not only those three.",
    eligibility: [
      "Academic transcripts and, where a university asks, a predicted or final mark against its entry requirement.",
      "English evidence such as IELTS, or another test the university lists. Eduvert’s UK page includes IELTS guidance.",
      "Passport, references, and a statement of purpose for many postgraduate applications.",
      "Funds and other documents the UK Student visa asks for after an offer.",
    ],
    tuition: `Many taught programmes for international students are publicly discussed in a band of roughly £14,000 to £35,000 a year. Medicine, some MBAs, and a few specialist courses sit above that. ${costNote}`,
    living:
      "Living costs are commonly planned around £12,000 to £18,000 a year, and London is at the top of that range. The Student visa also sets a maintenance figure that can differ from a personal budget.",
    scholarships:
      "Universities publish their own awards, and schemes such as Chevening run separately from any consultancy. Eduvert’s counselling looks at awards that match the profile. There is no guaranteed amount.",
    intakes: [
      { title: "September / October", text: "The main intake, with the widest course list." },
      { title: "January / February", text: "A second intake for selected courses." },
      { title: "May", text: "A limited window, mainly for specific programmes." },
    ],
    visa: "After an offer, the usual route is the UK Student visa. Eduvert’s page lists document checks, and interview preparation where a university or visa step asks for it. Undergraduate applications often go through UCAS. Many postgraduate applications go direct to the university.",
    work: "Term-time work is capped for Student visa holders, commonly at 20 hours a week when the visa allows it, with full-time work in vacation periods. Confirm the condition printed on the visa.",
    faqs: [
      {
        title: "Does every UK application go through UCAS?",
        text: "Undergraduate applications usually do. A large share of master’s applications are made directly to the university. Counselling follows the route that course uses.",
      },
      {
        title: "How long can I stay after a UK degree?",
        text: "The Graduate route has been the post-study work option. Its length and eligibility change with government rules, so the figure is checked at the time of the offer, not assumed from an old page.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    path: "study-in-usa",
    metaTitle: "Study in the United States | Eduvert",
    metaDescription:
      "Counselling for US universities, applications, scholarships where published, and the F-1 student visa. Eduvert, Navi Mumbai.",
    headline: "Study in the United States.",
    overview:
      "Eduvert’s USA page describes a wide course range, research-led universities, and three intakes. The examples it gives are Harvard, MIT, and Stanford. Counselling is built around a realistic shortlist, not a promise of those campuses.",
    reasons: [
      {
        title: "Range of programmes",
        text: "Universities list everything from business and computer science to public health, law, and design. The shortlist follows the subject and the academic record.",
      },
      {
        title: "Research and assistantships",
        text: "Eduvert notes research facilities and funding. Assistantships and grants are awarded by universities. They are not automatic.",
      },
      {
        title: "A defined student visa",
        text: "Degree study is usually on an F-1 visa, sponsored through the university’s Form I-20.",
      },
    ],
    courses: [
      "Business and MBA",
      "Computer science",
      "Engineering",
      "Data science and AI",
      "Public health and nursing",
      "Finance",
      "Law",
      "Biotechnology",
    ],
    universities:
      "Harvard, MIT, and Stanford appear on Eduvert’s USA page as examples of the system’s best-known universities. Applications are planned around reach, match, and safer options for the student’s grades, tests, and budget.",
    eligibility: [
      "Transcripts for class 10, 12, and any degree already completed.",
      "English scores if the university requires them. Tests such as SAT, GRE, or GMAT only when that programme lists them.",
      "Essays or a statement of purpose, and the recommendation letters the form asks for.",
      "Proof of funds for the I-20 and the visa interview.",
    ],
    tuition: `International tuition is often discussed in a band of about US$20,000 to US$60,000 a year. Public universities can be lower, and some private universities are higher. ${costNote}`,
    living:
      "A common planning range is about US$12,000 to US$20,000 a year, before flights. Large coastal cities cost more than smaller college towns.",
    scholarships:
      "Eduvert’s page says many universities offer scholarships, grants, and assistantships. Each award has its own deadline and academic bar. Counselling identifies what is published. It does not promise a figure.",
    intakes: [
      { title: "Fall, August–September", text: "The main intake and the widest set of courses." },
      { title: "Spring, January–March", text: "A second intake for students who miss the fall deadlines." },
      { title: "Summer, May–July", text: "Fewer degree starts. Often short courses or English pathways." },
    ],
    visa: "The usual path is an admission offer, an I-20 from the university, the SEVIS fee, and an F-1 visa application with an interview. Eduvert’s page includes document support and interview preparation.",
    work: "F-1 students are generally limited to on-campus work during the first year. Curricular Practical Training can allow course-related work while enrolled. Optional Practical Training is the post-study work route Eduvert describes: up to 12 months, with a further 24 months for eligible STEM degrees. Rules are set by US immigration authorities and should be read on the current travel.state.gov and studyinthestates guidance.",
    faqs: [
      {
        title: "Can I work off campus in the first year?",
        text: "Usually no. The first year of an F-1 visa is oriented to on-campus employment. Later work depends on CPT or OPT rules for that programme.",
      },
      {
        title: "Is a scholarship required to get a visa?",
        text: "No. The visa looks at the admission and at funds for tuition and living costs. A scholarship can reduce the funds you need to show. It is not a visa by itself.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    path: "study-in-canada",
    metaTitle: "Study in Canada | Eduvert",
    metaDescription:
      "Counselling for Canadian universities and colleges, study permits, and PGWP planning. Eduvert, Navi Mumbai.",
    headline: "Study in Canada.",
    overview:
      "Eduvert’s Canada page highlights recognised universities, part-time work during study, and a post-graduation work permit as a possible next step. It names the University of Toronto, McGill, and UBC as examples.",
    reasons: [
      {
        title: "Public universities with a clear reputation",
        text: "Toronto, McGill, and UBC are the examples on Eduvert’s page. Many other public universities and colleges are part of a normal shortlist.",
      },
      {
        title: "Work while you study",
        text: "A study permit can include permission to work off campus during term and full-time in scheduled breaks. Canada’s published term-time limit moved to 24 hours a week. Confirm the condition on the permit you receive.",
      },
      {
        title: "Post-graduation work permit",
        text: "Eduvert describes a PGWP of up to three years. Length depends on the programme. It is a work permit, not permanent residence by itself.",
      },
    ],
    courses: [
      "Computer science",
      "Business",
      "Engineering",
      "Health sciences",
      "Information technology",
      "Animation and gaming",
    ],
    universities:
      "The University of Toronto, McGill University, and the University of British Columbia are the institutions named on Eduvert’s Canada page. College diplomas and other public universities are also part of Canadian applications when they fit the profile.",
    eligibility: [
      "Transcripts and, for many postgraduate courses, a completed bachelor’s degree.",
      "English or French evidence, often IELTS, as the college or university specifies.",
      "A study plan or statement where the application asks for one.",
      "Proof of funds at the level set for a Canadian study permit, plus tuition arrangements.",
    ],
    tuition: `International tuition is often planned around CAD 15,000 to CAD 35,000 a year for many degrees. Professional programmes can cost more. ${costNote}`,
    living:
      "Living costs are often planned around CAD 15,000 to CAD 22,000 a year outside the most expensive cities, and higher in Toronto and Vancouver. The study permit has its own proof-of-funds figure, which should be read on canada.ca.",
    scholarships:
      "Entrance awards are published by universities and colleges. Eduvert’s counselling checks what matches the profile. Amounts are not guaranteed.",
    intakes: [
      { title: "Fall", text: "The main intake and the largest course list. Eduvert’s page describes this as the popular start." },
      { title: "Winter / spring, January–March", text: "A second window for students who miss the fall." },
      { title: "Summer, May–July", text: "Limited, often shorter or language programmes." },
    ],
    visa: "Canada uses a study permit, usually with a provincial attestation or equivalent letter when the current rules require one, plus biometrics. Eduvert’s page lists document checks and interview preparation. The permit is applied for after the college or university issues an acceptance letter.",
    work: "Off-campus work during term is allowed only when the study permit says so. Full-time work is generally limited to scheduled breaks. After graduation, a PGWP is a separate application and depends on the length and type of programme.",
    faqs: [
      {
        title: "Does a study permit lead straight to permanent residence?",
        text: "No. A study permit is for the course. A PGWP can add Canadian work experience afterwards. Permanent residence is a later, separate application with its own points and rules.",
      },
      {
        title: "Are Canadian fees always lower than the US or the UK?",
        text: "Eduvert’s page says they are often more affordable than the US, the UK, and Australia. That is a comparison, not a fixed saving. The offer letter is the number that matters.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    path: "study-in-australia",
    metaTitle: "Study in Australia | Eduvert",
    metaDescription:
      "Counselling for Australian universities, the student visa, and post-study work options. Eduvert, Navi Mumbai.",
    headline: "Study in Australia.",
    overview:
      "Eduvert’s Australia page points to universities in Sydney, Melbourne, Brisbane, Canberra, and Perth, three-year bachelor’s degrees, master’s degrees of one to two years, and a February main intake.",
    reasons: [
      {
        title: "Named universities",
        text: "The page cites the University of Melbourne, Australian National University, and the University of Sydney. The Group of Eight is the research-intensive group students often ask about. A shortlist can also include other universities.",
      },
      {
        title: "Shorter courses",
        text: "Bachelor’s degrees are described as three years, and master’s degrees as one to two years.",
      },
      {
        title: "Work rights",
        text: "Student visa holders can work part-time during study. Australia also has a post-study work visa for eligible graduates. Hours and stay lengths are set by Home Affairs and should be checked for the year of the visa.",
      },
    ],
    courses: [
      "Nursing",
      "Computer science",
      "Business analytics",
      "Cybersecurity",
      "Engineering",
      "Architecture",
      "Accounting",
      "Psychology",
    ],
    universities:
      "Eduvert names Melbourne, ANU, and Sydney, and lists Sydney, Canberra, Brisbane, Melbourne, and Perth as the cities where students commonly look. The Group of Eight is a useful map of the research universities, not a requirement to apply only there.",
    eligibility: [
      "Academic transcripts matched to the university’s entry score or prerequisite subjects.",
      "English test scores. IELTS is the test Eduvert’s page prepares students for. Universities may also list PTE or TOEFL.",
      "A genuine student statement and financial evidence for the visa.",
      "Overseas student health cover, which the student visa expects.",
    ],
    tuition: `International tuition is often planned around AUD 20,000 to AUD 45,000 a year. Health, engineering, and some business degrees can sit higher. ${costNote}`,
    living:
      "Living costs are often planned around AUD 24,000 to AUD 30,000 a year. Home Affairs publishes a funds figure for the student visa that can change, and that figure is the one used in the application.",
    scholarships:
      "Universities and some government or destination awards publish scholarships with their own deadlines. Eduvert looks at what is open for the intake. Nothing is guaranteed in advance.",
    intakes: [
      { title: "February", text: "The primary intake, with the most courses and the main scholarship round." },
      { title: "July", text: "A second intake for selected courses. Eduvert’s page also refers to a July–November window." },
    ],
    visa: "The student visa is subclass 500. It needs a confirmation of enrolment from the institution, health cover, English evidence, and funds. Eduvert’s Australia page lists visa support, even though one line on the live page mistakenly says “Ireland” in the visa sentence. The destination of this page is Australia.",
    work: "The current public rule is 48 hours a fortnight while the course is in session, and more hours in scheduled breaks. Post-study work depends on the qualification, the location, and the visa settings of that year.",
    faqs: [
      {
        title: "Is July a full second intake?",
        text: "It is a real intake, with fewer courses than February. If a course is only offered in February, a July plan will not fit it.",
      },
      {
        title: "Do I need health insurance?",
        text: "Yes. Overseas student health cover is part of the Australian student visa, not an optional extra.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    path: "study-in-ireland",
    metaTitle: "Study in Ireland | Eduvert",
    metaDescription:
      "Counselling for Irish universities, September and January intakes, and the Ireland study visa. Eduvert, Navi Mumbai.",
    headline: "Study in Ireland.",
    overview:
      "Eduvert’s Ireland page describes an English-speaking country, degrees with international recognition, and an economy with large technology and pharmaceutical employers. It names a one-to-two-year stay-back option after study.",
    reasons: [
      {
        title: "English as the study language",
        text: "Courses are taught in English, which is the point Eduvert leads with for Indian students.",
      },
      {
        title: "Employers already in the country",
        text: "The page notes European headquarters of technology companies, including Google, Meta, and Apple, alongside pharmaceuticals, finance, and hospitality. A degree does not place you in those companies.",
      },
      {
        title: "A stay-back option",
        text: "Eduvert describes a one-to-two-year stay-back. Official Third Level Graduate arrangements have often given up to two years for higher awards. Confirm the stamp and the length for your award level.",
      },
    ],
    courses: [
      "Pharmaceutical sciences",
      "Data science",
      "Cybersecurity",
      "Management",
      "Civil engineering",
      "Economics",
    ],
    universities:
      "Eduvert’s Ireland page does not publish a fixed university list. Counselling uses the academic record to look at universities and technological universities that teach the subject, rather than a single campus.",
    eligibility: [
      "Transcripts. Many master’s courses expect a relevant bachelor’s degree.",
      "English evidence, commonly IELTS, at the band the institution sets.",
      "A statement of purpose and references where the form asks.",
      "Tuition payment evidence and funds for the visa and for immigration registration after arrival.",
    ],
    tuition: `International tuition is often planned around €10,000 to €25,000 a year. Medicine and some business programmes cost more. ${costNote}`,
    living:
      "Living costs are often planned around €12,000 to €18,000 a year, with Dublin at the high end. Immigration authorities also publish a funds figure for the study visa.",
    scholarships:
      "Universities publish merit awards, and a small number of national scholarships exist. Eduvert’s page offers scholarship guidance. It does not quote an amount.",
    intakes: [
      { title: "September", text: "The main intake for full degrees. Eduvert notes application windows that often run from December through July." },
      { title: "January", text: "A smaller intake, mostly postgraduate and specialist courses." },
      { title: "Rolling starts", text: "Some diplomas, certificates, and private-college programmes start on other dates." },
    ],
    visa: "Indian students usually apply for a long-stay study visa and, after arrival, register for an Irish Residence Permit. Eduvert’s page lists document checks and the Ireland student visa process.",
    work: "Students on the relevant permission can work about 20 hours a week in term and longer hours in the official holiday windows. The stay-back permission is a separate step after results, and it depends on the award.",
    faqs: [
      {
        title: "Is Ireland inside the UK visa system?",
        text: "No. Ireland has its own study visa and residence rules. A UK visa does not cover study in Ireland.",
      },
      {
        title: "Can I travel in Europe while I study?",
        text: "Ireland is in the European Union, so students can travel under the rules that apply to their immigration permission and passport. Travel is not the same thing as the right to work in another country.",
      },
    ],
  },
  {
    slug: "france",
    name: "France",
    path: "study-in-france",
    metaTitle: "Study in France | Eduvert",
    metaDescription:
      "Counselling for study in France, including English-taught courses, Campus France, and the student visa. Eduvert, Navi Mumbai.",
    headline: "Study in France.",
    overview:
      "Eduvert’s France page describes recognised universities, a large set of English-taught programmes, and lower tuition at public universities than at many private schools. Applications for many Indian students pass through Campus France.",
    reasons: [
      {
        title: "Public universities and private schools are different prices",
        text: "Eduvert calls French tuition cost-effective. Public university fees are regulated and often much lower than private grandes écoles and business schools, which can charge a full international fee.",
      },
      {
        title: "English-taught options",
        text: "The page refers to a large catalogue of programmes taught in English. French is still useful for daily life and for many jobs.",
      },
      {
        title: "A European base",
        text: "The page treats France as a base for study in business, engineering, hospitality, luxury, and design, with easy travel across Europe.",
      },
    ],
    courses: [
      "Business and management",
      "Engineering",
      "Computer science and data",
      "Fashion and luxury",
      "Hospitality",
      "Art and design",
      "Health and biomedical sciences",
    ],
    universities:
      "Eduvert does not lock the page to a single university list. Public universities, grandes écoles, and specialised schools are shortlisted against the subject, the language of instruction, and the budget.",
    eligibility: [
      "Academic records. Some schools use their own tests or interviews.",
      "English scores for English-taught courses, and French scores when the course is taught in French.",
      "A Campus France procedure for many applicants from India, before the visa.",
      "Proof of funds and housing plans for the visa file.",
    ],
    tuition: `At public universities, regulated fees for international students are often a few thousand euros a year. Private schools and many grandes écoles are commonly planned at about €10,000 to €25,000 a year, sometimes more. ${costNote}`,
    living:
      "Living costs are often planned around €800 to €1,200 a month outside Paris, and higher in Paris. Visa guidance also sets a monthly funds figure.",
    scholarships:
      "Campus France and universities publish awards, including competitive national schemes such as the Eiffel scholarship. Eduvert’s page includes scholarship guidance. Selection sits with the awarding body.",
    intakes: [
      { title: "September / October", text: "The major intake and the most competitive." },
      { title: "January / February", text: "A smaller spring intake." },
      { title: "Short programmes", text: "Language courses and some specialist shorts run through the year." },
    ],
    visa: "Eduvert lists Campus France, the visa file, and interview preparation. For many students the long-stay student visa is the VLS-TS, applied for after the Campus France step and the admission.",
    work: "A student residence permit can allow paid work up to 964 hours a year, roughly half-time. Post-study stay depends on the current residence rules and, for some graduates, bilateral arrangements. Check the rule for the year you finish.",
    faqs: [
      {
        title: "Can I study in France without French?",
        text: "Yes, on a course taught in English. You still need the English score that course asks for. French helps with housing, part-time work, and life outside class.",
      },
      {
        title: "Is Campus France the university?",
        text: "No. Campus France is the national procedure many applicants use before the visa. The admission itself comes from the university or school.",
      },
    ],
  },
  {
    slug: "nz",
    name: "New Zealand",
    path: "study-in-new-zealand",
    metaTitle: "Study in New Zealand | Eduvert",
    metaDescription:
      "Counselling for New Zealand universities and institutes, the fee-paying student visa, and the costs Eduvert already publishes as indicative.",
    headline: "Study in New Zealand.",
    overview:
      "Eduvert’s New Zealand page describes eight universities, English-taught courses, February and July intakes, and part-time work during study. It is one of the few country pages that already prints indicative fees.",
    reasons: [
      {
        title: "A small, legible university system",
        text: "The page refers to eight universities with international recognition, plus institutes that teach diplomas and degrees.",
      },
      {
        title: "Two main intakes",
        text: "February is the primary intake. July is the second, with a shorter course list. Some private providers take students on other dates.",
      },
      {
        title: "Work during study",
        text: "The page says students can work part-time while enrolled and may have post-study work rights after graduation. The visa label and the hour cap should be read on Immigration New Zealand’s current rules.",
      },
    ],
    courses: [
      "Information technology",
      "Engineering",
      "Business and finance",
      "Nursing and health",
      "Hospitality",
      "Agriculture and environmental science",
      "Data science and cybersecurity",
      "Construction and architecture",
    ],
    universities:
      "New Zealand has eight universities. Eduvert does not rank them on the page. The shortlist is made from the subject, the city, and whether the student is looking at a degree or a diploma pathway.",
    eligibility: [
      "Transcripts matched to the programme’s academic entry.",
      "English evidence. IELTS is commonly listed. Universities publish equivalents.",
      "A statement and references when the application asks.",
      "Tuition payment evidence, insurance, and funds for the student visa.",
    ],
    tuition:
      "Eduvert’s own New Zealand page gives these indicative bands: about NZD 22,000 to 32,000 a year for diploma and bachelor’s programmes, and about NZD 26,000 to 40,000 a year for master’s programmes. Treat them as a planning range from that page, then confirm the offer.",
    living:
      "The same Eduvert page estimates living costs at about NZD 20,000 a year. Immigration New Zealand publishes the funds figure used in the visa, and that official figure is the one that has to be shown.",
    scholarships:
      "The page says scholarships exist at university and government level. They are competitive and published by the awarding body. Eduvert does not attach a guaranteed sum.",
    intakes: [
      { title: "February", text: "Primary intake, widest programme list." },
      { title: "July", text: "Secondary intake for selected programmes." },
      { title: "Other dates", text: "Some private and vocational providers admit through the year." },
    ],
    visa: "The usual permission is a Fee Paying Student Visa, applied for after an offer. Eduvert’s page lists document checks, insurance, and funds. Rules sit with Immigration New Zealand.",
    work: "Student visas can allow work up to a set weekly cap, recently published at 25 hours a week, with conditions printed on the visa. Post-study work is a separate visa and depends on the qualification.",
    faqs: [
      {
        title: "Are the New Zealand fees on this page a quote?",
        text: "No. They are the indicative bands already printed on Eduvert’s New Zealand page. The invoice from the institution replaces them.",
      },
      {
        title: "Is a diploma treated like a degree for work after study?",
        text: "Not always. Post-study work rights depend on the level and length of the qualification. A shorter diploma can lead to a shorter work visa, or to none.",
      },
    ],
  },
];

export function getCountryByPath(path: string) {
  return countries.find((item) => item.path === path);
}
