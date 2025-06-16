"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Shuffle, Star, ChevronDown } from "lucide-react";
import Link
 from "next/link";
const wordCards = {
  Teke: [
    { word: "Mbote", translation: "Bonjour", audio: "/audio/teke/mbote.mp3" },
    { word: "Bana", translation: "Enfant", audio: "/audio/teke/bana.mp3" },
  ],
  Nzebi: [
    { word: "Nsalamu", translation: "Salut", audio: "/audio/nzebi/nsalamu.mp3" },
    { word: "Mwana", translation: "Enfant", audio: "/audio/nzebi/mwana.mp3" },
  ],
  Fang: [
    { word: "Mbolo", translation: "Bonjour", audio: "/audio/fang/mbolo.mp3" },
    { word: "Nna", translation: "Maman", audio: "/audio/fang/nna.mp3" },
  ],
} as const;

type Lang = keyof typeof wordCards;
const getQCM = (lang: Lang) => {
  const words = wordCards[lang];
  const correct = words[0];
  return {
    question: `Que veut dire "${correct.word}" ?`,
    choices: [correct.translation, ...words.slice(1).map((w) => w.translation)].sort(() => 0.5 - Math.random()),
    answer: correct.translation,
  };
};

const LanguageDemoSection: FC = () => {
  const [activeLang, setActiveLang] = useState<Lang>("Teke");
  const [score, setScore] = useState(0);
  const [showQCM, setShowQCM] = useState(false);
  const qcm = getQCM(activeLang);

  const playAudio = (src: string) => new Audio(src).play();

  const checkAnswer = (choice: string) => {
    if (choice === qcm.answer) {
      setScore((s) => s + 1);
      alert("✅ Bonne réponse !");
    } else {
      alert("❌ Mauvaise réponse.");
    }
    setShowQCM(false);
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["teke", "nzebi", "fang"].includes(hash)) {
      setActiveLang(hash.charAt(0).toUpperCase() + hash.slice(1) as Lang);
    }
  }, []);

  return (
    <section id="demo" className="relative w-full min-h-screen px-4 md:px-8 py-16 bg-gray-50 text-black overflow-hidden">
      {/* SVG décoratif en fond gauche */}
      <motion.img
        src="/svg/blob-left.svg"
        alt="decoration"
        className="absolute top-0 left-0 w-40 md:w-64 opacity-20 -z-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      {/* SVG décoratif en fond droit */}
      <motion.img
        src="/svg/blob-right.svg"
        alt="decoration"
        className="absolute bottom-0 right-0 w-40 md:w-64 opacity-20 -z-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      {/* Tabs Langue */}
      <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-6 gap-4">
        <div className="flex space-x-3">
          {Object.keys(wordCards).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setActiveLang(lang as Lang);
                setScore(0);
              }}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeLang === lang
                  ? "border-green-800 text-green-800"
                  : "border-transparent text-gray-500 hover:text-green-800"
              } transition`}
            >
              Démo {lang}
            </button>
          ))}
        </div>
        <Link href="auth/login" className="bg-green-800 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
          Connexion
        </Link>
      </div>

      {/* Titre et score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          {activeLang === "Teke" && "Bienvenue sur la démo Teke"}
          {activeLang === "Nzebi" && "Bienvenue sur la démo Nzebi"}
          {activeLang === "Fang" && "Bienvenue sur la démo Fang"}
        </h2>
        <div className="text-green-700 flex justify-center items-center gap-2">
          <Star className="fill-green-600 w-5 h-5" />
          Score : {score} / 5
        </div>
      </motion.div>

      {/* Cartes mots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
        {wordCards[activeLang].map(({ word, translation, audio }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white p-4 md:p-6 shadow-md border rounded-xl relative"
          >
            <h3 className="text-xl font-bold mb-1">{word}</h3>
            <p className="text-gray-600">{translation}</p>
            <button
              onClick={() => playAudio(audio)}
              className="absolute bottom-3 right-3 p-2 bg-green-100 hover:bg-green-200 rounded-full"
            >
              <Volume2 size={18} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Mini QCM */}
      <div className="flex flex-col items-center text-center mb-10">
        {showQCM ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 max-w-md mx-auto rounded-xl shadow"
          >
            <p className="mb-4 font-medium">{qcm.question}</p>
            <div className="flex flex-col gap-2">
              {qcm.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => checkAnswer(choice)}
                  className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded"
                >
                  {choice}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowQCM(true)}
            whileTap={{ scale: 0.95 }}
            className="bg-green-800 text-white px-5 py-3 rounded-full shadow hover:bg-green-700 transition flex items-center gap-2"
          >
            <Shuffle size={18} />
            Mini-jeu : QCM
          </motion.button>
        )}
        <p className="mt-2 text-sm text-gray-500">Teste tes connaissances</p>
      </div>

      {/* Mascotte */}
      <div className="absolute bottom-6 right-6 md:right-10">
        <motion.img
          src="/boko_idle.png"
          alt="Mascotte Boko"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>

      {/* Chevron animé */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-center mt-6 text-green-800"
      >
        <ChevronDown className="w-7 h-7 mx-auto" />
        <p className="text-sm text-gray-500">Continue pour en apprendre plus</p>
      </motion.div>
    </section>
  );
};

export default LanguageDemoSection;
