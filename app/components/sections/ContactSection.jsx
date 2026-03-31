'use client';
import { motion } from 'framer-motion';
import ContactForm from '../ui/ContactForm';

const contactInfo = [
  { icon: '✉️', label: 'Email', value: 'Fadhilsyafiq90@gmail.com' },
  { icon: '📸', label: 'Instagram', value: '@fadhilm_s', link: 'https://instagram.com/fadhilm_s' },
  { icon: '📍', label: 'Location', value: 'Medan, Indonesia' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 md:py-32 px-4">
      {/* Background */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0,240,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Get in Touch</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Have a question, collaboration idea, or just want to say hello? Reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">{item.label}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-neon transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Decorative element */}
            <div className="hidden md:block mt-8 glass rounded-xl p-6 text-center">
              <p className="text-muted text-sm">
                Currently open to collaborations in
              </p>
              <p className="text-white font-display font-semibold mt-1">
                Research • Technology • Innovation
              </p>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>

        {/* Footer removed to avoid duplication with HolographicFooter */}
      </div>
    </section>
  );
}
