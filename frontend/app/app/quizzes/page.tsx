'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';

const QuizzesPage: React.FC = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:5001/quizzes');
        if (!response.ok) throw new Error('Failed to fetch quizzes');
        const data = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await fetch(`http://localhost:5001/quizzes/${quizId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete quiz');
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.quizId !== quizId));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleCreateQuiz = () => {
    router.push(`/quizzes/create`);
  };

  const handleViewQuiz = (quizId: string) => {
    router.push(`/quizzes/${quizId}`);
  };

  const handleEditQuiz = (quizId: string) => {
    router.push(`/quizzes/edit/${quizId}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold">Loading Quizzes...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">All Quizzes</h1>
        <button
          onClick={handleCreateQuiz}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Create Quiz
        </button>
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div key={quiz.quizId} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Quiz ID: {quiz.quizId}</h2>
                <p className="text-gray-700 mb-1">Question Type: {quiz.questionType}</p>
                <p className="text-gray-700 mb-1">Number of Questions: {quiz.questionCount}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleViewQuiz(quiz.quizId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditQuiz(quiz.quizId)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.quizId)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quizzes available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
