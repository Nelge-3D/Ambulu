

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FangGreetingQuiz from "./components/FangGreetingQuiz";
import NzebiGreetingQuiz from "./components/NzebiGreetingQuiz";
import TekeGreetingQuiz from "./components/TekeGreetingQuiz";

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

// Création des données du carrousel selon la langue
const getCarouselData = (language: Language) => {
  const langData = languageData[language];

  return [
    // Bienvenue + Introduction
    {
      title: (
        <motion.h2
          className="text-3xl sm:text-4xl font-bold italic"
          style={{ color: langData.color }}
          initial={{ scale: 0.9 }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -2, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {(langData.greeting[0]?.translation ?? "")} ! 👋
        </motion.h2>
      ),
      content: (
        <motion.div
          className="flex flex-col items-center md:flex-row gap-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <motion.p
              className="text-lg leading-relaxed mb-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <strong style={{ color: langData.darkColor }}>Bienvenue !</strong> Aujourd&lsquo;hui, vous allez découvrir vos premiers mots en{" "}
              {langData.name.toLowerCase()}.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <em>Nous allons commencer par les salutations de base</em> – un excellent point de départ pour engager une conversation simple et chaleureuse.
            </motion.p>
          </div>
          <motion.div
            className="md:w-1/2 w-full max-w-md mx-auto"
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }}
          >
            <motion.img
              src="/ice.svg"
              alt={`Illustration de salutation en ${langData.name}`}
              className="w-full rounded-lg shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.div>
        </motion.div>
      )
    },
    // Salutations
    {
      title: (
        <motion.div
          className="text-center text-xl sm:text-2xl font-semibold"
          style={{ color: langData.darkColor }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          👋 Salutations en {langData.name}
        </motion.div>
      ),
      content: (
        <motion.div
          className="space-y-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ul className="list-disc list-inside text-left space-y-3 text-base sm:text-lg">
            {langData.greeting.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <strong style={{ color: langData.darkColor }}>{item.french} :</strong>
                  <span className="ml-2 font-bold" style={{ color: langData.darkColor }}>
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
          </ul>
          <p className="italic text-sm sm:text-base text-gray-600 mt-4 text-center">
            Note : le ton et l&lsquo;intonation sont <strong>cruciaux</strong> en {langData.name}.
          </p>
          <motion.div
            className="relative my-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: langData.color }}></div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {React.createElement(langData.quiz)}
          </motion.div>
          <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-center font-medium text-blue-800 text-sm sm:text-base">
              💡 Astuce : Accompagnez toujours vos salutations d’un sourire et d’un contact visuel !
            </p>
          </motion.div>
        </motion.div>
      )
    },
    // Vocabulaire essentiel
    {
      title: (
        <motion.h3
          className="text-xl sm:text-2xl font-semibold text-center"
          style={{ color: langData.darkColor }}
        >
          📚 Vocabulaire Essentiel {langData.name}
        </motion.h3>
      ),
      content: (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.table className="w-full border-collapse rounded-lg overflow-hidden shadow mb-8">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50" style={{ color: langData.darkColor }}>
              <tr>
                <th className="py-3 px-4 text-left">Français</th>
                <th className="py-3 px-4 text-left">{langData.name}</th>
                <th className="py-3 px-4 text-left">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {langData.greeting.map((word, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 font-medium flex items-center gap-2">
                    <span>{word.emoji}</span>
                    {word.french}
                  </td>
                  <td className="py-3 px-4 font-bold" style={{ color: langData.darkColor }}>
                    {word.translation}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <motion.span
                      className="inline-block text-2xl cursor-pointer"
                      style={{ color: langData.darkColor }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => alert(`Prononciation : ${word.translation}`)}
                    >
                      🔊
                    </motion.span>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      )
    },
    // Les nombres
    {
      title: (
        <motion.div
          className="text-center text-xl sm:text-2xl font-semibold"
          style={{ color: langData.darkColor }}
        >
          🔢 Les Nombres en {langData.name}
        </motion.div>
      ),
      content: (
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ul className="space-y-2 text-left">
            <li>1 - Un → <strong>{langData.greeting[0]?.translation}</strong></li>
            <li>2 - Deux → <strong>{langData.greeting[1]?.translation}</strong></li>
            <li>3 - Trois → <strong>{langData.greeting[2]?.translation}</strong></li>
            <li>4 - Quatre → <strong>{langData.greeting[3]?.translation}</strong></li>
            <li>5 - Cinq → <strong>{langData.greeting[4]?.translation}</strong></li>
          </ul>
        </motion.div>
      )
    },
    // Exercices écrits/oraux
    {
      title: (
        <motion.div
          className="text-center text-xl sm:text-2xl font-semibold"
          style={{ color: langData.darkColor }}
        >
          ✍️ Exercices Écrits et Oraux en {langData.name}
        </motion.div>
      ),
      content: (
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Écrivez vos premières phrases</h3>
            <p className="mb-4">Utilisez les mots appris pour écrire une phrase simple en {langData.name}.</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Écrivez ici..."
            />
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Exercice oral</h3>
            <p className="mb-4">Choisissez un mot et essayez de le prononcer à haute voix :</p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              {langData.greeting.slice(0, 3).map((word, i) => (
                <li key={i}>
                  <strong>{word.french}</strong> → {word.translation}{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => alert(`Prononciation : ${word.translation}`)}
                  >
                    🔊
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )
    }
  ];
};

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fang');
  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % getCarouselData(currentLanguage).length);
  };

  const handlePrev = () => {
    const len = getCarouselData(currentLanguage).length;
    setIndex((prev) => (prev - 1 + len) % len);
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 ">
        <div className="flex justify-between w-full md:w-auto">
          
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

        {/* Mobile nav */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full mt-4 md:hidden bg-white border-t border-gray-200 pt-2 pb-3 px-2 rounded-b-lg shadow-md flex flex-col gap-3"
          >
            {renderNav()}
          </motion.nav>
        )}
      </header>

      {/* CAROUSEL */}
      <section className="px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLanguage}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mx-auto"
          >
            {getCarouselData(currentLanguage)[index].title}
            {getCarouselData(currentLanguage)[index].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 text-white rounded hover:opacity-90 transition"
            style={{ backgroundColor: languageData[currentLanguage].color }}
          >
            ◀️ Précédent
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 text-white rounded hover:opacity-90 transition"
            style={{ backgroundColor: languageData[currentLanguage].color }}
          >
            Suivant ▶️
          </button>
        </div>
      </section>
    </main>
  );

  // Fonction pour afficher la navigation
  function renderNav() {
    return (
      <>
        <select
          value={currentLanguage}
          onChange={(e) => {
            setCurrentLanguage(e.target.value as Language);
            setIndex(0);
          }}
          className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
          style={{ color: languageData[currentLanguage].darkColor }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} style={{ textTransform: "capitalize" }}>
              {languageData[lang].name}
            </option>
          ))}
        </select>
        <Link
          href="/login"
          className="bg-white border border-gray-800 px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm"
          style={{ color: languageData[currentLanguage].darkColor, borderColor: languageData[currentLanguage].darkColor }}
        >
          Connexion
        </Link>
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