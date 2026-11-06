import type { Metadata } from "next";
import { Intro } from "../components/intro";
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
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-skip");return}var nav=performance.getEntriesByType("navigation")[0];var played=sessionStorage.getItem("eduvert-intro")==="1";if(nav&&nav.type!=="reload"&&played){document.documentElement.classList.add("intro-skip")}else{document.documentElement.classList.add("intro-lock-scroll")}}catch(e){}})();',
          }}
        />
        <Intro />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
