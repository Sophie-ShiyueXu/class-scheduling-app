import { useState, useMemo } from 'react';
import TermSelector from './TermSelector';
import type { Term } from './TermSelector';
import CourseCardList from './CoursCardList';
import type { Course } from '../App';

interface TermPageProps {
  courses: Record<string, Course>;
}

const TermPage = ({ courses }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredCourses = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(courses).filter(([, c]) => c.term === selectedTerm)
      ),
    [courses, selectedTerm]
  );

  return (
    <section>
      <TermSelector selected={selectedTerm} onSelect={setSelectedTerm} />

      <CourseCardList courses={filteredCourses} selectedIds={selectedIds} onToggle={toggleSelect}/>
    </section>
  );
};

export default TermPage;
