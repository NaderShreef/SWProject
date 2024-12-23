'use client';

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { responses } from '../_lib/page';

export default function ResponsesPage() {
  const [responses, setResponses] = useState<responses[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newResponse, setNewResponse] = useState({
    response_id: '',
    userId: '',
    quizId: '',
    answers: [{ question_id: '', answer: '' }],
    score: 0,
    submitted_at: '',
  });

  // Fetch all responses from the backend (Port 3000)
  const fetchResponses = async () => {
    try {
      const response = await fetch('http://localhost:3000/responses'); // Backend endpoint at port 3000
      if (!response.ok) {
        throw new Error(`Failed to fetch responses. Status: ${response.status}`);
      }

      // Check if response is in JSON format
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data: responses[] = await response.json();
        setResponses(data);
      } else {
        const text = await response.text(); // Get the raw HTML/text response
        console.error('Received non-JSON response:', text); // Log the raw response for debugging
        throw new Error(`Expected JSON, but got: ${contentType}`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewResponse({ ...newResponse, [field]: e.target.value });
  };

  const handleAnswerChange = (index: number, field: 'question_id' | 'answer', value: string) => {
    const updatedAnswers = [...newResponse.answers];
    updatedAnswers[index][field] = value;
    setNewResponse({ ...newResponse, answers: updatedAnswers });
  };

  const handleAddAnswer = () => {
    setNewResponse({
      ...newResponse,
      answers: [...newResponse.answers, { question_id: '', answer: '' }],
    });
  };

  const handleSubmitNewResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newResponse),
      });

      if (response.ok) {
        // Clear form and refresh the response list after success
        setNewResponse({
          response_id: '',
          userId: '',
          quizId: '',
          answers: [{ question_id: '', answer: '' }],
          score: 0,
          submitted_at: '',
        });
        fetchResponses();
        alert('Response added successfully!');
      } else {
        throw new Error('Failed to add response');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong while submitting the response');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">All Responses</h1>

        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-lg mb-4">
            Error: {error}
          </p>
        )}

        {/* Responses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {responses.length > 0 ? (
            responses.map((response) => (
              <div
                key={response.response_id}
                className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-xl font-bold mb-2">Response ID: {response.response_id}</h2>
                <p className="text-gray-400 mb-2">User ID: {response.userId}</p>
                <p className="text-gray-400 mb-2">Quiz ID: {response.quizId}</p>
                <p className="text-gray-400 mb-2">Score: {response.score}</p>
                <p className="text-gray-500 text-sm mb-2">
                  Submitted on: {new Date(response.submitted_at).toLocaleDateString()}
                </p>
                <div className="text-left text-gray-400">
                  <h3 className="font-bold mb-2">Answers:</h3>
                  <ul>
                    {response.answers.map((answer, index) => (
                      <li key={index} className="mb-1">
                        <span className="font-semibold">Question ID:</span> {answer.question_id} - <span className="font-semibold">Answer:</span> {answer.answer}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>Click "Get All Responses" to fetch responses.</p>
          )}
        </div>

        {/* Button to Get Responses */}
        <button
          onClick={fetchResponses} // Fetch responses on click
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Get All Responses
        </button>

        {/* Form to Add New Response */}
        <div className="mt-12 w-full max-w-xl bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Add New Response</h2>

          <form onSubmit={handleSubmitNewResponse}>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Response ID</label>
              <input
                type="text"
                value={newResponse.response_id}
                onChange={(e) => handleInputChange(e, 'response_id')}
                placeholder="Enter response ID"
                required
                className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">User ID</label>
              <input
                type="text"
                value={newResponse.userId}
                onChange={(e) => handleInputChange(e, 'userId')}
                placeholder="Enter user ID"
                required
                className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Quiz ID</label>
              <input
                type="text"
                value={newResponse.quizId}
                onChange={(e) => handleInputChange(e, 'quizId')}
                placeholder="Enter quiz ID"
                required
                className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Answers</label>
              {newResponse.answers.map((answer, index) => (
                <div key={index} className="mb-2 flex gap-4">
                  <input
                    type="text"
                    value={answer.question_id}
                    onChange={(e) => handleAnswerChange(index, 'question_id', e.target.value)}
                    placeholder="Question ID"
                    required
                    className="w-1/2 p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
                  />
                  <input
                    type="text"
                    value={answer.answer}
                    onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                    placeholder="Answer"
                    required
                    className="w-1/2 p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAnswer}
                className="w-full py-2 bg-blue-500 text-white rounded-md mt-2"
              >
                Add Answer
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Score</label>
              <input
                type="number"
                value={newResponse.score}
                onChange={(e) => handleInputChange(e, 'score')}
                placeholder="Enter score"
                required
                className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Submitted At</label>
              <input
                type="datetime-local"
                value={newResponse.submitted_at}
                onChange={(e) => handleInputChange(e, 'submitted_at')}
                required
                className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md mt-4"
            >
              Submit Response
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
