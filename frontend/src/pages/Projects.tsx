import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Project } from '../types';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate text-sm tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">Work</p>
      <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-16">
        Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-slate">No projects added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className={
                "relative overflow-hidden border border-hairline p-6 sm:p-8 hover:border-gold hover:-translate-y-1 transition-all duration-300 group " +
                (project.featured ? "md:col-span-2" : "")
              }
            >
              <span className="absolute top-4 right-6 font-serif text-4xl md:text-6xl text-hairline group-hover:text-gold/20 transition-colors duration-300 select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {project.featured ? (
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Featured</p>
              ) : null}

              <h3 className="relative font-serif text-xl md:text-2xl text-ivory mb-3 group-hover:text-gold transition-colors duration-300 max-w-[70%]">
                {project.title}
              </h3>

              <p className="relative text-slate text-sm leading-relaxed mb-5 max-w-lg">
                {project.description}
              </p>

              <div className="relative flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs text-slate border border-hairline px-3 py-1 group-hover:border-gold/40 transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="relative flex gap-6 text-sm">
                {project.githubLink ? (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors duration-300 flex items-center gap-1">
                    GitHub
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </a>
                ) : null}
                {project.liveLink ? (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold transition-colors duration-300 flex items-center gap-1">
                    Live Demo
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;