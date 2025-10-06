import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Banner from './components/Banner'
import CourseCardList from './components/CoursCardList'
import { useJsonQuery } from "./utilities/fetch";
import TermPage from './components/TermPage';


const DATA_URL =
  "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

export type Course = {
  term: string,
  number: string,
  meets: string,
  title: string
}

// const schedule = {
//   title: "CS Courses for 2018-2019",
//   "courses": {
//     "F101" : {
//       "term": "Fall",
//       "number": "101",
//       "meets" : "MWF 11:00-11:50",
//       "title" : "Computer Science: Concepts, Philosophy, and Connections"
//     },
//     "F110" : {
//       "term": "Fall",
//       "number": "110",
//       "meets" : "MWF 10:00-10:50",
//       "title" : "Intro Programming for non-majors"
//     },
//     "S313" : {
//       "term": "Spring",
//       "number": "313",
//       "meets" : "TuTh 15:30-16:50",
//       "title" : "Tangible Interaction Design and Learning"
//     },
//     "S314" : {
//       "term": "Spring",
//       "number": "314",
//       "meets" : "TuTh 9:30-10:50",
//       "title" : "Tech & Human Interaction"
//     }
//   }
//   };

interface Schedule {
  title: string;
  courses: {[id: string]: Course};
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery(DATA_URL);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!json) return <h1>No course data found</h1>;

  const schedule = json as Schedule;

  return (
    <div className="text-center">
      <header className="bg-dark text-white d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="container py-4">
          <Banner title={schedule.title} />
          {/* <CourseCardList courses={schedule.courses} /> */}
          <TermPage courses={schedule.courses} />
        </div>
        
      </header>
    </div>
  )
}



export default App
