import { useEffect, useMemo, useRef, useState } from "react";
import { QUESTION_SETS } from "../data/questions";
import { playReveal, playStrike } from "../lib/sfx";
import type { Question } from "../types";

type GameBoardProps = {
  setIndex: number;
  onQuit: () => void;
};

type ScoreAward = {
  team: 0 | 1;
  points: number;
};

const BOARD_SLOTS = 8;

function emptyReveals(questions: Question[], index: number) {
  return Array.from({ length: questions[index].answers.length }, () => false);
}

export default function GameBoard({ setIndex, onQuit }: GameBoardProps) {
  const questionSet = QUESTION_SETS[setIndex];
  const questions = questionSet.questions;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => emptyReveals(questions, 0));
  const [leftover, setLeftover] = useState<boolean[]>(() => emptyReveals(questions, 0));
  const [strikes, setStrikes] = useState(0);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [scoreAward, setScoreAward] = useState<ScoreAward | null>(null);
  const [stealFlash, setStealFlash] = useState(false);
  const [stealUsed, setStealUsed] = useState(false);
  const stealTimer = useRef<number | null>(null);

  const question = questions[questionIndex];
  const awarded = scoreAward !== null;

  useEffect(() => {
    return () => {
      if (stealTimer.current !== null) window.clearTimeout(stealTimer.current);
    };
  }, []);

  const bank = useMemo(
    () =>
      question.answers.reduce(
        (sum, answer, i) => (revealed[i] && !leftover[i] ? sum + answer.points : sum),
        0,
      ),
    [question, revealed, leftover],
  );

  function goTo(index: number) {
    if (index < 0 || index >= questions.length) return;
    setQuestionIndex(index);
    setRevealed(emptyReveals(questions, index));
    setLeftover(emptyReveals(questions, index));
    setStrikes(0);
    setScoreAward(null);
    setStealFlash(false);
    setStealUsed(false);
    if (stealTimer.current !== null) {
      window.clearTimeout(stealTimer.current);
      stealTimer.current = null;
    }
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
    if (awarded) return;
    if (strikes < 3) {
      setStrikes((n) => n + 1);
      playStrike();
      return;
    }
    if (stealUsed) return;
    setStealUsed(true);
    setStealFlash(true);
    playStrike();
    if (stealTimer.current !== null) window.clearTimeout(stealTimer.current);
    stealTimer.current = window.setTimeout(() => {
      setStealFlash(false);
      stealTimer.current = null;
    }, 1200);
  }

  function award(team: 0 | 1) {
    if (awarded || bank === 0) return;
    setScores((prev) => {
      const next: [number, number] = [...prev];
      next[team] += bank;
      return next;
    });
    setScoreAward({ team, points: bank });
  }

  function undoAward() {
    if (!scoreAward) return;
    setScores((prev) => {
      const next: [number, number] = [...prev];
      next[scoreAward.team] = Math.max(0, next[scoreAward.team] - scoreAward.points);
      return next;
    });
    setScoreAward(null);
  }

  return (
    <main className="game">
      <header className="game-top">
        <div className="score-card left">
          <span className="score-label">TEAM 1</span>
          <span className="score-value">{scores[0]}</span>
        </div>
        <h1 className="game-brand">{questionSet.name.toUpperCase()}</h1>
        <div className="score-card right">
          <span className="score-label">TEAM 2</span>
          <span className="score-value">{scores[1]}</span>
        </div>
      </header>

      <h2 className="prompt-banner">{question.prompt}</h2>

      <section className="board-wrap">
        <div className="survey-board">
          {stealFlash ? (
            <div className="steal-flash" aria-hidden="true">
              <span className="steal-flash-x">X</span>
            </div>
          ) : null}
          {[0, 4].map((start) => (
            <div key={`${question.id}-${start}`} className="board-col">
              {Array.from({ length: BOARD_SLOTS / 2 }, (_, offset) => {
                const i = start + offset;
                const answer = question.answers[i];
                if (!answer) {
                  return <div key={`${question.id}-${i}`} className="answer-slot empty" />;
                }
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
          <button className="host-btn danger" type="button" onClick={addStrike} disabled={awarded || stealUsed}>
            Strike
          </button>
          <button className="host-btn team-a" type="button" onClick={() => award(0)} disabled={awarded || bank === 0}>
            Give to Team 1
          </button>
          <button className="host-btn team-b" type="button" onClick={() => award(1)} disabled={awarded || bank === 0}>
            Give to Team 2
          </button>
          <button className="host-btn undo" type="button" onClick={undoAward} disabled={!scoreAward}>
            Undo score
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
            {questionIndex + 1} / {questions.length}
          </span>
          <button
            className="host-btn"
            type="button"
            onClick={() => goTo(questionIndex + 1)}
            disabled={questionIndex === questions.length - 1}
          >
            Next
          </button>
          <button className="host-btn" type="button" onClick={onQuit}>
            Question sets
          </button>
        </div>
      </footer>
    </main>
  );
}
