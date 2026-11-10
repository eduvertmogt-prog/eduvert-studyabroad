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
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: country.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.text,
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <CountryView country={country} />
    </>
  );
}
