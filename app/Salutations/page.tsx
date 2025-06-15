"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FangGreetingQuiz from "@/app/Cours/components/FangGreetingQuiz";
import NzebiGreetingQuiz from "@/app/Cours/components/NzebiGreetingQuiz";
import TekeGreetingQuiz from "@/app/Cours/components/TekeGreetingQuiz";

// Définir le type manuellement sans utiliser un tableau constant
export type Language = "fang" | "nzebi" | "teke";

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
  const [currentLanguage, setCurrentLanguage] = useState<Language>("fang");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Render navigation buttons for language selection
  function renderNav() {
    return (
      <>
        {(["fang", "nzebi", "teke"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => {
              setCurrentLanguage(lang);
              setIsMenuOpen(false);
            }}
            className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
              currentLanguage === lang
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={
              currentLanguage === lang
                ? { border: `2px solid ${languageData[lang].color}` }
                : {}
            }
          >
            {languageData[lang].name}
          </button>
        ))}
      </>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 ">
        <div className="flex justify-between w-full md:w-auto">
          <h1 className="text-3xl font-bold" style={{ color: languageData[currentLanguage].color }}>
            MBOLO
          </h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4 items-center">{renderNav()}</nav>

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

      <motion.h2
        className="text-center text-xl md:text-2xl font-bold mb-8 mt-8"
        style={{ color: languageData[currentLanguage].darkColor }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        👋 Salutations en {languageData[currentLanguage].name}
      </motion.h2>

      <motion.div
        className="space-y-6 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.p
          className="text-center font-semibold text-2xl mb-6"
          style={{ color: languageData[currentLanguage].color }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Bases des salutations
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-left space-y-3 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {languageData[currentLanguage].greeting.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{ x: 5 }}
            >
              <span className="mr-2 text-xl">{item.emoji}</span>
              <div>
                <strong style={{ color: languageData[currentLanguage].darkColor }}>
                  {item.french} :
                </strong>
                <span className="ml-2 font-bold" style={{ color: languageData[currentLanguage].darkColor }}>
                  {item.translation}
                </span>
                <motion.span
                  className="ml-2 text-blue-500 cursor-pointer inline-block"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => alert(`Prononciation : ${item.translation}`)}
                >
                  🔊
                </motion.span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <motion.p
          className="italic text-center text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Note : le ton et l&lsquo;intonation sont <strong>cruciaux</strong> en{" "}
          {languageData[currentLanguage].name} !
        </motion.p>
        <motion.div
          className="relative my-6"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="h-px bg-gradient-to-r from-transparent via-current to-transparent"
            style={{ color: languageData[currentLanguage].color }}
          ></div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {React.createElement(languageData[currentLanguage].quiz)}
        </motion.div>
        <motion.div
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-center font-medium text-blue-800">
            💡 Astuce : Accompagnez toujours vos salutations d’un sourire et d’un contact visuel !
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}