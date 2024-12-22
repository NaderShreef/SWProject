import CourseForm from "@/app/components/courseForm";


export default function AddCoursePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Course</h2>
      <CourseForm edit={false}  />
    </div>
  );
}
