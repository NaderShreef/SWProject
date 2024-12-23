'use client';

import ResponseForm from "../components/responsesForm";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function AddResponsesPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    // Check if the role is either 'student' or 'admin'
    setIsAuthorized(userRole === "student" || userRole === "admin");
  }, []);

  if (!isAuthorized) {
    return <div className="text-center text-red-500">You are not authorized to access this page.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Response</h2>
      <ResponseForm edit={false} />
    </div>
  );
}
