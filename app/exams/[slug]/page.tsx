import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamView } from "@/components/exams/exam-view";
import { exams, getExam } from "@/lib/exams";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return {};
  const path = `/exams/${exam.slug}`;
  return {
    title: exam.seo.title,
    description: exam.seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: exam.seo.title,
      description: exam.seo.description,
      url: path,
    },
  };
}

export default async function ExamPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();
  const path = `/exams/${exam.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Exams", item: "/exams" },
      { "@type": "ListItem", position: 3, name: exam.name, item: path },
    ],
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: exam.headline,
    description: exam.seo.description,
    dateModified: "2026-11-12",
    author: { "@type": "Organization", name: "Eduvert" },
    about: exam.fullName,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: exam.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, article, faq]).replace(/</g, "\\u003c") }} />
      <ExamView exam={exam} />
    </>
  );
}
