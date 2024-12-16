import { course } from "@/app/_lib/page";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const data = await fetch(`http://localhost:3001/courses/${courseId}`);
  const courseInfo:course=await data.json()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Student Details</h1>
      <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-full max-w-md">
      <p className="text-lg">Details for Course </p>

        <p className="text-lg">ID: {courseId}</p>
        <p className="text-lg">Name: {courseInfo.name}</p>


      </div>
    </div>
  );
}
