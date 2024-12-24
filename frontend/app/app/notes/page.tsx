"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar"; // Adjust import path
import axios from "axios";
import { Note } from "../_lib/page";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null); // Dynamically fetch user ID

  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID is not available. Please log in.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/notes/user/${userId}`);
        if (response.data.length > 0) {
          setNotes(response.data);
        } else {
          setNotes([]); // No notes for this user
        }
      } catch (err) {
        setError("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [userId]);

  const handleDeleteNote = async (noteId: string) => {
    try {
      await axios.delete(`http://localhost:5001/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
    } catch {
      alert("Failed to delete the note.");
    }
  };

  const handleEditNote = (noteId: string) => {
    window.location.href = `/editnote/${noteId}`; // Adjust the edit note route as needed
  };

  const handleCreateNote = () => {
    window.location.href = "/notes/create"; // Adjust the create note route as needed
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <p className="text-gray-600 text-xl">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Notes</h1>
          <p className="text-red-500">{error}</p>
          <div className="text-center mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateNote}
            >
              Create Note
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Notes</h1>
        <div className="text-center mb-6">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateNote}
          >
            Create Note
          </button>
        </div>
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.noteId} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Note ID: {note.noteId}</h2>
                {note.course && (
                  <p className="text-blue-600 mb-1">
                    <strong>Course:</strong> {note.course.title}
                  </p>
                )}
                {note.module && (
                  <p className="text-blue-600 mb-1">
                    <strong>Module:</strong> {note.module.title}
                  </p>
                )}
                <p className="text-gray-800 mb-4">{note.content}</p>
                <p className="text-gray-600 text-sm">
                  <strong>Last Updated:</strong> {new Date(note.lastUpdated).toLocaleDateString()}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditNote(note.noteId)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteNote(note.noteId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No notes available for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
