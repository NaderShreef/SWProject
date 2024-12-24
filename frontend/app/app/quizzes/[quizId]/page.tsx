'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';

const QuizPage: React.FC = () => {
  const params = useParams();
  const quizId = params?.quizId;
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5001/quizzes/${quizId}`);
        if (!response.ok) throw new Error('Failed to load quiz');
        const data = await response.json();
        setQuiz(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchQuiz();
  }, [quizId]);

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

  if (!quiz) {
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
        <h1 className="text-3xl font-bold mb-4">{quiz.quizId}</h1>
        <p className="mb-4">Question Type: {quiz.questionType}</p>
        <p className="mb-4">Question Count: {quiz.questionCount}</p>
        <div>
          <h2 className="text-2xl font-bold mb-4">Questions</h2>
          {quiz.questions.map((question: any, index: number) => (
            <div key={index} className="border p-4 rounded mb-4">
              <p className="font-bold">Q{index + 1}: {question.question}</p>
              {quiz.questionType === 'MCQ' && question.options && (
                <ul className="list-disc ml-6">
                  {question.options.map((option: string, i: number) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              )}
              <p className="text-green-600 mt-2">Answer: {question.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
