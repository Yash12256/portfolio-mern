import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api, { authHeader } from '../../api/axios';
import type { Project, About } from '../../types';

type Tab = 'projects' | 'about' | 'messages';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

function AdminDashboard() {
  const { token, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory">Dashboard</h1>
        <button onClick={logout} className="text-sm text-slate hover:text-gold transition-colors duration-300">
          Log Out
        </button>
      </div>

      <div className="flex gap-4 sm:gap-8 mb-12 border-b border-hairline overflow-x-auto">
        {(['projects', 'about', 'messages'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "pb-4 text-sm tracking-wide capitalize transition-colors duration-300 whitespace-nowrap " +
              (tab === t ? "text-gold border-b-2 border-gold" : "text-slate hover:text-ivory")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'projects' ? <ProjectsTab token={token} /> : null}
      {tab === 'about' ? <AboutTab token={token} /> : null}
      {tab === 'messages' ? <MessagesTab token={token} /> : null}
    </div>
  );
}

function ProjectsTab({ token }: { token: string | null }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', featured: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadProjects = () => {
    api.get('/projects').then((res) => setProjects(res.data));
  };

  useEffect(() => { loadProjects(); }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', featured: false });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      githubLink: form.githubLink,
      liveLink: form.liveLink,
      featured: form.featured,
    };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, authHeader(token));
      } else {
        await api.post('/projects', payload, authHeader(token));
      }
      resetForm();
      loadProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      featured: project.featured,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`, authHeader(token));
    loadProjects();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-16 border border-hairline p-4 sm:p-6">
        <h3 className="font-serif text-xl text-ivory mb-4">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold"
        />
        <textarea
          placeholder="Description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold resize-none"
        />
        <input
          type="text"
          placeholder="Tech stack (comma separated, e.g. React, Node.js)"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold"
        />
        <input
          type="text"
          placeholder="GitHub link"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold"
        />
        <input
          type="text"
          placeholder="Live demo link"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold"
        />
        <label className="flex items-center gap-2 text-slate text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured project
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300">
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId ? (
            <button type="button" onClick={resetForm} className="px-6 py-3 border border-hairline text-slate text-sm tracking-wide hover:text-ivory transition-colors duration-300">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="border border-hairline p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h4 className="font-serif text-lg text-ivory">{project.title}</h4>
              <p className="text-slate text-sm mt-1">{project.description}</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button onClick={() => handleEdit(project)} className="text-sm text-gold hover:underline">Edit</button>
              <button onClick={() => handleDelete(project._id)} className="text-sm text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab({ token }: { token: string | null }) {
  const [about, setAbout] = useState<About | null>(null);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/about').then((res) => {
      setAbout(res.data);
      setBio(res.data.bio);
      setSkills(res.data.skills.join(', '));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    try {
      await api.put('/about', {
        ...about,
        bio,
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      }, authHeader(token));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to update about info');
    }
  };

  if (!about) return <p className="text-slate">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-xs text-slate tracking-wide uppercase mb-2">Bio</label>
        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold resize-none"
        />
      </div>
      <div>
        <label className="block text-xs text-slate tracking-wide uppercase mb-2">Skills (comma separated)</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold"
        />
      </div>
      <button type="submit" className="px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300">
        Save Changes
      </button>
      {saved ? <p className="text-gold text-sm">Saved!</p> : null}
    </form>
  );
}

function MessagesTab({ token }: { token: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = () => {
    api.get('/contact', authHeader(token)).then((res) => setMessages(res.data));
  };

  useEffect(() => { loadMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`, authHeader(token));
    loadMessages();
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-slate">No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border border-hairline p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
              <div>
                <p className="text-ivory font-medium">{msg.name}</p>
                <p className="text-slate text-sm">{msg.email}</p>
              </div>
              <button onClick={() => handleDelete(msg._id)} className="text-sm text-red-400 hover:underline shrink-0">
                Delete
              </button>
            </div>
            <p className="text-slate text-sm mt-3">{msg.message}</p>
            <p className="text-slate text-xs mt-3">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;