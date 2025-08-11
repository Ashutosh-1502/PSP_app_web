// hooks/useTheme.ts
"use client";

import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  // Set initial theme once on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return { theme, toggleTheme };
};
