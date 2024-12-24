'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function CourseModulesPage() {
  const params = useParams();
  const router = useRouter();
  const [modules, setModules] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const courseId = params?.id;

  // Fetch modules by course ID
  const fetchModules = async () => {
    try {
      if (!courseId) {
        throw new Error("Course ID is missing");
      }

      const response = await fetch(`http://localhost:5001/modules/course/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setModules(data);
      } else {
        setModules([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      setModules([]);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  // Navigate to the CreateNotePage
  const handleCreateNote = (moduleId: string) => {
    router.push(`/notes/create`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Modules for Course ID: {courseId}</h1>

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
                      <a
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCreateNote(module.moduleId)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Create Note for this Module
                </button>
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
