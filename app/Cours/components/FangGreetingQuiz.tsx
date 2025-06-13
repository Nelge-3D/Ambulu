"use client"; // si tu es en environnement Next.js app/

import { useState } from "react";

export default function FangGreetingQuiz() {
  const questions = [
    {
      question: "Comment dit-on 'Bonjour' en fang (formel) ?",
      options: ["Mbolo", "Wa’a", "Oyié"],
      answer: "Mbolo",
    },
    {
      question: "Comment dit-on 'Comment ça va ?'",
      options: ["Me wa’a", "Wa’a ?", "Mbolo bé"],
      answer: "Wa’a ?",
    },
    {
      question: "Quelle est la réponse à 'Wa’a ?'",
      options: ["Oyié", "Me wa’a", "Mbolo"],
      answer: "Me wa’a",
    },

  ];

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (opt: string) => {
    if (opt === questions[step].answer) {
      setScore(score + 1);
    }
    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="p-4 mt-6 max-w-xl mx-auto bg-white shadow rounded-2xl space-y-4">
      {finished ? (
        <div className="text-center text-green-700 text-xl font-semibold">
          🎉 Bravo ! Tu as obtenu {score} / {questions.length}
        </div>
      ) : (
        <>
          <p className="font-semibold text-gray-800">{questions[step].question}</p>
          <div className="space-y-2">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="block w-full text-left bg-gray-100 hover:bg-gray-200 rounded px-4 py-2"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
