import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import atlas from "world-atlas/countries-110m.json";
import { atlasDestinations } from "./globe-destinations";

type CountryProps = { name?: string };

export type LandFeature = {
  type: "Feature";
  id: string;
  geometry: { type: string; coordinates: unknown };
  properties: { name: string; destId: string | null };
};

const topology = atlas as unknown as Topology<{ countries: GeometryCollection<CountryProps> }>;
const collection = feature(topology, topology.objects.countries);

function atlasKey(id: string | number | undefined) {
  const raw = String(id ?? "");
  return atlasDestinations[raw] ?? atlasDestinations[raw.padStart(3, "0")] ?? null;
}

export const landFeatures: LandFeature[] = collection.features.map((item) => {
  const id = String(item.id ?? "");
  const name = item.properties?.name ?? "";
  return {
    type: "Feature",
    id,
    geometry: item.geometry as LandFeature["geometry"],
    properties: { name, destId: atlasKey(id) },
  };
});
