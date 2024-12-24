"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";

const QuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/quizzes`);
        if (!response.ok) throw new Error("Failed to load quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchQuizzes();
  }, []);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
        {quizzes.map((quiz: any) => (
          <div key={quiz._id} className="border p-4 rounded mb-4">
            <h2 className="text-2xl font-bold mb-2">{quiz.quizId}</h2>
            <p className="mb-2">Question Type: {quiz.questionType}</p>
            <p className="mb-2">Question Count: {quiz.questionCount}</p>
            <div>
              <h3 className="text-xl font-bold mb-2">Questions</h3>
              {quiz.questions.map((question: any, index: number) => (
                <div key={index} className="border p-2 rounded mb-2">
                  <p className="font-bold">
                    Q{index + 1}: {question.question}
                  </p>
                  {quiz.questionType === "MCQ" && question.options && (
                    <ul className="list-disc ml-6">
                      {question.options.map((option: string, i: number) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-green-600 mt-2">
                    Answer: {question.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;

