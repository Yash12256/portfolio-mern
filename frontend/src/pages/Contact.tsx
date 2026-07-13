import { useState } from 'react';
import api from '../api/axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Contact</p>
      <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-6">
        Get in Touch
      </h1>
      <p className="text-slate text-base mb-12">
        Have a project in mind or just want to say hello? Send a message below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs text-slate tracking-wide uppercase mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block text-xs text-slate tracking-wide uppercase mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block text-xs text-slate tracking-wide uppercase mb-2">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' ? (
          <p className="text-gold text-sm">Message sent successfully. Thank you!</p>
        ) : null}
        {status === 'error' ? (
          <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
        ) : null}
      </form>
    </div>
  );
}

export default Contact;