'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/navbar'; // Adjust the import path

export function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState<any | null>(null); // Initialize as null
  const [error, setError] = useState<string | null>(null);
  const courseId = 'course-id'; // Replace with dynamic course ID if needed

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/progress/dashboard/instructor/${courseId}`);
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Failed to load analytics data');
      }
    };

    fetchAnalyticsData();
  }, [courseId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Instructor Analytics</h1>
        {analyticsData ? (
          <div>
            <p>
              <strong>Enrolled Students:</strong> {analyticsData?.engagementReport?.enrolledStudents || 0}
            </p>
            <p>
              <strong>Completion Rate:</strong> {analyticsData?.engagementReport?.completionRate || 0}%
            </p>
            <div>
              <strong>Performance Metrics:</strong>
              <ul>
                <li>
                  <strong>Below Average:</strong>{' '}
                  {analyticsData?.engagementReport?.performanceMetrics?.belowAverage || 0}
                </li>
                <li>
                  <strong>Average:</strong> {analyticsData?.engagementReport?.performanceMetrics?.average || 0}
                </li>
                <li>
                  <strong>Above Average:</strong>{' '}
                  {analyticsData?.engagementReport?.performanceMetrics?.aboveAverage || 0}
                </li>
                <li>
                  <strong>Excellent:</strong> {analyticsData?.engagementReport?.performanceMetrics?.excellent || 0}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
export default Dashboard;