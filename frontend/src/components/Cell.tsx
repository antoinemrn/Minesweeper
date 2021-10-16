import React, { MouseEvent, useState } from "react";
import styled from "styled-components";
import CellModel from "../models/CellModel";

import { TiFlag } from "react-icons/ti";

interface CellProps {
  x: number;
  y: number;
  value: number;
  isBomb: boolean;
  isVisible: boolean;
  handleClick(x: number, y: number): void;
}

const Cell = ({ x, y, isBomb, isVisible, value, handleClick }: CellProps) => {
  const [isFlag, setIsFlag] = useState(false);
  const clicked = () => {
    handleClick(x, y);
  };
  const flag = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFlag(!isFlag);
  };
  return (
    <Container
      isBomb={isBomb}
      isVisible={isVisible}
      onClick={clicked}
      onContextMenu={flag}
    >
      {isVisible && <Value>{value}</Value>}
      {!isVisible && isFlag && <TiFlag color="#d85509" size={20} />}
    </Container>
  );
};
const Container = styled.div<Partial<CellModel>>`
  background-color: ${(props) =>
    !props.isVisible ? "#E8DAB3" : props.isBomb ? "#ec4444" : "#E8DAB3"};
  color: white;
  box-shadow: ${(props) =>
    !props.isVisible
      ? `2px 2px 2px #00000030,
             -2px -2px 2px #ffffff71`
      : `inset 2px 2px 2px #00000030,
             inset -2px -2px 2px #ffffff71`};
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: #5353531f;
    cursor: pointer;
  }
`;
const Value = styled.div`
  color: #388666;
  font-weight: bold;
`;
export default Cell;
