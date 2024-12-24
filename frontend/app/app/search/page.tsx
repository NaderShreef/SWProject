'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      setError(null); // Reset any previous errors
      const response = await fetch(`http://localhost:5001/courses/searchcourse?title=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch course information.');
      }

      const course = await response.json();
      if (course && course._id) {
        // Redirect to the module page for this course
        router.push(`/courses/modules/${course._id}`);
      } else {
        setError('Course not found.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Search for a Course</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter course title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchPage;
