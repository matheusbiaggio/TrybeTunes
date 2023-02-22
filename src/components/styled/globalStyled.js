import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;


    font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

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
