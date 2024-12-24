'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import { useRouter, useParams } from 'next/navigation';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const [id, setId] = useState<string>(''); // Ensure default value is a string
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Unwrap params to get the course ID
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      if (typeof resolvedParams?.id === 'string') {
        setId(resolvedParams.id); // Only set `id` if it's a string
      } else {
        console.error('Invalid ID parameter');
      }
    };
    unwrapParams();
  }, [params]);

  // Fetch course data from the backend
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:5001/courses/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((data) => {
          if (!data) {
            setError('No course found');
          } else {
            setCourse(data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching course data:', err);
          setError('Failed to fetch course data');
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const updatedCourseData = {
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      category: course.category,
      difficultyLevel: course.difficultyLevel,
      createdBy: course.createdBy, // Now editable
      updatedAt: new Date(),
    };

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourseData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update course: ${response.statusText}`);
      }

      const data = await response.json();
      router.push('/courses'); // Redirect to courses page
    } catch (err) {
      setError(`Failed to update course: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>No course found with ID: {id}</p>;
  }

  return (
    <div>
      <Navbar />
      <h1>Edit Course: {course.title}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Course ID:
          <input type="text" value={course.courseId} disabled />
        </label>
        <br />

        <label>
          Title:
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </label>
        <br />

        <label>
          Category:
          <input
            type="text"
            value={course.category}
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
          />
        </label>
        <br />

        <label>
          Difficulty Level:
          <select
            value={course.difficultyLevel}
            onChange={(e) => setCourse({ ...course, difficultyLevel: e.target.value })}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <br />

        <label>
          Created By:
          <input
            type="text"
            value={course.createdBy}
            onChange={(e) => setCourse({ ...course, createdBy: e.target.value })}
          />
        </label>
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
