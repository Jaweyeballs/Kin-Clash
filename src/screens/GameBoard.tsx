import { useMemo, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { playReveal, playStrike } from "../lib/sfx";

type GameBoardProps = {
  onQuit: () => void;
};

const TEST_QUESTION = QUESTIONS[0];

export default function GameBoard({ onQuit }: GameBoardProps) {
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    TEST_QUESTION.answers.map(() => false),
  );
  const [strikes, setStrikes] = useState(0);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [awarded, setAwarded] = useState(false);

  const bank = useMemo(
    () =>
      TEST_QUESTION.answers.reduce(
        (sum, answer, i) => (revealed[i] ? sum + answer.points : sum),
        0,
      ),
    [revealed],
  );

  function reveal(index: number) {
    if (revealed[index] || awarded) return;
    setRevealed((prev) => prev.map((on, i) => (i === index ? true : on)));
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
        <h1 className="game-brand">KIN CLASH</h1>
        <div className="score-card right">
          <span className="score-label">TEAM 2</span>
          <span className="score-value">{scores[1]}</span>
        </div>
      </header>

      <h2 className="prompt-banner">{TEST_QUESTION.prompt}</h2>

      <section className="board-wrap">
        <div className="board">
          {TEST_QUESTION.answers.map((answer, i) => {
            const isRevealed = revealed[i];
            return (
              <button
                key={answer.text}
                className={`answer-slot${isRevealed ? " revealed" : ""}`}
                type="button"
                onClick={() => reveal(i)}
                disabled={isRevealed || awarded}
              >
                <span className={`slot-inner${isRevealed ? "" : " slot-hidden"}`}>
                  <span className="slot-num">{i + 1}</span>
                  <span className="slot-text">{isRevealed ? answer.text : "••••••••"}</span>
                  <span className="slot-points">{isRevealed ? answer.points : "00"}</span>
                </span>
              </button>
            );
          })}
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
        <button className="host-btn" type="button" onClick={onQuit}>
          Main menu
        </button>
      </footer>
    </main>
  );
}
