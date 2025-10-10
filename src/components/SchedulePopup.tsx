import Modal from './Modal';
import type { Course } from '../App';

interface SchedulePopupProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

const SchedulePopup = ({ isOpen, onClose, courses }: SchedulePopupProps) => {
  const has = courses.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-blue-600">
        <h2 className="text-lg font-bold text-blue-600">Course Plan!</h2>

        {has ? (
          <ul className="mt-2 space-y-3 text-blue-600">
            {courses.map((c, i) => (
              <li key={`${c.term}-${c.number}-${i}`}>
                <div className="rounded border border-blue-400 p-3">
                  <div className="font-medium text-blue-700">
                    {c.number} — {c.title}
                  </div>
                  <div className="text-sm mt-1 text-blue-500">
                    {c.meets?.trim() ? c.meets : 'TBA'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="mt-2 text-blue-600">
              You haven’t selected any courses yet.
            </p>
            <p className="text-blue-500">
              Tip: click a course card to add it to your plan, then open this pop-up again to review.
            </p>
          </>
        )}

        <button
          className="mt-4 w-full border border-blue-500 text-blue-600 rounded py-2 text-lg font-bold hover:bg-blue-100"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SchedulePopup;
