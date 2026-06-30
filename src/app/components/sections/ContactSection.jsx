'use client';
import { motion } from 'framer-motion';

const socials = [
  { name: 'Gmail', href: 'mailto:fadhilsyafiq90@gmail.com' },
  { name: 'GitHub', href: 'https://github.com/fdhl880' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhil-muhammad-syafiq-lubis-90a46a355' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-black py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-section-title mb-6"
        >
          Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-impact-md mb-16"
        >
          Let&apos;s Connect
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-body-lg max-w-md">
              Have a project idea, collaboration opportunity, or just want to say hi? 
              I&apos;d love to hear from you.
            </p>

            <a
              href="mailto:fadhilsyafiq90@gmail.com"
              className="inline-flex items-center gap-4 group w-fit"
            >
              <span className="text-xl md:text-2xl font-semibold tracking-tight group-hover:opacity-60 transition-opacity">
                fadhilsyafiq90@gmail.com
              </span>
              <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>

          {/* Right — Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Follow Me</span>
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name !== 'Gmail' ? '_blank' : undefined}
                rel={social.name !== 'Gmail' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="flex items-center justify-between py-5 border-b border-white/5 group hover:border-white/20 transition-colors"
              >
                <span className="text-lg md:text-xl font-semibold tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {social.name}
                </span>
                <svg className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
