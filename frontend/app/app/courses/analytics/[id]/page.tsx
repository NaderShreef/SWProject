'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface PerformanceMetrics {
  belowAverage: number;
  average: number;
  aboveAverage: number;
  excellent: number;
}

interface EngagementReport {
  enrolledStudents: number;
  completionRate: number;
  performanceMetrics: PerformanceMetrics;
}

interface AnalyticsData {
  courseId: string;
  engagementReport: EngagementReport;
}

const AnalyticsPage: React.FC = () => {
  const { id: courseId } = useParams(); // Extract the courseId from the URL
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:5001/progress/dashboard/instructor/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          setAnalyticsData(data);
        })
        .catch((error) => console.error('Error fetching analytics data:', error));
    }
  }, [courseId]);

  if (!analyticsData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Analytics for Course: {analyticsData.courseId}</h1>
      <p>Enrolled Students: {analyticsData.engagementReport.enrolledStudents}</p>
      <p>Completion Rate: {analyticsData.engagementReport.completionRate}</p>
      <h2>Performance Metrics</h2>
      <ul>
        <li>Below Average: {analyticsData.engagementReport.performanceMetrics.belowAverage}</li>
        <li>Average: {analyticsData.engagementReport.performanceMetrics.average}</li>
        <li>Above Average: {analyticsData.engagementReport.performanceMetrics.aboveAverage}</li>
        <li>Excellent: {analyticsData.engagementReport.performanceMetrics.excellent}</li>
      </ul>
    </div>
  );
};

export default AnalyticsPage;
