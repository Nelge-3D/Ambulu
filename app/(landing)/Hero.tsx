"use client";

import { FC, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const GREETINGS = [
  "Hello", "Bonjour", "Hallo", "Ciao", "Olá", "Namaste", "Salaam", "こんにちは",
  "Здравствуйте", "你好", "안녕", "Merhaba", "שלום", "Szia", "Sawubona",
  "Γεια", "Salve", "Mbolo", "Selam", "Hej", "Halo", "Hoi", "Habari", "Saluton"
] as const;

const COLORS = [
  "text-green-600", 
  "text-green-700",
  "text-green-800",
  "text-emerald-600",
  "text-emerald-700"
];

interface FloatingWord {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const ImmersiveHeader: FC = () => {
  const [words, setWords] = useState<FloatingWord[]>([]);

  const generateWord = useCallback((): FloatingWord => {
    return {
      id: crypto.randomUUID(),
      text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.floor(Math.random() * 24 + 12),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.floor(Math.random() * 60 - 30)
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWords(prev => {
        const newWords = [...prev, generateWord()];
        return newWords.length > 20 ? newWords.slice(1) : newWords;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [generateWord]);

  const renderAnimatedLetters = (word: string) => {
    return word.split("").map((letter, index) => (
      <motion.span
        key={index}
        className="inline-block"
        animate={{ 
          y: [0, -10, 0],
          rotate: index % 2 === 0 ? [0, 10, -10, 0] : [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: index * 0.1
        }}
      >
        {letter}
      </motion.span>
    ));
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center text-center px-4"
      aria-label="Page d'accueil"
    >
      {/* Mots flottants */}
      <AnimatePresence>
        {words.map((word) => (
          <motion.span
            key={word.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: [0, 0.3, 0.2], 
              y: [word.y - 20, word.y],
              x: [word.x, word.x + (Math.random() * 10 - 5)]
            }}
            exit={{ opacity: 0, y: word.y + 20 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className={`absolute ${word.color} font-bold pointer-events-none z-0`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.size}px`,
              transform: `rotate(${word.rotation}deg)`
            }}
            aria-hidden="true"
          >
            {word.text}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Logo principal animé */}
      <motion.h1
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-black z-10 font-italiana mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {renderAnimatedLetters("Mbolo")}
      </motion.h1>

      {/* Sous-titre */}
      <motion.p 
        className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl z-10 px-4 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Apprends à ton rythme et contribue à préserver nos patrimoines linguistiques.
      </motion.p>

      {/* Indicateur de défilement */}
      <motion.div
        className="mt-12 sm:mt-16 text-green-700 z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      >
        <ChevronDown size={40} strokeWidth={2.5} />
      </motion.div>

      {/* Navigation par langues */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 flex flex-wrap justify-center gap-3 sm:gap-4 z-10 px-4 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {["Teke", "Nzebi", "Fang", "Dictionnaire", "Traduction"].map((label) => {
          const href =
            label === "Dictionnaire"
              ? "/dictionnaire"
              : label === "Traduction"
              ? "/traduction"
              : `#demo`;

          return (
            <motion.div
              key={label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link
                href={href}
                className={`relative z-10 px-5 py-3 text-lg font-medium rounded-full border-2 border-green-700 text-white bg-green-700 transition-colors duration-300 hover:bg-green-800 hover:border-green-800 flex items-center justify-center min-w-[120px]`}
                aria-label={`Aller à ${label}`}
              >
                {label}
                <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-full" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ImmersiveHeader;