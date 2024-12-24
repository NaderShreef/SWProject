'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCoursePage() {
  const router = useRouter();
  const [courseData, setCourseData] = useState({
    courseId: '',
    title: '',
    description: '',
    category: '',
    difficultyLevel: 'Beginner', // Default value
    createdBy: '',
    createdAt: new Date(),
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5001/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      setSuccessMessage('Course created successfully!');
      setError(null);
      setCourseData({
        courseId: '',
        title: '',
        description: '',
        category: '',
        difficultyLevel: 'Beginner',
        createdBy: '',
        createdAt: new Date(),
      });

      // Redirect to courses page or any other page after successful creation
      setTimeout(() => {
        router.push('/courses');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-lg mb-4">{error}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-lg mb-4">{successMessage}</p>
        )}

        {/* Course Creation Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Course ID</label>
            <input
              type="text"
              name="courseId"
              value={courseData.courseId}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Difficulty Level</label>
            <select
              name="difficultyLevel"
              value={courseData.difficultyLevel}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Instructor (Created By)</label>
            <input
              type="text"
              name="createdBy"
              value={courseData.createdBy}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
