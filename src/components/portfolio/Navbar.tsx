import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "zyra-digitals", label: "Zyra Digitals" },
  { id: "dsa", label: "DSA" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "design", label: "Design" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const y = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="fixed top-3 right-3 z-[100]">
      {/* Small box hamburger */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        className="h-9 w-9 rounded-lg bg-black/50 border border-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Compact dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg bg-black/80 border border-white/10 backdrop-blur shadow-lg p-2">
          <nav className="grid gap-1 text-sm">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-left px-3 py-2 rounded-md text-gray-200 hover:bg-white/10 transition"
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
