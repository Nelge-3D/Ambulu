"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FangGreetingQuiz from "./components/FangGreetingQuiz";
import NzebiGreetingQuiz from "./components/NzebiGreetingQuiz";
import TekeGreetingQuiz from "./components/TekeGreetingQuiz";


export const languages = ['fang', 'nzebi', 'teke'] as const;
export type Language = typeof languages[number];

// Mapping from language code to display name
export const languageNames: Record<Language, string> = {
  fang: "Fang",
  nzebi: "Nzebi",
  teke: "Téké"
};


const languageData = {
 fang: {
   name: "Fang",
   greeting: [] as { french: string; translation: string; emoji: string }[],
   color: "#5E9A8C",
   darkColor: "#245d47",
   quiz: FangGreetingQuiz
 },
 nzebi: {
   name: "Nzebi",
   greeting: [] as { french: string; translation: string; emoji: string }[],
   color: "#8C5E9A",
   darkColor: "#5d2457",
   quiz: NzebiGreetingQuiz
 },
 teke: {
   name: "Téké",
   greeting: [] as { french: string; translation: string; emoji: string }[],
   color: "#9A8C5E",
   darkColor: "#5d4724",
   quiz: TekeGreetingQuiz
 }
};


const getCarouselData = (language: Language) => {
 const langData = languageData[language];
  return [
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
               <strong style={{ color: langData.darkColor }}>Bienvenue !</strong> Aujourd'hui, vous allez découvrir vos premiers mots en {langData.name.toLowerCase()}.
             </motion.p>
             <motion.p
               className="text-lg leading-relaxed"
               initial={{ y: 20 }}
               animate={{ y: 0 }}
               transition={{ delay: 0.2 }}
             >
               <em>Nous allons commencer par les salutations de base</em> - un excellent point de départ pour engager une conversation simple et chaleureuse.
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
             alt="Illustration de salutation"
             className="w-full max-w-[800px] lg:max-w-[1000px] rounded-lg shadow-xl"
             whileHover={{ scale: 1.02 }}
             transition={{ type: "spring", stiffness: 400 }}
           />
         </motion.div>
       </motion.div>
     ),
   },
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
           {languageData[language].greeting.map((item, index) => (
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
                   className="ml-2 text-blue-500 cursor-pointer"
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
           Note : le ton et l'intonation sont <strong>cruciaux</strong> en {langData.name} !
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
             💡 Astuce : Accompagnez toujours vos salutations d'un sourire et d'un contact visuel !
           </p>
         </motion.div>
       </motion.div>
     )
   },



        // Carousel 2
  {
  title: (
    <motion.div 
      className="text-[#245d47] flex items-center justify-center gap-2"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
      >
        📖
      </motion.span>
      Salutations en Fang
    </motion.div>
  ),
  content: (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Introduction avec animation */}
      <motion.div
        className="mb-8 text-lg text-gray-700 text-left"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <motion.p 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          En fang, les salutations varient selon <span className="font-bold text-[#5E9A8C]">le moment de la journée</span> et le <span className="font-bold text-[#5E9A8C]">contexte social</span>. Voici les bases :
        </motion.p>
        
        {/* Liste animée */}
        <motion.ul 
          className="list-disc list-inside mb-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { term: "Mbolo", translation: "Bonjour (neutre)", icon: "🌞" },
            { term: "Mbolo ma ne", translation: "Bonjour à toi (informel)", icon: "👋" },
            { term: "Mbolo ma nyé", translation: "Bonjour à vous (formel/pluriel)", icon: "👔" },
            { term: "Kiégnam", translation: "Bonsoir/Bonne nuit", icon: "🌙" }
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-baseline"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ x: 5 }}
            >
              <span className="mr-2 text-xl">{item.icon}</span>
              <div>
                <span className="font-semibold text-[#1e7a5c]">{item.term}</span> - {item.translation}
                <motion.span
                  className="ml-2 text-blue-500 cursor-pointer inline-block"
                  whileHover={{ scale: 1.3 }}
                  onClick={() => alert(`Prononciation : ${item.term}`)}
                >
                  🔊
                </motion.span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Jeu interactif amélioré */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 shadow-sm"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="text-2xl"
          >
            🎮
          </motion.span>
          <h3 className="text-xl font-bold text-blue-800">Jeu de pratique</h3>
        </motion.div>
        
        <motion.p 
          className="mb-6 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Choisis la bonne salutation pour chaque situation :
        </motion.p>
        
        <div className="space-y-6">
          {/* Question 1 */}
          <motion.div
            className="quiz-card bg-white p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
            onClick={() => alert("Correct! 🎉 'Mbolo ma nyé' est la forme respectueuse pour les aînés.")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-medium flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full">1</span>
              Tu rencontres le chef du village :
            </p>
            <div className="flex gap-3 mt-3">
              <motion.span 
                className="bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#93c5fd" }}
              >
                Mbolo ma nyé
              </motion.span>
              <motion.span 
                className="bg-gray-100 px-4 py-2 rounded-full text-gray-800"
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
              >
                Mbolo ma ne
              </motion.span>
            </div>
          </motion.div>

          {/* Question 2 */}
          <motion.div
            className="quiz-card bg-white p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
            onClick={() => alert("Exact! 👍 'Kiégnam' s'utilise en fin de journée.")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-medium flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full">2</span>
              Il est 19h, tu croises un voisin :
            </p>
            <div className="flex gap-3 mt-3">
              <motion.span 
                className="bg-gray-100 px-4 py-2 rounded-full text-gray-800"
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
              >
                Mbolo
              </motion.span>
              <motion.span 
                className="bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#93c5fd" }}
              >
                Kiégnam
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Astuce avec animation */}
        <motion.div
          className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-yellow-700 flex items-start">
            <motion.span 
              className="mr-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💡
            </motion.span>
            <span><span className="font-bold">Astuce :</span> En fang, on accompagne souvent les salutations d'une poignée de main douce et prolongée.</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Micro-interaction finale */}
      <motion.div
        className="mt-8 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          Essayez ces salutations avec un ami !
        </motion.p>
      </motion.div>
    </motion.div>
  )
},

// Carousel 3
     {
  title: (
    <>
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
        <span>Vocabulaire Essentiel {languageNames[language]}</span>
      </motion.div>

      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <motion.div className="mb-8 text-lg text-gray-700 text-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Apprenez les mots clés en {languageNames[language].toLowerCase()} avec notre méthode
            <motion.span
              className="font-bold text-[#245d47] underline decoration-wavy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {" "}"Écouter - Répéter - Deviner"
            </motion.span> :
          </motion.p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 mb-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.table className="w-full">
            <motion.thead className="bg-gradient-to-r from-[#e5f4f1] to-[#c1e5d9]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <tr>
                <th className="py-4 px-5 text-left w-1/4 text-[#245d47]">Français</th>
                <th className="py-4 px-5 text-left w-1/4 text-[#245d47]">{languageNames[language]}</th>
                <th className="py-4 px-5 text-left w-1/4 text-[#245d47]">Prononciation</th>
                <th className="py-4 px-5 w-1/4 text-[#245d47]">Audio</th>
              </tr>
            </motion.thead>
            <motion.tbody className="divide-y divide-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}>
              {(languageData[language].greeting as { french: string; translation: string; emoji: string }[]).map((word, index) => (
                <motion.tr key={index} className="hover:bg-[#f0f9f6] transition-colors duration-200 group" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.01 }}>
                  <td className="py-4 px-5 font-medium flex items-center">
                    <span className="mr-3 text-xl">{word.emoji}</span>
                    {word.french}
                  </td>
                  <td className="py-4 px-5 text-[#1e7a5c] font-bold">{word.translation}</td>
                  <td className="py-4 px-5 text-gray-600">{/* Prononciation non disponible */}</td>
                  <td className="py-4 px-5 text-center">
                    <motion.span
                      className="inline-block text-2xl cursor-pointer"
                      onClick={() => alert(`Prononciation : ${word.translation}`)}
                      whileHover={{ scale: 1.3, color: "#245d47" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🔊
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </motion.div>
      </motion.div>
    </>
  ),
   },


  // / Carousel 4
 {
  title: (
    <motion.div 
      className="flex items-center justify-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🔊
      </motion.span>
      <span>Maîtrisez la Prononciation Fang</span>
    </motion.div>
  ),
  content: (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-8 text-lg text-gray-700 text-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Entraînez-vous avec notre{" "}
          <motion.span 
            className="font-bold text-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            studio d'enregistrement interactif
          </motion.span> :
        </motion.p>
      </motion.div>

      {/* Module d'écoute amélioré */}
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200 shadow-lg mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-purple-800 flex items-center">
            <motion.span 
              className="mr-3"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎧
            </motion.span>
            Écoute Active
          </h3>
          <motion.span 
            className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            Nouveau
          </motion.span>
        </motion.div>
        
        <motion.div
          className="flex flex-col md:flex-row gap-6 items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-full md:w-1/2">
            <p className="font-medium mb-2 text-gray-700">Mot à pratiquer :</p>
            <motion.div
              className="text-3xl font-bold text-purple-900 mb-1"
              whileHover={{ scale: 1.02 }}
            >
              "Mbolo"
            </motion.div>
            <p className="text-gray-500">[mbó-ló]</p>
          </div>
          
          <div className="w-full md:w-1/2 space-y-4">
            <motion.button 
              className="w-full flex items-center justify-center bg-purple-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              whileHover={{ y: -2, backgroundColor: "#7c3aed" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Lecture de la prononciation")}
            >
              <motion.span 
                className="mr-3 text-xl"
                whileHover={{ scale: 1.3 }}
              >
                ▶️
              </motion.span>
              <span className="font-medium">Écouter la prononciation</span>
            </motion.button>
            
            <motion.button 
              className="w-full flex items-center justify-center bg-white border-2 border-purple-300 text-purple-600 px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-all"
              whileHover={{ y: -2, backgroundColor: "#f5f3ff" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="mr-3 text-xl"
                animate={{ rotate: [0, 180, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🔁
              </motion.span>
              <span className="font-medium">Ralentir (0.5x)</span>
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          className="relative pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-purple-700">Progrès</span>
            <span className="text-sm font-semibold text-purple-700">3/10 mots maîtrisés</span>
          </div>
          <div className="overflow-hidden h-3 bg-purple-200 rounded-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Module d'enregistrement amélioré */}
      <motion.div
        className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-blue-800 flex items-center">
            <motion.span 
              className="mr-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎤
            </motion.span>
            Votre Tour
          </h3>
          <motion.span 
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full animate-pulse"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Exercice
          </motion.span>
        </motion.div>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Enregistrez votre voix :</span>
            <motion.span 
              className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full flex items-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              En direct
            </motion.span>
          </div>
          
          <motion.div
            className="bg-gray-100 rounded-xl p-5 mb-4"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-center gap-2 h-12">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div 
                  key={i}
                  className="h-8 w-2 bg-blue-400 rounded-full"
                  animate={{ 
                    height: [`${Math.random()*20 + 10}px`, `${Math.random()*30 + 20}px`, `${Math.random()*15 + 5}px`],
                  }}
                  transition={{ 
                    duration: 0.8 + Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          <div className="flex gap-4">
            <motion.button
              className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ y: -2, backgroundColor: "#ef4444" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="w-3 h-3 bg-white rounded-full mr-2"></span>
              <span className="font-medium">Enregistrer</span>
            </motion.button>
            
            <motion.button
              className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ y: -2, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ↻
              </motion.span>
              <span className="font-medium">Réessayer</span>
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-yellow-700 flex items-start">
            <motion.span 
              className="mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡
            </motion.span>
            <span><span className="font-bold">Conseil :</span> Exagérez les sons nasaux (mb, nd) et les tons descendants (ó) pour une meilleure prononciation.</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Comparaison audio améliorée */}
      <motion.div
        className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="font-medium mb-4 text-gray-800 flex items-center">
          <motion.span 
            className="mr-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            📊
          </motion.span>
          Analyse Comparative
        </h4>
        
        <motion.div
          className="flex items-center justify-between bg-white p-4 rounded-lg"
          whileHover={{ scale: 1.01 }}
        >
          <div className="text-center">
            <p className="font-medium text-sm text-gray-700">Modèle natif</p>
            <p className="text-xs text-gray-500">Durée: 0.8s</p>
          </div>
          
          <motion.button
            className="bg-gray-100 px-4 py-2 rounded-full flex items-center text-sm"
            whileHover={{ backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">▶</span> Comparer
          </motion.button>
          
          <div className="text-center">
            <p className="font-medium text-sm text-gray-700">Votre version</p>
            <p className="text-xs text-gray-500">Durée: 1.2s</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
},


// / Carousel 5

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
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        📝
      </motion.span>
      <span>Atelier d'Évaluation Fang</span>
    </motion.div>
  ),
  content: (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* En-tête animé */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 border border-gray-200 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="text-2xl mr-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🧩
          </motion.span>
          <h3 className="text-xl font-bold text-gray-800">Jeu d'Association</h3>
        </motion.div>
        
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Glissez les mots Fang vers leurs traductions françaises correspondantes
        </motion.p>
        
        <motion.div
          className="relative pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-blue-600">Progression</span>
            <span className="text-xs font-semibold text-blue-600">66%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Zone de jeu interactive améliorée */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Colonne Fang - éléments draggables */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h4
            className="font-bold text-lg mb-4 text-blue-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span 
              className="mr-2 text-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🇬🇦
            </motion.span>
            Mots Fang
          </motion.h4>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 1 }}
          >
            {["Mbolo", "Y'o num", "Má bóé", "Ndá", "Mendzim"].map((word, index) => (
              <motion.div
                key={index}
                draggable="true"
                className="drag-item bg-blue-50 text-blue-800 p-4 rounded-lg cursor-grab active:cursor-grabbing hover:bg-blue-100 transition-all shadow-sm border border-blue-200 flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileDrag={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)" }}
                whileHover={{ scale: 1.02 }}
                onDragStart={(e) => ((e as unknown) as React.DragEvent<HTMLDivElement>).dataTransfer.setData("text/plain", word)}
              >
                <motion.span
                  className="mr-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👋
                </motion.span>
                {word}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Colonne Français - zones de dépôt */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h4
            className="font-bold text-lg mb-4 text-purple-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span 
              className="mr-2 text-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🇫🇷
            </motion.span>
            Traductions
          </motion.h4>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 1 }}
          >
            {[
              { id: 1, text: "Bonjour", answer: "Mbolo", emoji: "🗣️" },
              { id: 2, text: "Comment ça va ?", answer: "Y'o num", emoji: "❓" },
              { id: 3, text: "Merci", answer: "Má bóé", emoji: "🙏" },
              { id: 4, text: "Maison", answer: "Ndá", emoji: "🏠" },
              { id: 5, text: "Eau", answer: "Mendzim", emoji: "💧" }
            ].map((item) => (
              <motion.div
                key={item.id}
                className="drop-zone h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all hover:bg-purple-50 relative"
                onDrop={(e) => {
                  e.preventDefault();
                  const word = e.dataTransfer.getData("text/plain");
                  if (word === item.answer) {
                    e.currentTarget.innerHTML = `
                      <div class="bg-green-100 text-green-800 p-3 rounded-xl w-full h-full flex items-center justify-center font-bold">
                        <span class="mr-2">${item.emoji}</span>
                        ${word} ✓
                      </div>
                    `;
                  } else {
                    e.currentTarget.innerHTML = `
                      <div class="bg-red-100 text-red-800 p-3 rounded-xl w-full h-full flex items-center justify-center font-bold">
                        Essaie encore !
                      </div>
                    `;
                    setTimeout(() => {
                      e.currentTarget.innerHTML = `
                        <div class="text-gray-500 flex items-center">
                          <span class="mr-2">${item.emoji}</span>
                          ${item.text}
                        </div>
                      `;
                    }, 1000);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-gray-500 flex items-center">
                  <span className="mr-2">{item.emoji}</span>
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Feedback et scoring amélioré */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-gray-700 text-lg">Votre Score</h4>
          <motion.span 
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold flex items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="mr-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🏆
            </motion.span>
            3/5
          </motion.span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Débutant</span>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔥 Expert
          </motion.span>
        </div>
      </motion.div>

      {/* Boutons d'action améliorés */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="flex-1 bg-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center"
          whileHover={{ y: -2, backgroundColor: "#7e22ce" }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="mr-2"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔁
          </motion.span>
          Recommencer
        </motion.button>
        
        <motion.button
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center"
          whileHover={{ y: -2, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💡
          </motion.span>
          Voir les Solutions
        </motion.button>
      </motion.div>

      {/* Conseils pédagogiques animés */}
      <motion.div
        className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-sm text-yellow-700 flex items-start">
          <motion.span
            className="mr-3 text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡
          </motion.span>
          <span>
            <span className="font-bold">Astuce :</span> Pour mémoriser, associez chaque mot à une image mentale. 
            <span className="font-semibold text-yellow-800"> "Ndá" (maison)</span> ressemble au son des pas sur le sol d'une case.
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
},


      // Carousel 6
       {
  title: (
    <motion.div 
      className="flex items-center justify-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🔢
      </motion.span>
      <span>Les Nombres en Fang</span>
    </motion.div>
  ),
  content: (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* En-tête animé */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl mb-8 border border-gray-200 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="text-2xl mr-3"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🧮
          </motion.span>
          <h3 className="text-xl font-bold text-gray-800">Maîtrisez les Nombres</h3>
        </motion.div>
        
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Apprenez à compter de 1 à 10 en Fang avec nos exercices interactifs
        </motion.p>
        
        <motion.div
          className="relative pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-green-600">Progression</span>
            <span className="text-xs font-semibold text-green-600">80%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Tableau des nombres animé */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
      >
        {[
          { num: 1, fang: "Étan", pron: "[é-tan]", emoji: "1️⃣" },
          { num: 2, fang: "Béli", pron: "[bé-li]", emoji: "2️⃣" },
          { num: 3, fang: "Élar", pron: "[é-lar]", emoji: "3️⃣" },
          { num: 4, fang: "Éni", pron: "[é-ni]", emoji: "4️⃣" },
          { num: 5, fang: "Étán", pron: "[é-tán]", emoji: "5️⃣" },
          { num: 6, fang: "Samán", pron: "[sa-mán]", emoji: "6️⃣" },
          { num: 7, fang: "Samán-mé-étan", pron: "[sa-mán mé é-tan]", emoji: "7️⃣" },
          { num: 8, fang: "Samán-mé-béli", pron: "[sa-mán mé bé-li]", emoji: "8️⃣" },
          { num: 9, fang: "Samán-mé-élar", pron: "[sa-mán mé é-lar]", emoji: "9️⃣" },
          { num: 10, fang: "Awo", pron: "[a-wo]", emoji: "🔟" }
        ].map((number, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-all text-center"
            onClick={() => alert(`Écoutez la prononciation : ${number.fang}`)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl font-bold text-gray-800 flex justify-center items-center">
              <span className="mr-2">{number.emoji}</span>
              {number.num}
            </div>
            <div className="text-green-600 font-medium mt-2 text-lg">{number.fang}</div>
            <div className="text-xs text-gray-500 mt-1">{number.pron}</div>
            <motion.div
              className="mt-3 text-blue-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🔊
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Jeu d'association amélioré */}
      <motion.div
        className="bg-purple-50 p-8 rounded-2xl border-2 border-dashed border-purple-300 mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-purple-800 flex items-center">
            <motion.span 
              className="mr-3"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎲
            </motion.span>
            Jeu d'Association
          </h3>
          <motion.span 
            className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            Niveau débutant
          </motion.span>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-2 gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Colonne Fang */}
          <div>
            <p className="font-medium text-gray-700 mb-3">Nombres Fang:</p>
            <div className="space-y-3">
              {["Élar", "Éni", "Awo"].map((num, i) => (
                <motion.div
                  key={i}
                  draggable
                  className="bg-white p-4 rounded-lg shadow cursor-grab active:cursor-grabbing hover:bg-purple-100 transition-all flex items-center justify-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileDrag={{ scale: 1.1, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.4)" }}
                  onDragStart={(e) => {
                    // Cast to any to avoid TS type mismatch with framer-motion's signature
                    (e as unknown as React.DragEvent<HTMLDivElement>).dataTransfer.setData("text/plain", num);
                  }}
                >
                  <span className="mr-2">👆</span> {num}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Colonne Traductions */}
          <div>
            <p className="font-medium text-gray-700 mb-3">Traductions:</p>
            <div className="space-y-3">
              {[
                { text: "10", answer: "Awo", emoji: "🔟" },
                { text: "3", answer: "Élar", emoji: "3️⃣" },
                { text: "4", answer: "Éni", emoji: "4️⃣" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="drop-zone h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition-all hover:bg-purple-50 relative"
                  onDrop={(e) => {
                    e.preventDefault();
                    const word = e.dataTransfer.getData("text/plain");
                    if (word === item.answer) {
                      e.currentTarget.innerHTML = `
                        <div class="bg-green-100 text-green-800 p-3 rounded-lg w-full h-full flex items-center justify-center font-bold">
                          <span class="mr-2">${item.emoji}</span>
                          ${item.text} = ${word} ✓
                        </div>
                      `;
                    } else {
                      e.currentTarget.innerHTML = `
                        <div class="bg-red-100 text-red-800 p-3 rounded-lg w-full h-full flex items-center justify-center font-bold">
                          ❌ Essaie encore !
                        </div>
                      `;
                      setTimeout(() => {
                        e.currentTarget.innerHTML = `
                          <div class="text-gray-500 flex items-center">
                            <span class="mr-2">${item.emoji}</span>
                            ${item.text}
                          </div>
                        `;
                      }, 1000);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <div className="text-gray-500 flex items-center">
                    <span className="mr-2">{item.emoji}</span>
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.p
          className="text-sm text-purple-600 italic text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Glissez les nombres Fang vers leurs équivalents numériques
        </motion.p>
      </motion.div>

      {/* Module de prononciation amélioré */}
      <motion.div
        className="bg-blue-50 p-8 rounded-2xl border border-blue-200 shadow-sm mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-bold text-blue-800 flex items-center">
            <motion.span 
              className="mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎤
            </motion.span>
            Entraînez-Vous
          </h3>
          <motion.span 
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full animate-pulse"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Exercice
          </motion.span>
        </motion.div>
        
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="font-medium mb-3 text-gray-700">Écoutez et répétez:</p>
          <div className="flex items-center space-x-4 mb-4">
            <motion.button
              className="bg-blue-600 text-white p-4 rounded-full hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              ▶️
            </motion.button>
            <div className="text-2xl font-bold">
              "<span className="text-blue-600">Étán</span>" <span className="text-gray-500 text-lg">(5)</span>
            </div>
          </div>
          
          <motion.div
            className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-700">Votre tentative:</span>
              <motion.span 
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Enregistrement
              </motion.span>
            </div>
            
            <motion.div
              className="flex items-center justify-center gap-1 mb-4 h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-blue-400 rounded-full"
                  animate={{ 
                    height: [`${Math.random()*20 + 10}px`, `${Math.random()*30 + 20}px`, `${Math.random()*15 + 5}px`],
                  }}
                  transition={{ 
                    duration: 0.8 + Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
            
            <motion.button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              whileHover={{ y: -2, backgroundColor: "#16a34a" }}
              whileTap={{ scale: 0.97 }}
            >
              Comparer les prononciations
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Conseils pédagogiques animés */}
      <motion.div
        className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <p className="text-sm text-yellow-700 flex items-start">
          <motion.span
            className="mr-3 text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡
          </motion.span>
          <span>
            <span className="font-bold">Astuce :</span> En Fang, les nombres de 6 à 9 se forment comme 
            <span className="font-semibold text-yellow-800"> "5+1" (Samán-mé-étan = 6)</span>, 
            <span className="font-semibold text-yellow-800"> "5+2" (Samán-mé-béli = 7)</span>, etc. 
            Une logique similaire au français "soixante-dix".
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
},


 ];
};


// Données pour chaque langue
languageData.fang.greeting = [
 { french: "Bonjour (formel)", translation: "Mbolo", emoji: "👔" },
 { french: "Bonjour (familier)", translation: "Mbolo bé", emoji: "😊" },
 { french: "Comment ça va ?", translation: "Wa'a ?", emoji: "❓" },
 { french: "Ça va bien", translation: "Me wa'a", emoji: "👍" },
 { french: "Merci", translation: "Oyié", emoji: "🙏" }
 
];


languageData.nzebi.greeting = [
 { french: "Bonjour", translation: "Mbolani", emoji: "👔" },
 { french: "Comment ça va ?", translation: "Wolo nani ?", emoji: "❓" },
 { french: "Ça va bien", translation: "Nani mbote", emoji: "👍" },
 { french: "Merci", translation: "Ndongui", emoji: "🙏" },
 { french: "Au revoir", translation: "Kende malamu", emoji: "👋" }
 
];


languageData.teke.greeting = [
 { french: "Bonjour", translation: "Mbote", emoji: "👔" },
 { french: "Comment ça va ?", translation: "Nzela nini ?", emoji: "❓" },
 { french: "Ça va bien", translation: "Nzela malamu", emoji: "👍" },
 { french: "Merci", translation: "Matondi", emoji: "🙏" },
 { french: "Bienvenue", translation: "Boyei malamu", emoji: "👐" }
];


export default function Page() {
 const [index, setIndex] = useState(0);
 const [currentLanguage, setCurrentLanguage] = useState<Language>('fang');


 const handleNext = () => setIndex((prev) => (prev + 1) % getCarouselData(currentLanguage).length);
 const handlePrev = () => setIndex((prev) => (prev - 1 + getCarouselData(currentLanguage).length) % getCarouselData(currentLanguage).length);

  
 
 return (
   <main className="bg-gray-50 min-h-screen font-sans">

       {/* HEADER */}
     <header className="px-6 py-4 flex justify-between items-center shadow-sm">
       <h1 className="text-4xl font-bold" style={{ color: languageData[currentLanguage].color }}>MBOLO</h1>
       <div className="hidden md:flex space-x-4 items-center">
         <select
           value={currentLanguage}
           onChange={(e) => {
             setCurrentLanguage(e.target.value as Language);
             setIndex(0);
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
           href="/login"
           className="bg-white border border-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition"
           style={{ color: languageData[currentLanguage].darkColor, borderColor: languageData[currentLanguage].darkColor }}
         >
           Connexion
         </Link>
         <Link
           href="/search"
           className="px-8 py-3 rounded-md hover:bg-opacity-80 transition"
           style={{
             backgroundColor: languageData[currentLanguage].color,
             color: "white"
           }}
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
           <h3 className="text-2xl font-semibold mb-4" style={{ color: languageData[currentLanguage].darkColor }}>
             {getCarouselData(currentLanguage)[index].title}
           </h3>
           {getCarouselData(currentLanguage)[index].content}
         </motion.div>
       </AnimatePresence>
       <div className="flex justify-center mt-8 gap-4">
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
}
