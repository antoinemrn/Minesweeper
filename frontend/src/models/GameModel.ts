import CellModel from "./CellModel";

interface GameModel {
  id: string;
  grid: CellModel[][];
  win : boolean;
  lose: boolean;
}

export default GameModel;
