import type { MetadataRoute } from "next";
import { exams } from "@/lib/exams";
import { countries } from "@/lib/countries";

const paths = [
  "/",
  "/study-abroad",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cancellation-policy",
  "/return-refund-policy",
  "/exams",
  ...countries.map((country) => `/${country.path}`),
  ...exams.map((exam) => `/exams/${exam.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return paths.map((path) => ({
    url: origin ? `${origin}${path}` : path,
    lastModified: new Date("2026-11-12"),
  }));
}
