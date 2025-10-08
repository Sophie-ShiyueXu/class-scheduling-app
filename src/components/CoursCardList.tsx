import React from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../App";

type Props = {
  courses: Record<string, Course>;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
};

function CourseCardList({ courses, selectedIds, onToggle }: Props) {
  const ids = Object.keys(courses);

  return (
    <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 m-0 p-0">
      {ids.map((id) => (
        <CourseCard
          key={id}
          id={id}
          course={courses[id]}
          selected={selectedIds.has(id)}
          onToggle={onToggle}
        />
        ))}

    </ul>
  );
}
export default CourseCardList;