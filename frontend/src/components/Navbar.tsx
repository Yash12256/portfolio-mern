import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-ink text-ivory sticky top-0 z-50 border-b border-hairline">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="font-serif text-2xl tracking-wide text-ivory"
        >
          Yashvardhan Shrimal<span className="text-gold"></span>
        </Link>

        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-sm tracking-wide text-slate hover:text-ivory transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-2xl text-ivory"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-5 px-6 pb-6 border-t border-hairline pt-5">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-sm tracking-wide text-slate hover:text-ivory transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;