"use client";

import type { Country } from "../lib/countries";
import { presentCountry } from "../lib/destination";
import { PersonalInvitation } from "./personal-invitation";
import { CountryAcademics } from "./destination/academics";
import { CountryCosts } from "./destination/costs";
import { CountryEligibility } from "./destination/eligibility";
import { CountryFaq } from "./destination/faq";
import { CountryHero } from "./destination/hero";
import { CountryIntakes } from "./destination/intakes";
import { CountryIntroduction } from "./destination/introduction";
import { CountryOthers } from "./destination/others";
import { CountryVisa } from "./destination/visa";
import { CountryWhy } from "./destination/why";
import "../app/destination.css";

export function CountryView({ country }: { country: Country }) {
  const content = presentCountry(country);

  return (
    <main id="content" className="country-page">
      <CountryHero content={content} />
      <CountryIntroduction content={content} />
      <CountryWhy content={content} />
      <CountryAcademics content={content} />
      <CountryEligibility content={content} />
      <CountryCosts content={content} />
      <CountryIntakes content={content} />
      <CountryVisa content={content} />
      <CountryOthers content={content} />
      <CountryFaq content={content} />
      <PersonalInvitation destination={country.name} layout="destination" />
    </main>
  );
}
