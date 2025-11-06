import { createFileRoute } from '@tanstack/react-router'
import TermPage from '../components/TermPage'
import type { Course } from '../App'
import { useDataQuery } from '../utilities/firebase';

interface Schedule {
  title: string;
  courses: {[id: string]: Course};
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const [json, isLoading, error] = useDataQuery('/');

  if (isLoading) return (
    <div className="container py-4 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading course data...</p>
    </div>
  );

  if (error) {
    const errorMessage = error.toString();
    const isPermissionError = errorMessage.includes('permission_denied') || 
                             errorMessage.includes('Permission denied');
    
    return (
      <div className="container py-4">
        {isPermissionError ? (
          <DatabaseInitializer />
        ) : (
          <div className="alert alert-danger">
            <h4>❌ Error Loading Course Data</h4>
            <p>Error: {errorMessage}</p>
            <p className="mb-0">
              <small>Please check your Firebase configuration and database rules.</small>
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!json) return (
    <div className="container py-4">
      <DatabaseInitializer />
    </div>
  );

  const schedule = json as Schedule;

  return (
    <div className="text-center">
      <div className="container py-4">
        <h2 className="mb-4">{schedule.title}</h2>
        <TermPage courses={schedule.courses} />
      </div>
    </div>
  )
}
