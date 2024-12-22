'use client';

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { course } from '../_lib/page';

export default function CoursesPage() {
  const [courses, setCourses] = useState<course[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all courses from the backend (Port 3000)
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/courses');  // Backend endpoint at port 3000
      if (!response.ok) {
        throw new Error(`Failed to fetch courses. Status: ${response.status}`);
      }

      // Check if response is in JSON format
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data: course[] = await response.json();
        setCourses(data);
      } else {
        const text = await response.text();  // Get the raw HTML/text response
        console.error('Received non-JSON response:', text);  // Log the raw response for debugging
        throw new Error(`Expected JSON, but got: ${contentType}`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">All Courses</h1>

        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-lg mb-4">
            Error: {error}
          </p>
        )}

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.courseId}
                className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-400 mb-2">{course.description}</p>
                <p className="text-gray-400 mb-1">Category: {course.category}</p>
                <p className="text-gray-400 mb-1">
                  Difficulty: {course.difficultyLevel}
                </p>
                <p className="text-gray-400 mb-1">Created by: {course.createdBy}</p>
                <p className="text-gray-500 text-sm">
                  Created on: {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>Click "Get All Courses" to fetch courses.</p>
          )}
        </div>

        {/* Button to Get Courses */}
        <button
          onClick={fetchCourses}  // Fetch courses on click
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Get All Courses
        </button>
      </div>
    </div>
  );
}
