'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Course } from '../_lib/page'; // Ensure this path is correct
import { useRouter } from 'next/navigation'; // To navigate to course module page
import Navbar from '@/app/components/navbar'; // Import the Navbar component (adjust path as necessary)

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Fetch user ID and auth token from localStorage
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        if (!userId || !token) {
          setError('User is not authenticated.');
          setLoading(false);
          return;
        }

        // Fetch courses for the user
        const response = await axios.get(`http://localhost:5001/users/${userId}/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId: string) => {
    // Navigate to the module page for the selected course
    router.push(`/mycourses/modules/${courseId}`);
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Include the Navbar component */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="p-4 bg-gray-100 rounded shadow">
                <h2
                  onClick={() => handleCourseClick(course._id)}
                  className="text-blue-500 cursor-pointer hover:underline text-xl font-semibold"
                >
                  {course.title}
                </h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
