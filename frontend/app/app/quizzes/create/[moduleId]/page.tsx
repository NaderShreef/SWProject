'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';

const CreateQuizPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const moduleId = params?.moduleId;

  const [questionType, setQuestionType] = useState<'MCQ' | 'True/False'>('MCQ');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [], answer: '', type: questionType }]);
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:5001/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, questionType, questionCount, questions }),
      });

      if (!response.ok) throw new Error('Failed to create quiz');
      router.push(`/quizzes/${moduleId}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Create Quiz</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <label className="block mb-2">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as 'MCQ' | 'True/False')}
            className="border p-2 rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Number of Questions</label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-6">
          <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Question
          </button>
        </div>
        <div className="mt-6">
          {questions.map((q, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <input
                type="text"
                placeholder="Question Text"
                value={q.question}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].question = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="block w-full mb-2"
              />
              {questionType === 'MCQ' && (
                <div>
                  <label>Options</label>
                  {[...Array(4)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={q.options[i] || ''}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].options[i] = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      className="block w-full mb-2"
                    />
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].answer = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="block w-full mb-2"
              />
            </div>
          ))}
        </div>
        <button onClick={handleCreateQuiz} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuizPage;
