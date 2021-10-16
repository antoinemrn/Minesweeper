import React from "react";
import styled from "styled-components";
import CellModel from "../models/CellModel";
import Cell from "./Cell";

interface GridProps {
  width: number;
  height: number;
  grid: Array<Array<CellModel>>;
  handleCellClick(x: number, y: number): void;
}

const Grid = ({ width, height, grid, handleCellClick }: GridProps) => {
  return (
    <Container width={width} height={height}>
      {grid.map((row, x) =>
        row.map((c, y) => {
          return (
            <Cell
              x={x}
              y={y}
              value={c.value}
              key={`x${x}y${y}`}
              isBomb={c.isBomb}
              isVisible={c.isVisible}
              handleClick={handleCellClick}
            />
          );
        })
      )}
    </Container>
  );
};

const Container = styled.div<Partial<GridProps>>`
  display: grid;
  margin: auto;
  width: 40%;
  grid-template-columns: ${(props: Partial<GridProps>) =>
    `repeat(${props.width}, 1fr)`};
  grid-template-rows: ${(props: Partial<GridProps>) =>
    `repeat(${props.height}, 1fr)`};
  & div {
    aspect-ratio: 1;
  }
  grid-gap: 5px;
`;

export default Grid;
