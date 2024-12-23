'use client';

import React, { useState } from 'react';
import Navbar from '@/app/components/navbar';
import { note } from '@/app/_lib/page';
export default function NotesPage() {
  const [notes, setNotes] = useState<note[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes from the backend (Port 3000)
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes');  // Backend endpoint at port 3000
      if (!response.ok) {
        throw new Error(`Failed to fetch notes. Status: ${response.status}`);
      }

      // Check if response is in JSON format
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data: note[] = await response.json();
        setNotes(data);
      } else {
        const text = await response.text();  // Get the raw HTML/text response
        console.error('Received non-JSON response:', text);  // Log the raw response for debugging
        throw new Error(`Expected JSON, but got: ${contentType}`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">All Notes</h1>

        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-lg mb-4">
            Error: {error}
          </p>
        )}

        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.noteId}
                className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-xl font-bold mb-2">Note ID: {note.noteId}</h2>
                <p className="text-gray-400 mb-2">User ID: {note.userId}</p>
                <p className="text-gray-400 mb-2">Course ID: {note.courseId}</p>
                <p className="text-gray-400 mb-2">Content: {note.content}</p>
                <p className="text-gray-500 text-sm">
                  Created on: {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Last Updated: {new Date(note.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>Click "Get All Notes" to fetch notes.</p>
          )}
        </div>

        {/* Button to Get Notes */}
        <button
          onClick={fetchNotes}  // Fetch notes on click
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Get All Notes
        </button>
      </div>
    </div>
  );
}
