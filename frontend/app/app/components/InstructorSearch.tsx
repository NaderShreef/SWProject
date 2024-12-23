"use client";
import React, { useState } from "react";

const InstructorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3000/users/search?name=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(
        data
          .filter((user: any) => user.role === "instructor")
          .map((user: any) => `${user.email}`)
      );
    } catch (error: any) {
      console.error("Error fetching instructors:", error);
      setSearchResults([`Error: ${error.message}`]);
    }
  };

  return (
    <div>
      <h2>Search Instructors</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorSearch;
