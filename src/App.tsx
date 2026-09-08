import { useState } from "react";
import GameBoard from "./screens/GameBoard";
import MainMenu from "./screens/MainMenu";

type Screen = "menu" | "game";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");

  return (
    <div className="app">
      {screen === "menu" ? (
        <MainMenu onPlay={() => setScreen("game")} />
      ) : (
        <GameBoard onQuit={() => setScreen("menu")} />
      )}
    </div>
  );
}
