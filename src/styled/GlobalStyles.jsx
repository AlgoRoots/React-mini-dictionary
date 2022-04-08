import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  
  ${reset}

  @font-face {
    font-family: 'Lato', sans-serif;
    src: url();
    font-weight: normal;
    font-style: normal;
  }

  *{
    box-sizing: border-box;
    margin : auto;
  }

  body {
    min-height: 100vh-60px;
    background-color: #f1f3f4;
    font-family: 'Lato', sans-serif;
    padding: 0px 3rem;
   
  }

  a {
    text-decoration: none;
    color : black;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
`;

export default GlobalStyles;
