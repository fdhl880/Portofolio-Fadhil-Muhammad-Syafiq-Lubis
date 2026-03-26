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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/30 transition-all";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="space-y-4 max-w-lg w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          required
          id="contact-name"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          required
          id="contact-email"
        />
      </div>
      <input
        type="text"
        placeholder="Subject"
        value={form.subject}
        onChange={e => setForm({ ...form, subject: e.target.value })}
        className={inputClass}
        id="contact-subject"
      />
      <textarea
        placeholder="Your Message"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        rows={5}
        className={`${inputClass} resize-none`}
        required
        id="contact-message"
      />
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl font-semibold transition-all cursor-pointer ${
          status === 'sent'
            ? 'bg-green-500/20 border border-green-500/40 text-green-400'
            : status === 'error'
            ? 'bg-red-500/20 border border-red-500/40 text-red-400'
            : 'bg-gradient-to-r from-neon/20 to-violet/20 border border-neon/30 text-neon hover:from-neon/30 hover:to-violet/30'
        }`}
        id="contact-submit"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : status === 'error' ? 'Failed — try again' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
}
