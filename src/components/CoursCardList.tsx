import React from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../App";
import { conflictsWithAnySelected } from "../utils/timeconflict";

type Props = {
  courses: Record<string, Course>;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
};

function CourseCardList({ courses, selectedIds, onToggle }: Props) {
  const ids = Object.keys(courses);
  const selectedCourses = Array.from(selectedIds).map((sid) => courses[sid]).filter(Boolean); 


  return (
  <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 m-0 p-0">
    {ids.map((id) => {
      const course = courses[id];
      const isSelected = selectedIds.has(id);
      const blocked = !isSelected && conflictsWithAnySelected(course, selectedCourses);

      return (
        <CourseCard
          key={id}
          id={id}
          course={course}
          selected={isSelected}
          onToggle={onToggle}
          blocked={blocked}
        />
      );
    })}
  </ul>
);

}
export default CourseCardList;