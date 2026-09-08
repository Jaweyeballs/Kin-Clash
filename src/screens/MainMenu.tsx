import { unlockAudio } from "../lib/sfx";

type MainMenuProps = {
  onPlay: () => void;
};

export default function MainMenu({ onPlay }: MainMenuProps) {
  return (
    <main className="menu">
      <h1 className="logo">
        <span className="logo-fair">Fall Fair</span>
        <span className="logo-family">Family</span>
        <span className="logo-feud">Feud</span>
      </h1>
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
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="preview-slot" />
        ))}
      </div>
    </main>
  );
}
