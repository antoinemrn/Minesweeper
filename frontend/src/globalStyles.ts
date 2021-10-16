import { createGlobalStyle } from "styled-components";
// 1. import the font
import afirmative from "./resources/fonts/affirmative/Affirmative.ttf";

// export const theme = {
//   primaryBlue: "#0794B4",
//   secondaryBlue: "#043157",
//   primaryWhite: "#fff"
// };

// 2. interpolate it using tagged template literals
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: affirmative;
    src: url(${afirmative}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;
