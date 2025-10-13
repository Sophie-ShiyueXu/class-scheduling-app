import type { Course } from "../App";
type Props = {
  id: string;
  course: Course;
  selected: boolean;
  onToggle: (id: string) => void;
  blocked?: boolean;
};

function CourseCard({ id, course, selected, onToggle, blocked = false }: Props) {
  const { term, number, title, meets } = course;

  const cardClass = [
    "card h-100 shadow-sm position-relative",
    selected ? "border-primary" : "border-200",
    selected ? "bg-light" : "bg-white",
    blocked ? "opacity-50" : "",                
    blocked ? "pe-none" : "", 
  ].filter(Boolean).join(" ");

  const handleToggle = () => {
    if (blocked && !selected) return;
    onToggle(id);
  };

  return (
    <li className="list-unstyled col">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-disabled={blocked && !selected} 
        className={cardClass}
        onClick={handleToggle}                   
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggle;
        }}
      >
        {selected && (
          <span
            className="position-absolute top-0 end-0 m-2 badge text-bg-primary"
            aria-hidden
          >
          </span>
        )}
        {blocked && !selected && (              
          <span
            className="position-absolute top-0 end-0 m-2 badge text-bg-secondary"
            title="Time conflict"
            aria-label="Time conflict"
          >
            ×
          </span>
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{term} • {number}</h5>
          <p className="card-text text-body-secondary flex-grow-1">{title}</p>
          <div className="text-muted small mt-2">{meets || "TBA"}</div>
          <div className="text-muted small mt-1">
          </div>
        </div>
      </div>
    </li>
  );
}

export default CourseCard;