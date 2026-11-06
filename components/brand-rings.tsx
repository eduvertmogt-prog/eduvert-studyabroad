type BrandRingsProps = {
  className?: string;
  animated?: boolean;
};

const rings = [
  { name: "pink", cx: 70.44, cy: 76.55, color: "#FF5DB0" },
  { name: "cyan", cx: 58, cy: 56, color: "#00D9E7" },
  { name: "yellow", cx: 84.69, cy: 58.25, color: "#F9F91E" },
];

export function BrandRings({ className, animated = false }: BrandRingsProps) {
  return (
    <svg className={className} viewBox="0 0 142 134" fill="none" aria-hidden="true">
      {rings.map((ring) => (
        <circle
          key={ring.name}
          className={animated ? `ring ring-${ring.name}` : undefined}
          cx={ring.cx}
          cy={ring.cy}
          r={50}
          stroke={animated ? undefined : ring.color}
          strokeWidth={4.9}
        />
      ))}
    </svg>
  );
}
