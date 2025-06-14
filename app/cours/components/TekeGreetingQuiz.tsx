"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};



const questions: Question[] = [
  {
    question: "Comment dit-on 'Bonjour' en Téké ?",
    options: ["Niawu", "Mbote", "Ndomba"],
    answer: "Niawu",
  },
  {
    question: "Comment dit-on 'Bonsoir' en Téké ?",
    options: ["Buna niawu", "Wana mbolo", "Ekele meso"],
    answer: "Buna niawu",
  },
  {
    question: "Comment saluer une femme âgée en Téké ?",
    options: ["Niawu mama", "Mbote mama", "Ndomba mama"],
    answer: "Niawu mama",
  },
];

export default function TekeGreetingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    if (isCorrect) setScore((prev) => prev + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-6">
      {showScore ? (
        <div className="text-center text-xl font-semibold">
          Votre score est {score} sur {questions.length}
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-4">
            {questions[currentQuestion].question}
          </h2>
<div className="space-y-2">
  {questions[currentQuestion].options.map((option: string) => (
    <button
      key={option}
      className="w-full py-2 px-4 bg-green-100 hover:bg-green-200 rounded-lg"
      onClick={() => handleAnswer(option)}
    >
      {option}
    </button>
  ))}
</div>
        </>
      )}
    </div>
  );
}
