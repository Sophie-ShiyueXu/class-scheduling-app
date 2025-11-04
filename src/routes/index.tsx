import { createFileRoute } from '@tanstack/react-router'
import Banner from '../components/Banner'
import TermPage from '../components/TermPage'
import { useJsonQuery } from '../utilities/fetch'
import { getDataUrl } from '../utilities/config'
import type { Course } from '../App'

const DATA_URL = getDataUrl();

interface Schedule {
  title: string;
  courses: {[id: string]: Course};
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const [json, isLoading, error] = useJsonQuery(DATA_URL);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!json) return <h1>No course data found</h1>;

  const schedule = json as Schedule;

  return (
    <div className="text-center">
      <div className="container py-4">
        <Banner title={schedule.title} />
        <TermPage courses={schedule.courses} />
      </div>
    </div>
  )
}
