import type { Course } from "../App";

function CourseCard({ course }: { course: Course }) {
  const { term, number, title, meets } = course;

  return (
    <li className="list-unstyled col">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-3">{term} CS {number}</h5>
          <p className="card-text text-body-secondary flex-grow-1">
            {title}
          </p>
          <hr className="mt-3 mb-2" />
          <div className="text-muted small mt-2">{meets || "TBA"}</div>
        </div>
      </div>
    </li>
  );
}


export default CourseCard;