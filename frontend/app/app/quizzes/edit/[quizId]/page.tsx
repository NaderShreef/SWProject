'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';

const EditQuizPage: React.FC = () => {
  const router = useRouter();
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

  const handleUpdateQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:5001/quizzes/${quizId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      if (!response.ok) throw new Error('Failed to update quiz');
      router.push(`/quizzes/${quizId}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

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
        <h1 className="text-3xl font-bold mb-4">Edit Quiz: {quiz.quizId}</h1>
        <div className="mb-4">
          <label className="block mb-2">Question Type</label>
          <select
            value={quiz.questionType}
            onChange={(e) => setQuiz({ ...quiz, questionType: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Question Count</label>
          <input
            type="number"
            value={quiz.questionCount}
            onChange={(e) => setQuiz({ ...quiz, questionCount: Number(e.target.value) })}
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Questions</h2>
          {quiz.questions.map((question: any, index: number) => (
            <div key={index} className="border p-4 rounded mb-4">
              <input
                type="text"
                value={question.question}
                onChange={(e) => {
                  const updatedQuestions = [...quiz.questions];
                  updatedQuestions[index].question = e.target.value;
                  setQuiz({ ...quiz, questions: updatedQuestions });
                }}
                placeholder={`Question ${index + 1}`}
                className="block w-full mb-2"
              />
              {quiz.questionType === 'MCQ' && (
                <div>
                  <label>Options</label>
                  {question.options.map((option: string, i: number) => (
                    <input
                      key={i}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedQuestions = [...quiz.questions];
                        updatedQuestions[index].options[i] = e.target.value;
                        setQuiz({ ...quiz, questions: updatedQuestions });
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="block w-full mb-2"
                    />
                  ))}
                </div>
              )}
              <input
                type="text"
                value={question.answer}
                onChange={(e) => {
                  const updatedQuestions = [...quiz.questions];
                  updatedQuestions[index].answer = e.target.value;
                  setQuiz({ ...quiz, questions: updatedQuestions });
                }}
                placeholder="Answer"
                className="block w-full mb-2"
              />
            </div>
          ))}
        </div>
        <button onClick={handleUpdateQuiz} className="bg-green-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditQuizPage;
