'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const activities = [
  {
    src: '/images/photo1.jpg',
    title: 'Gold Medal Award',
    desc: 'Receiving the gold medal certificate',
  },
  {
    src: '/images/photo2.jpg',
    title: 'Exhibition Setup',
    desc: 'Preparing our innovation booth',
  },
  {
    src: '/images/photo3.jpg',
    title: 'Team Presentation',
    desc: 'Presenting our project to the judges',
  },
  {
    src: '/images/photo4.jpg',
    title: 'Project Demonstration',
    desc: 'Explaining how our system works in real-time',
  },
  {
    src: '/images/activity-soldering.jpg',
    title: 'Prototyping & Engineering',
    desc: 'Hands-on circuit and hardware development in the lab',
  },
  {
    src: '/images/activity-ipitex.jpg',
    title: 'IPITEX Bangkok 2024',
    desc: 'Representing Indonesia at the international innovation expo',
  },
  {
    src: '/images/activity-pyrofuel.jpg',
    title: 'PyroFuel Presentation',
    desc: 'Explaining our waste-to-energy solution to the judges',
  },
  {
    src: '/images/activity-gold-medal.png',
    title: 'I2ASPO Gold Medal',
    desc: 'Celebrating our Gold Medal victory at the International Olympiad',
  },
  {
    src: '/images/activity-fibobites.jpg',
    title: 'FiBoBites Exhibition',
    desc: 'Showcasing our stunting prevention innovation',
  },
];

export default function ActivityGallery({ isDark }) {
  return (
    <section
      id="activity"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            / ACTIVITY
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Behind the
            <br />
            Scenes.
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {activities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer border ${
                isDark
                  ? 'border-white/5 bg-white/[0.02]'
                  : 'border-black/5 bg-black/[0.02]'
              }`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDark
                      ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
                      : 'bg-gradient-to-t from-white/90 via-white/40 to-transparent'
                  }`}
                >
                  <h3
                    className={`text-sm font-bold tracking-wider uppercase ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? 'text-white/70' : 'text-black/70'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
