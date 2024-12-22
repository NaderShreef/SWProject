// app/students/[id]/edit/page.tsx
import { course } from "@/app/_lib/page";
import CourseForm from "@/app/components/courseForm";
type Params = Promise<{
  courseId: string;
}>;


export default async function EditCoursePage(props: { params: Params }) {
  const params = await props.params;
  const courseId = params.courseId;
  const data = await fetch(`http://localhost:3001/course/${courseId}`);
  const courseInfo:course=await data.json()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Student {courseId}</h2>
      <CourseForm edit={true} courseInfo={courseInfo}/>
    </div>
  );
}
