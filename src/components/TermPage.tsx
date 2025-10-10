import { useState, useMemo } from 'react';
import TermSelector from './TermSelector';
import type { Term } from './TermSelector';
import CourseCardList from './CoursCardList';
import type { Course } from '../App';
import SchedulePopup from './SchedulePopup';

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

  const [planOpen, setPlanOpen] = useState(false); 
  const selectedCourses: Course[] = useMemo(() => { 
    const arr: Course[] = [];
    selectedIds.forEach((id) => {
      const c = courses[id];
      if (c) arr.push(c);
    });
    return arr;
  }, [selectedIds, courses]);


  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <TermSelector selected={selectedTerm} onSelect={setSelectedTerm} />
        <button type="button" className="btn btn-outline-secondary" onClick={() => setPlanOpen(true)} ria-label="Open course plan">
            Course plan
        </button>
      </div>
      <CourseCardList courses={filteredCourses} selectedIds={selectedIds} onToggle={toggleSelect}/>

      <SchedulePopup isOpen={planOpen} onClose={() => setPlanOpen(false)} courses={selectedCourses}/>
    </section>
  );
};

export default TermPage;
