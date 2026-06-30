'use client';

const marqueeItems = [
  'GOLD MEDALIST',
  'ENGINEER',
  'INNOVATOR',
  'RESEARCHER',
  'MEDAN',
  'WEB DEVELOPER',
  'SCIENTIST',
];

const MarqueeRow = ({ direction = 'left', opacity = 0.08 }) => {
  const text = marqueeItems.join(' \u2022 ') + ' \u2022 ';
  const doubled = text + text;

  return (
    <div className="overflow-hidden whitespace-nowrap py-2" style={{ opacity }}>
      <div className={direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'} style={{ display: 'inline-block' }}>
        <span className="text-white font-extrabold uppercase tracking-[-0.02em] inline-block" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          {doubled}
        </span>
      </div>
    </div>
  );
};

export default function MarqueeSection() {
  return (
    <section className="bg-black py-8 overflow-hidden border-y border-white/5">
      <MarqueeRow direction="left" opacity={0.06} />
      <MarqueeRow direction="right" opacity={0.04} />
    </section>
  );
}
