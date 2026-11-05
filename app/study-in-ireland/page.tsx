import type { Metadata } from "next";
import { CountryView } from "../../components/country-view";
import { getCountry } from "../../lib/countries";

const country = getCountry("ireland");

export const metadata: Metadata = {
  title: country.metaTitle,
  description: country.metaDescription,
};

export default function Page() {
  return <CountryView country={country} />;
}
