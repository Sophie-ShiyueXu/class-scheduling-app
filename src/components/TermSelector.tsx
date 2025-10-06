export type Term = 'Fall' | 'Winter' | 'Spring';

interface TermSelectorProps {
  selected: Term;
  onSelect: (t: Term) => void;
}

const terms: Term[] = ['Fall', 'Winter', 'Spring'];

const TermSelector = ({ selected, onSelect }: TermSelectorProps) => {
  return (
    <div className="btn-group my-3" role="group" aria-label="Term filter">
      {terms.map(t => (
        <button
          key={t}
          type="button"
          className={`btn ${selected === t ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onSelect(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TermSelector;
