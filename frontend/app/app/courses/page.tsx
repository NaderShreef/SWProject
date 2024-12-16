"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { course } from "@/app/_lib/page";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const router = useRouter()
  async function handleDelete(id:object) {
    try {
     await axiosInstance.delete(`/courses/${id}`);

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [courses]);



  return (
    <div className="flex flex-col items-center min-h-screen bg-[#121212] p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Courses List</h1>
      
      {/* Add New Student Button */}
      <Link
        href="/courses/add"
        className="mb-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
      >
        Add New Course
      </Link>

      {/* Student List */}
      <ul className="w-full max-w-lg bg-[#1f1f1f] rounded-lg shadow-md p-6">
        {courses.map((course: course) => (
          <li
            key={course._id.toString()}
            className="p-4 border-b border-[#444] last:border-none hover:bg-[#2d2d2d] transition text-gray-200"
          >
            <Link
              href={`/courses/${course._id}`}
              className="text-lg font-semibold hover:text-blue-400"
            >
              {'Name: '+ course.name}
             
            </Link>
            <button
        type="button"
        onClick={()=> router.push(`/courses/${course._id}/update`)}
        className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Update Course
      </button>
      <button
        type="button"
        onClick={()=>handleDelete(course._id)}
        className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Delete Course
      </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
