"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function CreateModulePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId; // Match the dynamic segment in your folder name
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCreateModule = async () => {
    try {
      if (!courseId) throw new Error("Course ID is missing");
  
      console.log("Sending request with:", {
        moduleId: `module-${Date.now()}`,
        courseId,
        title,
        content,
        resources,
      });
  
      const response = await fetch(`http://localhost:5001/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId: `module-${Date.now()}`,
          courseId,
          title,
          content,
          resources,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Failed to create module");
      }
  
      // Redirect to the course's modules page
      router.push(`/courses/modules/${courseId}`);
    } catch (err) {
      if (err instanceof Error) {
        // Narrowing down the error type to Error
        console.error("Error creating module:", err.message);
        setError(err.message);
      } else {
        // Handle unexpected non-Error types
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create Module</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Resources (comma-separated URLs)</label>
          <input
            type="text"
            value={resources.join(",")}
            onChange={(e) => setResources(e.target.value.split(","))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleCreateModule}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Module
        </button>
      </div>
    </div>
  );
}
