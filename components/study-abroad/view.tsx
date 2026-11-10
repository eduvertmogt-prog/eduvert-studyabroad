"use client";

import { useState } from "react";
import { Agenda } from "./agenda";
import { Briefing } from "./briefing";
import { Folio } from "./folio";
import { Letter } from "./letter";
import { Masthead } from "./masthead";
import { Readiness } from "./readiness";

export function StudyAbroadView() {
  const [destination, setDestination] = useState("");

  return (
    <>
      <Masthead />
      <Folio onSelect={setDestination} />
      <Agenda />
      <Readiness />
      <Briefing />
      <Letter destination={destination} />
    </>
  );
}
