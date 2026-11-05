import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountryView } from "@/components/country-view";
import { countries, getCountryByPath } from "@/lib/countries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.path }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryByPath(slug);
  if (!country) return {};
  return {
    title: country.metaTitle,
    description: country.metaDescription,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const country = getCountryByPath(slug);
  if (!country) notFound();
  return <CountryView country={country} />;
}
