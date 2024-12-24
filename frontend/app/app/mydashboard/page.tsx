"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import axios from "axios";

interface CourseProgress {
  courseTitle: string;
  courseDescription: string;
  completionPercentage: number;
}

const MyDashboard: React.FC = () => {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null); // Dynamically fetched user ID

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID is not available. Please log in.");
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/progress/student/dashboard/${storedUserId}`
        );
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <p className="text-gray-600 text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  {course.courseTitle}
                </h2>
                <p className="text-gray-600 mb-4">
                  {course.courseDescription}
                </p>
                <p>
                  <strong>Completion Percentage:</strong>{" "}
                  {course.completionPercentage}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            You are not enrolled in any courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyDashboard;
