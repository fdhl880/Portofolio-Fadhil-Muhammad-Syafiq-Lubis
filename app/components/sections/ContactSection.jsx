'use client';
import { motion } from 'framer-motion';
import ContactForm from '../ui/ContactForm';

export default function ContactSection() {
  const contactinfo = [
    { label: 'General Inquiry', value: 'Fadhilsyafiq90@gmail.com' },
    { label: 'Social Identity', value: 'instagram.com/fadhilm_s', link: 'https://instagram.com/fadhilm_s' },
    { label: 'Atelier Location', value: 'Medan, Indonesia' }
  ];

  return (
    <section id="contact" className="relative py-32 px-6 px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-24">
          
          {/* Left: Branding & Info */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Contact</span>
              <h2 className="font-display text-5xl md:text-7xl leading-tight">
                Submit an <br />
                <span className="italic opacity-40">Inquiry.</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-8 pt-12">
              {contactinfo.map((info, idx) => (
                <div key={info.label} className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-widest uppercase text-white/20 font-sans">{info.label}</span>
                  {info.link ? (
                    <a href={info.link} target="_blank" rel="noopener noreferrer" className="font-display text-xl text-white/60 hover:text-white transition-colors duration-500">
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-display text-xl text-white/60">{info.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-24 hidden lg:block">
              <p className="text-white/10 text-[9px] tracking-[0.4em] uppercase font-sans">
                Available for Global Collaborations
              </p>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="flex flex-col justify-center">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* Background Graphic (Minimal Circle) */}
      <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
    </section>
  );
}
