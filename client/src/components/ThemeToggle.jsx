import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auragiving-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("auragiving-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setDark((d) => !d)}
      className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0 ${className}`}
    >
      {dark ? (
        <Sun className="w-4 h-4 text-[#FBBF24] transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#1E40AF] transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
