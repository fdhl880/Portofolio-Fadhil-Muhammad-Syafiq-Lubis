'use client';
import { motion } from 'framer-motion';

const publications = [
  {
    id: 1,
    title: 'PyroFuel: Utilization of Plastic Waste into Liquid Fuel Using Pyrolysis Method and Paving Blocks Production as Value Added Products',
    field: 'Environmental Engineering',
    status: 'Published Research',
    tags: ['Pyrolysis', 'Plastic Waste', 'Sustainable Energy', 'Paving Blocks'],
    description: 'A research project that transforms plastic waste into usable liquid fuel through the pyrolysis method, with the added innovation of converting byproducts into paving blocks — turning waste into two valuable outputs.',
  },
  {
    id: 2,
    title: 'NusaMark: An Automatic Floating Location Marker System to Support Indonesian Search and Rescue Teams in Locating Sunken Ships',
    field: 'Maritime Technology',
    status: 'Published Research',
    tags: ['SAR', 'Maritime', 'IoT', 'Location Tracking'],
    description: 'An innovative automatic floating marker system designed to help Indonesian Search and Rescue (SAR) teams quickly locate sunken ships, improving response time and saving lives at sea.',
  },
  {
    id: 3,
    title: 'Optimalisasi Potensi Limbah Tulang Ikan Melalui Inovasi Makanan Pendamping Balita (FiBoBites) untuk Mendukung Pencegahan Stunting',
    field: 'Food Science & Public Health',
    status: 'Published Research',
    tags: ['Stunting Prevention', 'Fish Bone', 'Nutrition', 'Food Innovation'],
    description: 'A food science innovation that utilizes fish bone waste to create nutritious complementary food for toddlers (FiBoBites), supporting Indonesia\'s national effort to prevent stunting in children.',
  },
];

export default function ResearchSection() {
  return (
    <section id="research" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ RESEARCH</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              PUBLISHED<br />RESEARCH.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            SCIENTIFIC PAPERS PRESENTED AT NATIONAL & INTERNATIONAL COMPETITIONS
          </div>
        </div>

        {/* Research Papers */}
        <div className="flex flex-col gap-8">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="border border-white/10 p-8 md:p-10 hover:border-white/30 transition-all bg-neutral-950/30 group"
            >
              {/* Top Row */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  {pub.field}
                </span>
                <span className="text-[9px] font-mono px-3 py-1 border border-white/15 text-white/50 tracking-widest uppercase group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  {pub.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug mb-5 group-hover:translate-x-1 transition-transform duration-500">
                {pub.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-3xl">
                {pub.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {pub.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono border border-white/10 px-3 py-1 text-white/35 uppercase tracking-widest group-hover:border-white/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
