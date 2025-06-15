"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FangGreetingQuiz from "@/app/Cours/components/FangGreetingQuiz";
import NzebiGreetingQuiz from "@/app/Cours/components/NzebiGreetingQuiz";
import TekeGreetingQuiz from "@/app/Cours/components/TekeGreetingQuiz";

const languages = ['fang', 'nzebi', 'teke'] as const;
export type Language = typeof languages[number];

const languageData: Record<Language, {
  name: string;
  greeting: { french: string; translation: string; emoji: string }[];
  color: string;
  darkColor: string;
  quiz: React.ComponentType<unknown>;
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
    darkColor: "#245d47",
    quiz: FangGreetingQuiz
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
    darkColor: "green",
    quiz: NzebiGreetingQuiz
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
    darkColor: "#166534",
    quiz: TekeGreetingQuiz
  }
};

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fang');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50">
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
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <motion.h2
          className="text-center text-xl sm:text-2xl font-bold mb-8"
          style={{ color: languageData[currentLanguage].darkColor }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Vocabulaire Essentiel {languageData[currentLanguage].name}
        </motion.h2>

        <motion.div
          className="mb-8 text-lg text-gray-700 text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <motion.p
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Apprenez les mots clés en {languageData[currentLanguage].name.toLowerCase()} avec notre méthode
            <motion.span
              className="font-bold underline decoration-wavy"
              style={{ color: languageData[currentLanguage].darkColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {" "}Écouter - Répéter - Deviner
            </motion.span> :
          </motion.p>
        </motion.div>

        <motion.table
          className="w-full border-collapse rounded-2xl overflow-hidden shadow-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.thead
            className="bg-gradient-to-r from-blue-50 to-cyan-50"
            style={{ color: languageData[currentLanguage].darkColor }}
          >
            <tr>
              <th className="py-4 px-5 text-left">Français</th>
              <th className="py-4 px-5 text-left">{languageData[currentLanguage].name}</th>
              <th className="py-4 px-5 text-left">Prononciation</th>
              <th className="py-4 px-5">Audio</th>
            </tr>
          </motion.thead>
          <tbody className="divide-y divide-gray-200">
            {languageData[currentLanguage].greeting.map((word, index) => (
              <motion.tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-4 px-5 font-medium flex items-center gap-2">
                  <span>{word.emoji}</span>
                  {word.french}
                </td>
                <td className="py-4 px-5 font-bold" style={{ color: languageData[currentLanguage].darkColor }}>
                  {word.translation}
                </td>
                <td className="py-4 px-5 text-gray-600">Non disponible</td>
                <td className="py-4 px-5 text-center">
                  <motion.span
                    className="inline-block text-2xl cursor-pointer"
                    style={{ color: languageData[currentLanguage].darkColor }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => alert(`Prononciation : ${word.translation}`)}
                  >
                    🔊
                  </motion.span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>

        {/* Quiz Section */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Testez vos connaissances</h3>
          {React.createElement(languageData[currentLanguage].quiz)}
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