"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar"; // Import the Navbar

const CreateNotePage: React.FC = () => {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string>(""); // Field for noteId
  const [content, setContent] = useState<string>("");
  const [courseId, setCourseId] = useState<string>(""); // Field for courseId
  const [moduleId, setModuleId] = useState<string>(""); // Field for moduleId
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null); // Dynamically fetch user ID

  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID is not available. Please log in.");
    }
  }, []);

  const handleCreateNote = async () => {
    try {
      if (!noteId) throw new Error("Note ID is required.");
      if (!courseId) throw new Error("Course ID is required.");
      if (!moduleId) throw new Error("Module ID is required.");
      if (!content) throw new Error("Note content cannot be empty.");
      if (!userId) throw new Error("User ID is not available.");

      setLoading(true);
      const response = await fetch(`http://localhost:5001/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId, // Use the user-provided noteId
          userId, // Dynamically fetched userId
          courseId,
          moduleId,
          content,
          quickNote: false, // Default to false unless specifically set as a quick note
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create the note.");
      }

      // Redirect to the notes page upon successful creation
      router.push("/notes");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create Note</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note ID
          </label>
          <input
            type="text"
            value={noteId}
            onChange={(e) => setNoteId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter the Note ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course ID
          </label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter the Course ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module ID
          </label>
          <input
            type="text"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter the Module ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={5}
            placeholder="Write your note here..."
          />
        </div>

        <button
          onClick={handleCreateNote}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </div>
    </div>
  );
};

export default CreateNotePage;
