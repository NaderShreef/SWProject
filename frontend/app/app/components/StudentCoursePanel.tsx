"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  createdBy: string;
}

const StudentCoursePanel = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/users/me/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch enrolled courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (courses.length === 0) {
    return <p>You are not enrolled in any courses yet.</p>;
  }

  return (
    <div>
      <h2>Your Enrolled Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentCoursePanel;
