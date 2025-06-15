"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const languages = ['fang', 'nzebi', 'teke'] as const;
export type Language = typeof languages[number];

const languageData: Record<Language, {
  name: string;
  greeting: { french: string; translation: string; emoji: string }[];
  color: string;
  darkColor: string;
}> = {
  fang: {
    name: "Fang",
    greeting: [
      { french: "Bonjour (formel)", translation: "Mbolo", emoji: "👔" },
      { french: "Bonjour (familier)", translation: "Mbolo bé", emoji: "😊" },
      { french: "Comment ça va ?", translation: "Wa'a ?", emoji: "❓" },
      { french: "Ça va bien", translation: "Me wa'a", emoji: "👍" },
      { french: "Merci", translation: "Oyié", emoji: "🙏" }
    ],
    color: "#5E9A8C",
    darkColor: "#245d47"
  },
  nzebi: {
    name: "Nzebi",
    greeting: [
      { french: "Bonjour", translation: "Mbolani", emoji: "🌞" },
      { french: "Comment ça va ?", translation: "Wolo nani ?", emoji: "❓" },
      { french: "Ça va bien", translation: "Nani mbote", emoji: "👍" },
      { french: "Merci", translation: "Ndongui", emoji: "🙏" },
      { french: "Au revoir", translation: "Kende malamu", emoji: "👋" }
    ],
    color: "green",
    darkColor: "green"
  },
  teke: {
    name: "Téké",
    greeting: [
      { french: "Bonjour", translation: "Mbote", emoji: "🌞" },
      { french: "Comment ça va ?", translation: "Nzela nini ?", emoji: "❓" },
      { french: "Ça va bien", translation: "Nzela malamu", emoji: "👍" },
      { french: "Merci", translation: "Matondi", emoji: "🙏" },
      { french: "Bienvenue", translation: "Boyei malamu", emoji: "👐" }
    ],
    color: "#166534",
    darkColor: "#166534"
  }
};

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fang');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 ">
        <div className="flex justify-between w-full md:w-auto">
          <h1 className="text-3xl font-bold" style={{ color: languageData[currentLanguage].color }}>MBOLO</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4 items-center">
          {renderNav()}
        </nav>

        {/* Mobile nav dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full mt-4 md:hidden bg-white border-t border-gray-200 pt-2 pb-3 px-2 rounded-b-lg shadow-md flex flex-col gap-3"
          >
            {renderNav()}
          </motion.div>
        )}
      </header>

      {/* CONTENT */}
      <section className="px-4 py-10 max-w-2xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            🔢
          </motion.span>
          <span className="text-xl sm:text-2xl font-semibold" style={{ color: languageData[currentLanguage].darkColor }}>
            Les Nombres en {languageData[currentLanguage].name}
          </span>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4">Apprendre les nombres</h3>
          <p className="mb-4">Voici quelques nombres de base en {languageData[currentLanguage].name} :</p>
          <ul className="space-y-2 text-base">
            <li>1 - Un → <strong>{languageData[currentLanguage].greeting[0]?.translation}</strong></li>
            <li>2 - Deux → <strong>{languageData[currentLanguage].greeting[1]?.translation}</strong></li>
            <li>3 - Trois → <strong>{languageData[currentLanguage].greeting[2]?.translation}</strong></li>
            <li>4 - Quatre → <strong>{languageData[currentLanguage].greeting[3]?.translation}</strong></li>
            <li>5 - Cinq → <strong>{languageData[currentLanguage].greeting[4]?.translation}</strong></li>
          </ul>
        </motion.div>
      </section>
    </main>
  );

  // Helper to render navigation
  function renderNav() {
    return (
      <>
        <select
          value={currentLanguage}
          onChange={(e) => {
            setCurrentLanguage(e.target.value as Language);
          }}
          className="bg-white border border-gray-300 rounded-md px-3 py-2"
          style={{ color: languageData[currentLanguage].darkColor }}
        >
          {languages.map(lang => (
            <option key={lang} value={lang} style={{ textTransform: 'capitalize' }}>
              {languageData[lang].name}
            </option>
          ))}
        </select>
        <Link
          href="/search"
          className="px-6 py-2 rounded-md hover:bg-opacity-90 transition text-sm"
          style={{
            backgroundColor: languageData[currentLanguage].color,
            color: "white"
          }}
        >
          Insérer une langue
        </Link>
      </>
    );
  }
}