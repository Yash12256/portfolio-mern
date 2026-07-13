export interface About {
  _id: string;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  education: {
    degree: string;
    institution: string;
    duration: string;
  }[];
  experience: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  achievements: string[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
  featured: boolean;
}