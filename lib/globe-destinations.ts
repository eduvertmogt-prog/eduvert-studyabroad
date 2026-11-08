import { countries } from "./countries";

export type GlobeDestination = {
  id: string;
  name: string;
  description: string;
  href: string;
  lat: number;
  lng: number;
  nudgeX: number;
  nudgeY: number;
};

const details: Record<string, Omit<GlobeDestination, "id" | "name" | "href">> = {
  uk: {
    description:
      "Recognised universities, three-year bachelor’s degrees, one-year master’s degrees, and more than one intake in the year.",
    lat: 54.2,
    lng: -2.6,
    nudgeX: -6,
    nudgeY: -30,
  },
  usa: {
    description:
      "A wide course range and research-led universities, with three intakes. Counselling builds a realistic shortlist.",
    lat: 39.6,
    lng: -98.4,
    nudgeX: 14,
    nudgeY: -26,
  },
  canada: {
    description:
      "Recognised universities, part-time work during study, and a post-graduation work permit as a possible next step.",
    lat: 54.8,
    lng: -96.5,
    nudgeX: 12,
    nudgeY: -28,
  },
  australia: {
    description:
      "Universities across Sydney, Melbourne, Brisbane, Canberra, and Perth, with a February main intake.",
    lat: -25.6,
    lng: 134.2,
    nudgeX: 16,
    nudgeY: -24,
  },
  ireland: {
    description:
      "An English-speaking country, recognised degrees, and a one-to-two-year stay-back option after study.",
    lat: 53.3,
    lng: -8.1,
    nudgeX: -46,
    nudgeY: 10,
  },
  france: {
    description:
      "Recognised universities, many English-taught programmes, and lower public-university tuition than many private schools.",
    lat: 46.6,
    lng: 2.4,
    nudgeX: 34,
    nudgeY: 8,
  },
  nz: {
    description: "Eight universities, English-taught courses, and February and July intakes.",
    lat: -41.2,
    lng: 174.3,
    nudgeX: 22,
    nudgeY: 12,
  },
};

export const globeDestinations: GlobeDestination[] = countries.map((country) => {
  const detail = details[country.slug];
  if (!detail) throw new Error(`Missing globe details for ${country.slug}`);
  return {
    id: country.slug,
    name: country.name,
    href: `/${country.path}`,
    ...detail,
  };
});

/** Guided tour order. Rearrange this list without touching animation code. */
export const guidedOrder = ["uk", "usa", "canada", "australia", "ireland", "france", "nz"] as const;

const byId = new Map(globeDestinations.map((destination) => [destination.id, destination]));

export const orderedDestinations: GlobeDestination[] = guidedOrder.map((id) => {
  const destination = byId.get(id);
  if (!destination) throw new Error(`Missing destination ${id}`);
  return destination;
});

export const atlasDestinations: Record<string, string> = {
  "826": "uk",
  "840": "usa",
  "124": "canada",
  "036": "australia",
  "36": "australia",
  "372": "ireland",
  "250": "france",
  "554": "nz",
};
