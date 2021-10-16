import React from "react";
import styled from "styled-components";
import { BiBomb } from "react-icons/bi";

interface CellProps {
  remainingBombs: number;
}

const Stats = ({ remainingBombs }: CellProps) => {
  return (
    <MainContainer>
      <BombContainer>
        <BombIcon />
        <BombValue>{remainingBombs}</BombValue>
      </BombContainer>
    </MainContainer>
  );
};
const MainContainer = styled.div``;
const BombContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: auto;
  width: 50%;
  text-align: center;
  padding: 10px;
  /* box-shadow: inset -3px -3px 3px #e7e7dc, inset 2px 2px 5px #00000052,
    -3px -3px 3px #e7e7dc, 2px 2px 5px #00000052; */
  border: solid 1px #efefd0;
  box-shadow: inset -3px -3px 3px #efefd0, inset 2px 2px 5px #00000052,
    -3px -3px 3px #efefd0, 2px 2px 5px #00000052;

  border-radius: 10px;
`;
const BombValue = styled.div`
  display: inline-block;
  color: #388666;
  font-weight: bold;
  font-size: 2em;
`;
const BombIcon = styled(BiBomb)`
  margin-left: 10px;
  color: #388666;
  width: 100%;
  height: 100%;
`;
export default Stats;
