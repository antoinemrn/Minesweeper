import { v4 as uuidv4 } from "uuid";
import Cell from "./Cell";

class Game {
  id: string;
  grid: Cell[][];
  width: number;
  height: number;
  win: boolean;
  lose: boolean;
  private nbBombs: number;
  constructor(width: number, height: number, nbBombs: number) {
    this.width = width;
    this.height = height;
    this.initGrid(nbBombs);
    this.id = uuidv4();
    this.nbBombs = nbBombs;
  }
  initGrid(nbBombs: number) {
    this.grid = new Array<Array<Cell>>();

    for (let i = 0; i < this.height; i++) {
      let row: Array<Cell> = new Array<Cell>();
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(j, i, false));
      }
      this.grid.push(row);
    }
    this.generateBombs(nbBombs);
  }

  revealAll() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.grid[i][j].isVisible = this.grid[i][j].isVisible || this.grid[i][j].isBomb;
      }
    }
  }

  reveal(x: number, y: number) {
    if (this.grid[x][y].isBomb) {
      this.lose = true;
      this.revealAll();
      return;
    }
    this.revealCell(x, y);
    const nbCellsReveal = this.grid.reduce((prev, curr) =>
      prev.concat(curr.filter((cell) => cell.isVisible)), []
    ).length;
    this.win = nbCellsReveal === this.width * this.height - this.nbBombs;
  }

  revealCell(x: number, y: number) {
    let neightboors = this.getNeighbours(x, y);
    let nbCloseBombs = neightboors.filter(
      (n) => this.grid[n[0]][n[1]].isBomb
    ).length;

    this.grid[x][y].isVisible = !this.grid[x][y].isBomb;
    if (nbCloseBombs !== 0) {
      this.grid[x][y].value = nbCloseBombs;
    } else {
      for (const n of neightboors.filter(
        (n) => !this.grid[n[0]][n[1]].isVisible && !this.grid[n[0]][n[1]].isBomb
      )) {
        this.revealCell(n[0], n[1]);
      }
    }
  }

  private getNeighbours(x: number, y: number): Array<[number, number]> {
    var newCoords: Array<[number, number]> = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y],
    ];
    return newCoords.filter((x) => this.isValid(x));
  }

  private isValid(coord: [number, number]) {
    return (
      coord[0] >= 0 &&
      coord[0] < this.width &&
      coord[1] >= 0 &&
      coord[1] < this.height
    );
  }

  private generateBombs(nbBombs: number) {
    let coordArray = new Array<[number, number]>();
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        coordArray.push([i, j]);
      }
    }
    this.shuffleArray(coordArray);

    for (let i = 0; i < nbBombs; i++) {
      this.grid[coordArray[i][0]][coordArray[i][1]].isBomb = true;
    }
  }

  private shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
export default Game;
