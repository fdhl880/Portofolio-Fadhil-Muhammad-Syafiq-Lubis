'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = "w-full bg-transparent border-b border-white/10 py-6 text-xl md:text-2xl font-display text-white placeholder-white/20 focus:outline-none focus:border-white transition-all duration-700";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="space-y-12 max-w-2xl w-full"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-12">
          <input
            type="text"
            placeholder="Identity // Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            required
            id="contact-name"
          />
          <input
            type="email"
            placeholder="Digital Mail"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            required
            id="contact-email"
          />
        </div>
        <textarea
          placeholder="Brief Description of Inquiry"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={1}
          className={`${inputClass} resize-none overflow-hidden`}
          required
          id="contact-message"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        className={`group relative flex items-center gap-6 py-4 uppercase text-[10px] tracking-[0.6em] font-sans transition-all duration-700 ${
          status === 'sent' ? 'text-green-400' : 'text-white/60 hover:text-white'
        }`}
        id="contact-submit"
      >
        <span className="relative z-10 transition-all duration-700 group-hover:tracking-[1em]">
          {status === 'sending' ? 'Sending Inquiry...' : status === 'sent' ? 'Inquiry Delivered' : 'Send Inquiry'}
        </span>
        <div className="w-12 h-px bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
      </motion.button>
    </motion.form>
  );
}
