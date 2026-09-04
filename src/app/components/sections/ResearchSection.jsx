'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const publications = [
  {
    id: 1,
    title: 'PyroFuel: Utilization of Plastic Waste into Liquid Fuel Using Pyrolysis Method',
    date: 'February 2024',
    organization: 'National Research Council of Thailand (NRCT)',
    description: 'A research project that transforms plastic waste into usable liquid fuel through the pyrolysis method, with the added innovation of converting byproducts into paving blocks — turning waste into two valuable outputs. Presented at IPITEX Bangkok 2024.',
    image: '/images/activity-pyrofuel.jpg',
    link: '#'
  },
  {
    id: 2,
    title: 'NusaMark: An Automatic Floating Location Marker System',
    date: 'January 2025',
    organization: 'International Science Project Olympiad',
    description: 'An innovative automatic floating marker system designed to help Indonesian Search and Rescue (SAR) teams quickly locate sunken ships, improving response time and saving lives at sea. Won Gold Medal at I2ASPO 2025.',
    image: '/images/activity-gold-medal.png',
    link: '#'
  },
  {
    id: 3,
    title: 'Optimalisasi Potensi Limbah Tulang Ikan (FiBoBites) untuk Mencegah Stunting',
    date: 'March 2025',
    organization: 'Malaysia Technology Expo',
    description: 'A food science innovation that utilizes fish bone waste to create nutritious complementary food for toddlers (FiBoBites), supporting Indonesia\'s national effort to prevent stunting in children.',
    image: '/images/activity-fibobites.jpg',
    link: '#'
  },
];

export default function ResearchSection({ isDark }) {
  return (
    <section
      id="research"
      className={`py-32 px-6 md:px-10 overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header split layout */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span
                className={`text-[10px] tracking-[0.5em] font-mono uppercase block ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}
              >
                Growth & Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-5xl md:text-[5vw] font-black tracking-tighter leading-[0.9] ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Research &
              <br />
              Exhibitions
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`md:max-w-sm text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'} md:mt-auto`}
          >
            A collection of scientific papers, innovations, and exhibitions that shaped my technical and collaborative skills.
          </motion.div>
        </div>

        {/* Alternating Layout List */}
        <div className="flex flex-col gap-24">
          {publications.map((pub, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                {/* Text Content */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                      {pub.title}
                    </h3>
                    <span className={`text-[10px] font-mono tracking-widest uppercase shrink-0 mt-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                      {pub.date}
                    </span>
                  </div>
                  
                  <div className={`font-medium mb-6 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    {pub.organization}
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    {pub.description}
                  </p>
                  
                  <a href={pub.link} className={`inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase group ${isDark ? 'text-white hover:text-white/70' : 'text-black hover:text-black/70'}`}>
                    VIEW RESEARCH PAPER
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </a>
                </div>

                {/* Image Content */}
                <div className="flex-1 w-full">
                  <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'border border-white/10' : 'border border-black/10'}`}>
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
