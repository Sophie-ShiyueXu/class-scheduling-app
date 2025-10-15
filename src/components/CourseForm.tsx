import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Course } from "../App";

interface CourseFormProps {
  courses?: Record<string, Course>;
}

export default function CourseForm({ courses }: CourseFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const editingCourse = useMemo(
    () => (id && courses ? courses[id] : undefined),
    [id, courses]
  );

  const [title, setTitle] = useState(editingCourse?.title ?? "");
  const [meets, setMeets] = useState(editingCourse?.meets ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
  };

  return (
    <form onSubmit={onSubmit} className="p-4">
      <h2>{editingCourse ? "Edit Course" : "Add Course"}</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Course Title
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Introduction to Programming"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="meeting" className="form-label">
          Meeting Times
        </label>
        <input
          id="meeting"
          type="text"
          className="form-control"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
          placeholder="e.g. MWF 10:00–10:50"
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </form>
  );
}
