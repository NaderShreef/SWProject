"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  createdBy: string;
}

const CoursePanel = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAuthorized(userRole === "instructor" || userRole === "admin");
  }, []);

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  if (!isAuthorized) {
    return null;
  }

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3000/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          searchTerm: searchTerm,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSaveCourse = async () => {
    if (!selectedCourse) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/courses/${selectedCourse._id}`,
        {
          title: selectedCourse.title,
          createdBy: selectedCourse.createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh course list
      fetchCourses();
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/courses/${course._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh course list
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <h2>Course Panel</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchCourses}>Fetch Courses</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={`${course._id}-${course.title}`}>
              <td>{course.title}</td>
              <td>{course.createdBy}</td>
              <td>
                <button onClick={() => handleEditCourse(course)}>Edit</button>
                <button onClick={() => handleDeleteCourse(course)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourse && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Edit Course</h2>
            <label>Title:</label>
            <input
              type="text"
              value={selectedCourse?.title}
              onChange={(e) =>
                setSelectedCourse({ ...selectedCourse, title: e.target.value })
              }
            />
            <label>Created By:</label>
            <input
              type="text"
              value={selectedCourse?.createdBy}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  createdBy: e.target.value,
                })
              }
            />
            <button onClick={handleSaveCourse}>Save</button>
            <button onClick={() => setSelectedCourse(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  },
};

export default CoursePanel;
