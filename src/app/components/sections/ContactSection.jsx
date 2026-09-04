'use client';
import { motion } from 'framer-motion';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const socials = [
  { name: 'Email', icon: MailIcon, href: 'mailto:fadhilsyafiq90@gmail.com', label: 'fadhilsyafiq90@gmail.com' },
  { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/fdhl880', label: 'fdhl880' },
  { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/fadhil-muhammad-syafiq-lubis-90a46a355', label: 'Fadhil M. S. Lubis' },
];

export default function ContactSection({ isDark }) {
  return (
    <section
      id="contact"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
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
            / CONTACT
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Let&apos;s
            <br />
            Connect.
          </h2>
          <p
            className={`text-sm md:text-base max-w-md mx-auto mb-12 ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}
          >
            Got a project idea, research collaboration, or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    : 'border-black/5 bg-black/[0.02] hover:border-black/20 hover:bg-black/[0.05]'
                }`}
              >
                <div className={isDark ? 'text-white/40' : 'text-black/40'}>
                  <Icon />
                </div>
                <div className="text-left">
                  <div
                    className={`text-[9px] font-mono tracking-widest uppercase mb-0.5 ${
                      isDark ? 'text-white/25' : 'text-black/25'
                    }`}
                  >
                    {social.name}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      isDark ? 'text-white/70' : 'text-black/70'
                    }`}
                  >
                    {social.label}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
