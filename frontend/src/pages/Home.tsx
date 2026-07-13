import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import type { About } from '../types';

function Home() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/about')
      .then((res) => setAbout(res.data))
      .catch((err) => console.error('Failed to load about data:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate text-sm tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate">Could not load profile data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <section className="min-h-[70vh] flex flex-col justify-center">
        <p className="animate-fade-in-up text-gold text-sm tracking-[0.2em] uppercase mb-4">
          {about.location || 'Portfolio'}
        </p>
        <h1 className="animate-fade-in-up delay-1 font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-ivory mb-6">
          {about.name}
        </h1>
        <p className="animate-fade-in-up delay-2 text-slate text-base sm:text-lg md:text-xl mb-10 max-w-xl">
          {about.title}
        </p>

        <div className="animate-fade-in-up delay-3 flex flex-col sm:flex-row gap-4">
          <Link
            to="/projects"
            className="px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300 text-center"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-hairline text-ivory text-sm tracking-wide hover:border-ivory transition-colors duration-300 text-center"
          >
            Get in Touch
          </Link>
        </div>

        <div className="animate-fade-in-up delay-4 flex gap-5 mt-8">
          {about.socialLinks?.github ? (
            <a href={about.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          ) : null}
          {about.socialLinks?.linkedin ? (
            <a href={about.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          ) : null}
        </div>
      </section>

      <section className="py-16 border-t border-hairline">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">About</p>
        <p className="text-ivory text-base sm:text-lg leading-relaxed max-w-2xl">
          {about.bio}
        </p>
      </section>

      <section className="py-16 border-t border-hairline">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-6">Skills</p>
        <div className="flex flex-wrap gap-3">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm text-slate border border-hairline px-4 py-2 hover:text-ivory hover:border-gold transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;