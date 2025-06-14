"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import styles from './styles.module.css';
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    color: "#8C5E9A",
    darkColor: "#5d2457",
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
    color: "#9A8C5E",
    darkColor: "#5d4724",
    quiz: TekeGreetingQuiz
  }
};

const getCarouselData = (language: Language) => {
  const langData = languageData[language];

    return [
    // Carousel 1 - Bienvenue
    {
      content: (
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-20 mt-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl font-bold italic mb-6"
              style={{ color: langData.color }}
              initial={{ scale: 0.9 }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {(langData.greeting[0]?.translation ?? "")} ! 👋
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              <motion.p
                className="text-lg leading-relaxed mb-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <strong style={{ color: langData.darkColor }}>Bienvenue !</strong> Aujourd&lsquo;hui, vous allez découvrir vos premiers mots en {langData.name.toLowerCase()}.
              </motion.p>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <strong className={styles.languageText}>Bienvenue !</strong> Aujourd&lsquo;hui, vous allez découvrir vos premiers mots en {langData.name.toLowerCase()}.
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
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
              className="w-full max-w-[800px] lg:max-w-[1000px] rounded-lg shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.div>
        </motion.div>
      ),
    },
    // Carousel 2 - Salutations
    {
      title: (
        <motion.div
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
          className="space-y-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.p
            className="text-center font-semibold text-2xl mb-6"
            style={{ color: langData.color }}
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
            {langData.greeting.map((item, index) => (
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
                  <strong style={{ color: langData.darkColor }}>{item.french} :</strong>
                  <span className="ml-2 font-bold" style={{ color: langData.darkColor }}>{item.translation}</span>
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
            Note : le ton et l&lsquo;intonation sont <strong>cruciaux</strong> en {langData.name} !
          </motion.p>
          <motion.div
            className="relative my-6"
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
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-center font-medium text-blue-800">
              💡 Astuce : Accompagnez toujours vos salutations d&lsquo;un sourire et d&lsquo;un contact visuel !
            </p>
          </motion.div>
        </motion.div>
      )
    },
    // Carousel 3 - Vocabulaire essentiel
    {
      title: (
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            📚
          </motion.span>
          <span>Vocabulaire Essentiel {langData.name}</span>
        </motion.div>
      ),
      content: (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
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
              Apprenez les mots clés en {langData.name.toLowerCase()} avec notre méthode
              <motion.span
                className="font-bold underline decoration-wavy"
                style={{ color: langData.darkColor }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {" "}Écouter - Répéter - Deviner
              </motion.span> :
            </motion.p>
          </motion.div>
          <motion.table className="w-full border-collapse rounded-2xl overflow-hidden shadow-xl mb-10">
            <motion.thead className="bg-gradient-to-r from-blue-50 to-cyan-50" style={{ color: langData.darkColor }}>
              <tr>
                <th className="py-4 px-5 text-left w-1/4">Français</th>
                <th className="py-4 px-5 text-left w-1/4">{langData.name}</th>
                <th className="py-4 px-5 text-left w-1/4">Prononciation</th>
                <th className="py-4 px-5 w-1/4">Audio</th>
              </tr>
            </motion.thead>
            <motion.tbody className="divide-y divide-gray-200">
              {langData.greeting.map((word, index) => (
                <motion.tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-4 px-5 font-medium flex items-center">
                    <span className="mr-3 text-xl">{word.emoji}</span>
                    {word.french}
                  </td>
                  <td className="py-4 px-5 font-bold" style={{ color: langData.darkColor }}>
                    {word.translation}
                  </td>
                  <td className="py-4 px-5 text-gray-600">Non disponible</td>
                  <td className="py-4 px-5 text-center">
                    <motion.span
                      className="inline-block text-2xl cursor-pointer"
                      style={{ color: langData.darkColor }}
                      whileHover={{ scale: 1.3 }}
                      onClick={() => alert(`Prononciation : ${word.translation}`)}
                    >
                      🔊
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </motion.div>
      )
    },
    // Carousel 4 - Prononciation
    {
      title: (
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            🔊
          </motion.span>
          <span>Maîtrisez la Prononciation {langData.name}</span>
        </motion.div>
      ),
      content: (
        <motion.div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Exercice audio</h3>
            <p className="mb-4">Écoutez les prononciations suivantes en {langData.name} :</p>
            <ul>
              {langData.greeting.map((word, i) => (
                <li key={i}>
                  <button
                    className="underline text-blue-500"
                    onClick={() => alert(`Prononciation : ${word.translation}`)}
                  >
                    {word.french} → {word.translation}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )
    },
    // Carousel 5 - Quiz interactif
    {
      title: (
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            📝
          </motion.span>
          <span>Atelier d&lsquo;Évaluation {langData.name}</span>
        </motion.div>
      ),
      content: (
        <motion.div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Jeu d&lsquo;association</h3>
            <p className="mb-4">Associez les termes français aux traductions en {langData.name}.</p>
            <ul>
              {langData.greeting.map((word, i) => (
                <li key={i} className="mb-2">
                  <strong>{word.french}</strong> → <em>{word.translation}</em>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )
    },
    // Carousel 6 - Nombres
    {
      title: (
        <motion.div
          className="flex items-center justify-center gap-3"
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
          <span>Les Nombres en {langData.name}</span>
        </motion.div>
      ),
      content: (
        <motion.div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Apprendre les nombres</h3>
            <p className="mb-4">Voici quelques nombres de base en {langData.name} :</p>
            <ul>
              <li>1 - Un → <strong>{langData.greeting[0]?.translation}</strong></li>
              <li>2 - Deux → <strong>{langData.greeting[1]?.translation}</strong></li>
              <li>3 - Trois → <strong>{langData.greeting[2]?.translation}</strong></li>
              <li>4 - Quatre → <strong>{langData.greeting[3]?.translation}</strong></li>
              <li>5 - Cinq → <strong>{langData.greeting[4]?.translation}</strong></li>
            </ul>
          </motion.div>
        </motion.div>
      )
    }
  ];
};

export default function Page() {
  const [index, setIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fang');

  useEffect(() => {
    document.documentElement.style.setProperty('--language-color', languageData[currentLanguage].color);
    document.documentElement.style.setProperty('--language-dark-color', languageData[currentLanguage].darkColor);
  }, [currentLanguage]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % getCarouselData(currentLanguage).length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + getCarouselData(currentLanguage).length) % getCarouselData(currentLanguage).length);
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className={`text-4xl font-bold ${styles[`${currentLanguage}Color`]}`}>MBOLO</h1>
        <div className="hidden md:flex space-x-4 items-center">
          <select
            value={currentLanguage}
            onChange={(e) => {
              setCurrentLanguage(e.target.value as Language);
              setIndex(0);
            }}
            className={`bg-white border border-gray-300 rounded-md px-3 py-2 ${styles.languageSelect}`}
            aria-label="Sélectionner une langue"
            title="Sélectionner une langue"
          >
            {languages.map(lang => (
              <option key={lang} value={lang} style={{ textTransform: 'capitalize' }}>
                {languageData[lang].name}
              </option>
            ))}
          </select>
          <Link
            href="/login"
            className={`bg-white border px-6 py-3 rounded-md hover:bg-gray-50 transition ${styles.languageLink}`}
          >
            Connexion
          </Link>
          <Link
            href="/search"
            className={`px-8 py-3 rounded-md hover:bg-opacity-80 transition ${styles.languageLinkBg}`}
          >
            insérer une langue
          </Link>
        </div>
      </header>

      {/* CARROUSEL */}
      <section className="text-center px-4 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLanguage}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className={`text-2xl font-semibold mb-4 ${styles.languageTitle}`}>
              {getCarouselData(currentLanguage)[index].title}
            </h3>
            {getCarouselData(currentLanguage)[index].content}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={handlePrev}
            className={`px-4 py-2 text-white rounded hover:opacity-90 transition ${styles.navButton}`}
          >
            ◀️ Précédent
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 text-white rounded hover:opacity-90 transition ${styles.navButton}`}
          >
            Suivant ▶️
          </button>
        </div>
      </section>
    </main>
  );
}