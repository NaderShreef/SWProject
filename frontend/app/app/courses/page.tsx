'use client';

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { Course } from "../_lib/page";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('6750a8cbfd156ffd7d47486b'); // Example user ID, you can replace this dynamically

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data: Course[] = await response.json();
      setCourses(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Navigation Handlers
  const handleCreateCourse = () => router.push("/courses/createCourse");
  const handleUpdateCourse = (id: string) => {
    router.push(`/courses/update/${id}`);
  };

  const handleViewCourseVersions = (id: string) => {
    router.push(`/courses/versions/${id}`);
  };

  const handleViewModulesByCourse = (id: string) => {
    router.push(`/courses/modules/${id}`);
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`http://localhost:5001/courses/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete course");
        fetchCourses(); // Refresh courses
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete course.");
      }
    }
  };

  const handleEnrollInCourse = async (courseId: string) => {
    try {
      const response = await fetch(`http://localhost:5001/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }

      const data = await response.json();
      alert(data); // Show success message (e.g., "User successfully enrolled")
    } catch (err) {
      console.error("Enroll failed:", err);
      alert("Failed to enroll in course.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">All Courses</h1>
        <button
          onClick={handleCreateCourse}
          style={{
            fontSize: "14px",
            padding: "8px 16px",
            backgroundColor: "#10B981",
            color: "#FFF",
            borderRadius: "6px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
          className="hover:bg-green-700"
        >
          Create Course
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-6 bg-gray-100 text-black rounded-lg shadow-lg"
            >
              <h2
                onClick={() => handleViewModulesByCourse(course._id)}
                className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
              >
                {course.title}
              </h2>
              <p className="text-gray-600">{course.description}</p>

              <div className="mt-4 space-x-4">
                <button
                  onClick={() => handleUpdateCourse(course._id)}
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    backgroundColor: "#2563EB",
                    color: "#FFF",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  className="hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    backgroundColor: "#EF4444",
                    color: "#FFF",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  className="hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewCourseVersions(course._id)}
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    backgroundColor: "#1D4ED8", // Navy blue button
                    color: "#FFF",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  className="hover:bg-blue-600"
                >
                  View Versions
                </button>
                <button
                  onClick={() => handleEnrollInCourse(course._id)}
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    backgroundColor: "#10B981", // Green button for Enroll
                    color: "#FFF",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  className="hover:bg-green-700"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

