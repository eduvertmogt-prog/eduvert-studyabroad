import type { Metadata } from "next";
import { DbStatus } from "../components/db-status";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Eduvert Study Abroad",
    template: "%s",
  },
  description:
    "Study abroad counselling from Eduvert in Navi Mumbai. Destinations, applications, visas, and a consultation you can book.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <DbStatus />
      </body>
    </html>
  );
}
