import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { About } from '../types';

function Resume() {
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
        <p className="text-slate">Could not load resume data.</p>
      </div>
    );
  }

  const resumeHref = "http://localhost:5000" + about.resumeUrl;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Resume</p>
      <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-8">
        Education and Experience
      </h1>

      {about.resumeUrl ? (
        <a href={resumeHref} target="_blank" rel="noopener noreferrer" download className="inline-block mb-16 px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300">
          Download Resume (PDF)
        </a>
      ) : null}

      <section className="mb-16">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-6">Education</p>
        <div className="space-y-8">
          {about.education.map((edu, i) => (
            <div key={i} className="border-l border-hairline pl-6">
              <h3 className="font-serif text-xl text-ivory">{edu.degree}</h3>
              <p className="text-slate text-sm mt-1">{edu.institution}</p>
              <p className="text-slate text-xs mt-1 tracking-wide">{edu.duration}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-6">Projects and Experience</p>
        <div className="space-y-10">
          {about.experience.map((exp, i) => (
            <div key={i} className="border-l border-hairline pl-6">
              <h3 className="font-serif text-xl text-ivory mb-2">{exp.title}</h3>
              <p className="text-slate text-sm leading-relaxed mb-3">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="text-xs text-slate border border-hairline px-3 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-6">Skills</p>
        <div className="flex flex-wrap gap-3">
          {about.skills.map((skill) => (
            <span key={skill} className="text-sm text-slate border border-hairline px-4 py-2 hover:text-ivory hover:border-gold transition-colors duration-300">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {about.achievements.length > 0 ? (
        <section>
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-6">Achievements</p>
          <ul className="space-y-3">
            {about.achievements.map((item, i) => (
              <li key={i} className="text-ivory text-sm flex items-start gap-3">
                <span className="text-gold mt-1">-</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export default Resume;