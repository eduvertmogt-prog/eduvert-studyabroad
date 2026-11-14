import type { MetadataRoute } from "next";
import { exams } from "@/lib/exams";
import { countries } from "@/lib/countries";
import { siteOrigin } from "@/lib/site-url";

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
  const origin = siteOrigin();
  return paths.map((path) => ({
    url: origin ? `${origin}${path}` : path,
    lastModified: new Date("2026-11-12"),
  }));
}
