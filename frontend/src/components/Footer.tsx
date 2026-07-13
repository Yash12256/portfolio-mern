function Footer() {
  return (
    <footer className="bg-ink text-slate text-center py-10 mt-12 border-t border-hairline">
      <p className="font-serif text-lg text-ivory mb-1">Yashvardhan Shrimal<span className="text-gold">.</span></p>
      <p className="text-xs tracking-wide">&copy; {new Date().getFullYear()} — Crafted with care.</p>
    </footer>
  );
}

export default Footer;