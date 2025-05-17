"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check saved preference on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const lightMode = html.classList.toggle("light");

    localStorage.setItem("theme", lightMode ? "light" : "dark");
    setIsLight(lightMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md z-[100000]"
    >
      {isLight ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
