import { unlockAudio } from "../lib/sfx";

type MainMenuProps = {
  onPlay: () => void;
};

export default function MainMenu({ onPlay }: MainMenuProps) {
  return (
    <main className="menu">
      <p className="menu-kicker">A FAMILY SURVEY SHOW</p>
      <h1 className="logo">
        <span className="logo-kin">KIN</span>
        <span className="logo-clash">CLASH</span>
      </h1>
      <hr className="menu-rule" />
      <p className="menu-tag">We asked 100 families</p>
      <button
        className="play-btn"
        type="button"
        onClick={() => {
          unlockAudio();
          onPlay();
        }}
      >
        PLAY
      </button>
      <p className="menu-hint">Host mode — click an answer to reveal it</p>
      <div className="menu-preview" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="preview-slot" />
        ))}
      </div>
    </main>
  );
}
