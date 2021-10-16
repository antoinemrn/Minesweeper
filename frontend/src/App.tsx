import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./components/Grid";
import GameModel from "./models/GameModel";
import GlobalStyle from "./globalStyles";

const App = () => {
  const width = 20;
  const height = 20;
  const nbBombs = 70;
  const [game, setGame] = useState<GameModel>();

  const handleCellClick = async (x: number, y: number) => {
    console.log(`Revealing : (${x}, ${y})`);
    const response = await axios.get<GameModel>(
      `http://localhost:3001/game/reveal?x=${x}&y=${y}`
    );
    setGame(response.data);
  };

  useEffect(() => {
    const newGame = async () => {
      const response = await axios.get<GameModel>(
        `http://localhost:3001/game/grid?w=${width}&h=${height}&b=${nbBombs}`
      );
      setGame(response.data);
    };
    newGame();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Title>MineSweeper</Title>
      {game && (
        <div>
          <Grid
            width={width}
            height={height}
            grid={game.grid}
            handleCellClick={handleCellClick}
          />
        </div>
      )}
      {game?.win && (
        <Overlay>
          <EndText>Win !</EndText>
        </Overlay>
      )}
      {game?.lose && (
        <Overlay>
          <EndText>Lose !</EndText>
        </Overlay>
      )}
    </div>
  );
};

const Title = styled.div`
  text-align: center;
  font-size: 3.5em;
  margin: auto;
  padding: 30px;
  color: #388666;
  font-family: "affirmative";
  text-shadow: 1px 1px 3px #000000, -2px -2px 4px #ffffff;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000008f;
  top: 0;
  left: 0;
  display: grid;
  justify-items: center;
  align-items: center;
`;
const EndText = styled.div`
  color: white;
  font-size: 2em;
  font-weight: bold;
`;
export default App;
