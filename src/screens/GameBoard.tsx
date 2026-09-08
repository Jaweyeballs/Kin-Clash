import { useMemo, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { playReveal, playStrike } from "../lib/sfx";

type GameBoardProps = {
  onQuit: () => void;
};

function emptyReveals(index: number) {
  return QUESTIONS[index].answers.map(() => false);
}

export default function GameBoard({ onQuit }: GameBoardProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => emptyReveals(0));
  const [leftover, setLeftover] = useState<boolean[]>(() => emptyReveals(0));
  const [strikes, setStrikes] = useState(0);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [awarded, setAwarded] = useState(false);

  const question = QUESTIONS[questionIndex];

  const bank = useMemo(
    () =>
      question.answers.reduce(
        (sum, answer, i) => (revealed[i] && !leftover[i] ? sum + answer.points : sum),
        0,
      ),
    [question, revealed, leftover],
  );

  function goTo(index: number) {
    if (index < 0 || index >= QUESTIONS.length) return;
    setQuestionIndex(index);
    setRevealed(emptyReveals(index));
    setLeftover(emptyReveals(index));
    setStrikes(0);
    setAwarded(false);
  }

  function reveal(index: number) {
    if (revealed[index]) return;
    setRevealed((prev) => prev.map((on, i) => (i === index ? true : on)));
    if (awarded) {
      setLeftover((prev) => prev.map((on, i) => (i === index ? true : on)));
    }
    playReveal();
  }

  function addStrike() {
    if (strikes >= 3 || awarded) return;
    setStrikes((n) => n + 1);
    playStrike();
  }

  function award(team: 0 | 1) {
    if (awarded || bank === 0) return;
    setScores((prev) => {
      const next: [number, number] = [...prev];
      next[team] += bank;
      return next;
    });
    setAwarded(true);
  }

  return (
    <main className="game">
      <header className="game-top">
        <div className="score-card left">
          <span className="score-label">TEAM 1</span>
          <span className="score-value">{scores[0]}</span>
        </div>
        <h1 className="game-brand">FAMILY FEUD</h1>
        <div className="score-card right">
          <span className="score-label">TEAM 2</span>
          <span className="score-value">{scores[1]}</span>
        </div>
      </header>

      <h2 className="prompt-banner">{question.prompt}</h2>

      <section className="board-wrap">
        <div className="survey-board">
          {[0, 4].map((start) => (
            <div key={`${question.id}-${start}`} className="board-col">
              {question.answers.slice(start, start + 4).map((answer, offset) => {
                const i = start + offset;
                const isRevealed = revealed[i];
                const isLeftover = leftover[i];
                return (
                  <button
                    key={`${question.id}-${i}`}
                    className={`answer-slot${isRevealed ? " revealed" : ""}${isLeftover ? " leftover" : ""}`}
                    type="button"
                    onClick={() => reveal(i)}
                    disabled={isRevealed}
                  >
                    <span className="slot-hidden">
                      <span className="slot-badge">{i + 1}</span>
                    </span>
                    <span className="slot-inner" aria-hidden={!isRevealed}>
                      <span className="slot-num">{i + 1}</span>
                      <span className="slot-text">{answer.text}</span>
                      <span className="slot-points">{answer.points}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="bank-row">
          <div className="bank">
            <span className="bank-label">BOARD</span>
            <span className="bank-value">{bank}</span>
          </div>
          <div className="strikes" aria-label={`${strikes} strikes`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`strike-x${i < strikes ? " on" : ""}`}>
                X
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="controls">
        <div className="control-group">
          <button className="host-btn danger" type="button" onClick={addStrike} disabled={awarded || strikes >= 3}>
            Strike
          </button>
          <button className="host-btn team-a" type="button" onClick={() => award(0)} disabled={awarded || bank === 0}>
            Give to Team 1
          </button>
          <button className="host-btn team-b" type="button" onClick={() => award(1)} disabled={awarded || bank === 0}>
            Give to Team 2
          </button>
        </div>
        <div className="control-group">
          <button
            className="host-btn"
            type="button"
            onClick={() => goTo(questionIndex - 1)}
            disabled={questionIndex === 0}
          >
            Previous
          </button>
          <span className="question-index">
            {questionIndex + 1} / {QUESTIONS.length}
          </span>
          <button
            className="host-btn"
            type="button"
            onClick={() => goTo(questionIndex + 1)}
            disabled={questionIndex === QUESTIONS.length - 1}
          >
            Next
          </button>
          <button className="host-btn" type="button" onClick={onQuit}>
            Main menu
          </button>
        </div>
      </footer>
    </main>
  );
}
