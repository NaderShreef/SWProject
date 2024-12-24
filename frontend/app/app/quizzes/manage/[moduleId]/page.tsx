'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';

const ManageQuestionBank: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const moduleId = params?.moduleId;

  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5001/question-bank/${moduleId}`);
        if (!response.ok) throw new Error('Failed to load question bank');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchQuestions();
  }, [moduleId]);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await fetch(`http://localhost:5001/question-bank/${moduleId}/${questionId}`, { method: 'DELETE' });
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    } catch (err: any) {
      alert('Failed to delete question');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Manage Question Bank</h1>
        {error && <p className="text-red-500">{error}</p>}
        {questions.map((q) => (
          <div key={q._id} className="border p-4 rounded mb-4">
            <p>{q.question}</p>
            <button
              onClick={() => handleDeleteQuestion(q._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuestionBank;
