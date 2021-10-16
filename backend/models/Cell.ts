class Cell {
  x: number;
  y: number;
  isBomb: boolean;
  value: number;
  isVisible: boolean;
  constructor(x: number, y: number, isBomb: boolean) {
    this.x = x;
    this.y = y;
    this.isBomb = isBomb;
  }
}
export default Cell;
