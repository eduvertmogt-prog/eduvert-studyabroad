import { destinations } from "../lib/site";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function GuideBoard({ current }: { current?: string }) {
  return (
    <div className="dest-card guide-board guide-rise" style={{ transitionDelay: "260ms" }}>
      <p className="dest-kicker">Seven countries</p>
      <div className="dest-grid">
        {destinations.map((destination, index) => (
          <a
            key={destination.href}
            href={destination.href}
            aria-current={destination.href === current || destination.name === current ? "page" : undefined}
          >
            <span>{pad(index)}</span>
            <span>{destination.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
