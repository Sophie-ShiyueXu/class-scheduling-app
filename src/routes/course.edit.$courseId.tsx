import { createFileRoute } from '@tanstack/react-router'
import CourseForm from '../components/CourseForm'
import { useJsonQuery } from '../utilities/fetch'
import { getDataUrl } from '../utilities/config'
import type { Course } from '../App'
import { useDataQuery } from '../utilities/firebase';
const DATA_URL = getDataUrl();

interface Schedule {
  title: string;
  courses: {[id: string]: Course};
}

export const Route = createFileRoute('/course/edit/$courseId')({
  component: CourseEditPage,
})

function CourseEditPage() {
  const { courseId } = Route.useParams()
  const navigate = Route.useNavigate()

  const [json, isLoading, error] = useDataQuery('/');

  if (error) return <div>Error loading course data: {`${error}`}</div>;
  if (isLoading) return <div>Loading course data...</div>;
  if (!json) return <div>No course data found</div>;

  const schedule = json as Schedule;
  const course = schedule.courses?.[courseId];

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <CourseForm 
      course={course} 
      onCancel={() => navigate({ to: '/' })} 
    />
  );
}