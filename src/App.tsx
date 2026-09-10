import { useState } from "react";
import FullscreenButton from "./components/FullscreenButton";
import GameBoard from "./screens/GameBoard";
import MainMenu from "./screens/MainMenu";
import SetSelect from "./screens/SetSelect";

type Screen = "menu" | "sets" | "game";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [setIndex, setSetIndex] = useState(0);

  return (
    <div className="app">
      {screen !== "game" ? <FullscreenButton /> : null}
      {screen === "menu" ? (
        <MainMenu onPlay={() => setScreen("sets")} />
      ) : screen === "sets" ? (
        <SetSelect
          onSelect={(index) => {
            setSetIndex(index);
            setScreen("game");
          }}
          onBack={() => setScreen("menu")}
        />
      ) : (
        <GameBoard
          setIndex={setIndex}
          onQuit={() => setScreen("sets")}
        />
      )}
    </div>
  );
}
