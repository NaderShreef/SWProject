'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';

export default function CreateQuizPage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params?.id; // Get moduleId from URL
  const [questionType, setQuestionType] = useState<'MCQ' | 'True/False'>('MCQ');
  const [questions, setQuestions] = useState<
    { question: string; options?: string[]; answer: string; type: 'MCQ' | 'True/False' }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = () => {
    const newQuestion =
      questionType === 'MCQ'
        ? { question: '', options: ['', ''], answer: '', type: questionType } // Default options for MCQ
        : { question: '', answer: '', type: questionType }; // No options for True/False
    setQuestions([...questions, newQuestion]);
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5001/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          questionType,
          questionCount: questions.length,
          questions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      alert('Quiz created successfully!');
      router.push(`/courses/modules/${moduleId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 font-medium">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as 'MCQ' | 'True/False')}
            className="p-2 border rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>

        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mb-2">
              <input
                type="text"
                placeholder="Question text"
                value={q.question}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item, i) =>
                      i === index ? { ...item, question: e.target.value } : item
                    )
                  )
                }
                className="p-2 border rounded w-full"
              />
              {q.type === 'MCQ' && (
                <div className="mt-2">
                  {q.options?.map((option, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  options: item.options?.map((opt, oi) =>
                                    oi === optIndex ? e.target.value : opt
                                  ),
                                }
                              : item
                          )
                        )
                      }
                      className="p-2 border rounded w-full mb-1"
                    />
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item, i) =>
                      i === index ? { ...item, answer: e.target.value } : item
                    )
                  )
                }
                className="p-2 border rounded w-full"
              />
            </li>
          ))}
        </ul>

        <button
          onClick={handleCreateQuiz}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}
