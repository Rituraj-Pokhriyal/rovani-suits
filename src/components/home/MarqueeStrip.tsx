export function MarqueeStrip() {
  const items = ["BESPOKE TAILORING", "HAND-STITCHED", "SUPER 150s WOOL", "MADE TO MEASURE", "CASHMERE", "ROVANI ATELIER", "SINCE EXCELLENCE", "ITALIAN LINEN", "HARRIS TWEED"];
  const repeated = [...items, ...items];
  return (
    <div className="bg-charcoal py-4 overflow-hidden border-y border-cream/5">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-xs tracking-[0.25em] text-cream/30 font-sans">
            {item}
            <span className="text-gold/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
