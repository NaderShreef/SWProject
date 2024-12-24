"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function EditModulePage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const moduleId = params?.moduleId; // Use the MongoDB _id field

  useEffect(() => {
    const fetchModule = async () => {
      try {
        if (!moduleId) throw new Error("Module ID is missing");
        const response = await fetch(`http://localhost:5001/modules/${moduleId}`);
        if (!response.ok) throw new Error("Failed to fetch module");
        const data = await response.json();

        setTitle(data.title);
        setContent(data.content);
        setResources(data.resources || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
      }
    };

    fetchModule();
  }, [moduleId]);

  const handleEditModule = async () => {
    try {
      if (!moduleId) throw new Error("Module ID is missing");
      const response = await fetch(`http://localhost:5001/modules/${moduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          resources,
        }),
      });

      if (!response.ok) throw new Error("Failed to update module");

      // Redirect to the course's modules page
      router.push(`/courses/modules/${params.courseId}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Module</h1>

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
          <label className="block text-sm font-medium text-gray-700">
            Resources (comma-separated URLs)
          </label>
          <input
            type="text"
            value={resources.join(",")}
            onChange={(e) => setResources(e.target.value.split(","))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleEditModule}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
