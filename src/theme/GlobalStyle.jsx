import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    *, *::before, *::after{
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    :root {
    --color-bg: #d8d1ba;
    }
  

    html {
        //font-size: 62.5%;
        font-family: "Montserrat";
        color: #ffd82b;
    }
    body {
    //    padding-left: 150px ;
    margin: 0;
    font-size: 1.6rem;
     background-color: hsl(0, 0%, 10%);
    font-family: "Montserrat", sans-serif;
    //color: wheat;
}


`;
