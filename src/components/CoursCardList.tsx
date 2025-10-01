import React from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../App";

function CourseCardList({ courses }: { courses: Record<string, Course> }) {
  const ids = Object.keys(courses);

  return (
    <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 m-0 p-0">
      {ids.map((id) => (
        <CourseCard key={id} course={courses[id]} />
      ))}
    </ul>
  );
}
export default CourseCardList;