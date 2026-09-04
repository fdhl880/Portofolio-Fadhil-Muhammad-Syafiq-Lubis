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

export default function ResearchSection({ isDark }) {
  return (
    <section
      id="research"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
                isDark ? 'text-white/30' : 'text-black/30'
              }`}
            >
              / RESEARCH
            </span>
            <h2
              className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Published
              <br />
              Research.
            </h2>
          </motion.div>
          <div
            className={`text-[10px] font-mono tracking-widest max-w-xs md:text-right ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            SCIENTIFIC PAPERS PRESENTED AT NATIONAL & INTERNATIONAL COMPETITIONS
          </div>
        </div>

        {/* Research Papers */}
        <div className="flex flex-col gap-5">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`p-8 md:p-10 rounded-2xl border group transition-all duration-300 ${
                isDark
                  ? 'border-white/5 bg-white/[0.02] hover:border-white/15'
                  : 'border-black/5 bg-black/[0.02] hover:border-black/15'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  }`}
                >
                  {pub.field}
                </span>
                <span
                  className={`text-[9px] font-mono px-3 py-1 rounded-full tracking-widest uppercase ${
                    isDark
                      ? 'bg-white/5 text-white/40'
                      : 'bg-black/5 text-black/40'
                  }`}
                >
                  {pub.status}
                </span>
              </div>

              <h3
                className={`text-xl md:text-2xl font-black tracking-tight leading-snug mb-4 group-hover:translate-x-1 transition-transform duration-500 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {pub.title}
              </h3>

              <p
                className={`text-sm leading-relaxed mb-6 max-w-3xl ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}
              >
                {pub.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {pub.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-[9px] font-mono px-3 py-1 rounded-full uppercase tracking-widest ${
                      isDark
                        ? 'bg-white/5 text-white/30'
                        : 'bg-black/5 text-black/30'
                    }`}
                  >
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
