'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function CourseModulesPage() {
  const router = useRouter();
  const params = useParams();
  const [modules, setModules] = useState<any[]>([]); // Initialize modules as an empty array
  const [error, setError] = useState<string | null>(null);

  // Unwrap params to get courseId
  const courseId = params?.id;

  // Fetch modules by course ID
  const fetchModules = async () => {
    try {
      if (!courseId) {
        throw new Error("Course ID is missing");
      }

      console.log("Fetching modules for courseId:", courseId); // Log to verify courseId

      const response = await fetch(`http://localhost:5001/modules/course/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }

      const data = await response.json();
      console.log("Fetched modules:", data); // Log the entire response to check the structure

      // If data is an array directly, set it
      if (Array.isArray(data)) {
        setModules(data); // Directly set modules if data is an array
      } else {
        setModules([]); // If no valid modules, set an empty array
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      console.error(errorMessage); // Log the error to the console
      setError(errorMessage);
      setModules([]); // Ensure modules is always an array
    }
  };

  // Fetch modules when courseId is available
  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const handleCreateModule = () => {
    router.push(`/courses/modules/create/${courseId}`);
  };

  const handleEditModule = (moduleId: string) => {
    router.push(`/courses/modules/edit/${moduleId}`);
  };

  const handleCreateQuiz = (moduleId: string) => {
    router.push(`/courses/modules/quiz/creates/${moduleId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Modules for Course ID: {courseId}</h1>

        <button
          onClick={handleCreateModule}
          style={{
            fontSize: "14px",
            padding: "8px 16px",
            backgroundColor: "#10B981",
            color: "#FFF",
            borderRadius: "6px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            marginBottom: "16px",
          }}
          className="hover:bg-green-700"
        >
          Create Module
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div
                key={module.moduleId}
                className="p-6 bg-gray-100 text-black rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-semibold text-blue-600">{module.title}</h2>
                <p className="text-gray-600">{module.content}</p>
                <ul className="mt-4 text-sm text-gray-700">
                  {module.resources?.map((resource: string, index: number) => (
                    <li key={index} className="ml-4 list-disc">
                      <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={() => handleEditModule(module.moduleId)}
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
                    Edit Module
                  </button>
                  <button
                    onClick={() => handleCreateQuiz(module.moduleId)}
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      backgroundColor: "#D97706",
                      color: "#FFF",
                      borderRadius: "6px",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }}
                    className="hover:bg-yellow-600"
                  >
                    Create Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No modules available for this course.</p>
        )}
      </div>
    </div>
  );
}
