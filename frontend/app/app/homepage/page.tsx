"use client";

import React from "react";
import StudentCoursePanel from "../components/StudentCoursePanel";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import AdminPanel from "../components/AdminPanel";
import CoursePanel from "../components/CoursePanel";

export default function HomePage() {
  const router = useRouter();

  const handleNavigateToCourses = () => {
    router.push("/courses");
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Our E-Learning Platform</h1>
        <h2 style={styles.description}>
          Explore a wide range of courses and enhance your skills.
        </h2>

        <button style={styles.button} onClick={handleNavigateToCourses}>
          Courses
        </button>
        <AdminPanel />
        <CoursePanel />
        <StudentCoursePanel />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  content: {
    marginTop: "100px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
