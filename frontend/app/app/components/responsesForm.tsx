'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface Answer {
  question_id: string;
  answer: string;
}

interface ResponseFormProps {
  edit: boolean;
  responseInfo?: any; // Placeholder for edit functionality (you can extend this later)
}

const ResponseForm: React.FC<ResponseFormProps> = ({ edit, responseInfo }) => {
  const [responseId, setResponseId] = useState(edit ? responseInfo.response_id : '');
  const [userId, setUserId] = useState(edit ? responseInfo.userId : '');
  const [quizId, setQuizId] = useState(edit ? responseInfo.quizId : '');
  const [answers, setAnswers] = useState<Answer[]>(edit ? responseInfo.answers : [{ question_id: '', answer: '' }]);
  const [score, setScore] = useState(edit ? responseInfo.score : 0);
  const [submittedAt, setSubmittedAt] = useState(edit ? responseInfo.submitted_at : '');

  const handleAddAnswer = () => {
    setAnswers([...answers, { question_id: '', answer: '' }]);
  };

  const handleAnswerChange = (index: number, field: 'question_id' | 'answer', value: string) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const data = {
        response_id: responseId,
        userId: userId,
        quizId: quizId,
        answers: answers,
        score: score,
        submitted_at: submittedAt,
      };

      const response = await axios.post('http://localhost:3000/responses', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Response added successfully');
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">Response ID</label>
        <input
          type="text"
          value={responseId}
          onChange={(e) => setResponseId(e.target.value)}
          placeholder="Enter response ID"
          required
          className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID"
          required
          className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">Quiz ID</label>
        <input
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Enter quiz ID"
          required
          className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">Answers</label>
        {answers.map((answer, index) => (
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
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 mt-2"
        >
          Add Answer
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          placeholder="Enter score"
          required
          className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg text-white mb-2">Submitted At</label>
        <input
          type="datetime-local"
          value={submittedAt}
          onChange={(e) => setSubmittedAt(e.target.value)}
          required
          className="w-full p-2 bg-[#333333] text-white border border-gray-400 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-md mt-4 hover:bg-green-500"
      >
        Submit Response
      </button>
    </form>
  );
};

export default ResponseForm;
