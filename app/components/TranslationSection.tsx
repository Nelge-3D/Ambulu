"use client";

import { useState } from "react";
import { ArrowLeftRight, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const vernacularLanguages = ["Fang", "Punu", "Nzebi", "Teke", "Kota"];

const translations: Record<string, Record<string, string>> = {
  Fang: { "Comment ça va ?": "Mbolo wane ?" },
  Nzebi: { "Tu vas bien ?": "Nge ndji ?" },
  Teke: { "Ça va ?": "Ina ngayi ?" },

};

export default function TranslationSection() {
  const [toLang, setToLang] = useState("Fang");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [history, setHistory] = useState<
    { from: string; to: string; source: string; result: string }[]
  >([]);

  const handleTranslate = () => {
    const translated =
      translations[toLang]?.[inputText] || "[Traduction indisponible]";
    setTranslatedText(translated);
    setHistory([
      { from: "Français", to: toLang, source: inputText, result: translated },
      ...history,
    ]);
  };

  return (
    <section className="px-4 py-8 flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-4 flex items-center gap-2">
          <span role="img" aria-label="translation">🌐</span>
          <h1 className="text-xl font-bold">Traduction</h1>
        </div>

        {/* Langues */}
        <div className="bg-teal-50 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-sm font-medium text-black">
          <span className="text-gray-800">FRANÇAIS</span>
          <ArrowLeftRight className="w-5 h-5 text-teal-600" />
          <select
            className="border border-teal-400 rounded-md px-2 py-1 text-black bg-white"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
          >
            {vernacularLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Saisie */}
        <div className="px-6 py-4 space-y-3">
          <input
            type="text"
            placeholder="Écris une phrase en français..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleTranslate}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition"
          >
            Traduire
          </button>
        </div>

        {/* Résultat */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200 text-center min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key="fr-input"
              className="p-4 border-b md:border-b-0 md:border-r text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {inputText || <span className="italic text-gray-400">Entrée vide</span>}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key="vernac-output"
              className="p-4 text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {translatedText || <span className="italic text-gray-400">Traduction</span>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Historique */}
        {history.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <History className="w-4 h-4" />
              <h2 className="text-sm font-semibold">Historique des traductions</h2>
            </div>
            <ul className="text-sm space-y-2 max-h-40 overflow-y-auto">
              {history.map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white rounded-md px-3 py-2 shadow-sm"
                >
                  <span className="text-gray-800 font-medium">{entry.source}</span>
                  <ArrowLeftRight className="w-4 h-4 text-teal-500 mx-2" />
                  <span className="text-gray-600">{entry.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
