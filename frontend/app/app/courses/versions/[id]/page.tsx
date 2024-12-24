"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const CourseVersionsPage = () => {
  const params = useParams(); // Access dynamic route params
  const id = params?.id; // Get the course ID from the params
  const [versions, setVersions] = useState<any[] | null>(null); // Start as null to distinguish between uninitialized and empty states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch course versions when the ID is available
  useEffect(() => {
    if (id) {
      const fetchVersions = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/courses/${id}/versions`);
          setVersions(response.data.versions || []); // Default to empty array if no versions are returned
        } catch (error) {
          console.error("Error fetching course versions:", error);
          setError("Error fetching course versions. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchVersions();
    }
  }, [id]);

  return (
    <div>
      <h1>Course Versions</h1>
      {loading ? (
        <p>Loading course versions...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          {versions && versions.length > 0 ? (
            <ul>
              {versions.map((version, index) => (
                <li key={index}>
                  <strong>{version.versionNumber}</strong>: {version.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No versions found for this course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseVersionsPage;
