import { QUESTION_SETS } from "../data/questions";

type SetSelectProps = {
  onSelect: (setIndex: number) => void;
  onBack: () => void;
};

export default function SetSelect({ onSelect, onBack }: SetSelectProps) {
  return (
    <main className="menu set-select">
      <h1 className="set-select-title">Choose a Question Set</h1>
      <p className="set-select-sub">{QUESTION_SETS.length} quick games · 5 questions each</p>
      <div className="set-grid">
        {QUESTION_SETS.map((set, index) => (
          <button
            key={set.id}
            className="set-btn"
            type="button"
            onClick={() => onSelect(index)}
          >
            {set.name}
          </button>
        ))}
      </div>
      <button className="host-btn set-back" type="button" onClick={onBack}>
        Back
      </button>
    </main>
  );
}
