import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    background-color: #44505E;
    height: 100%;
    font-family: -apple-system,
      Ubuntu ,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
`;

export default GlobalStyle;
