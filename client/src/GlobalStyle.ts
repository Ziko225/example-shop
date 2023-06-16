import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
 ${normalize}
  body {
    color: ${theme.colors.text};
    font-family: 'Changa One', cursive;
    font-family: 'Roboto', sans-serif;
    background-color: ${theme.colors.background}
  }

  a{
    text-decoration: none;
    color: ${theme.colors.text};
  }

  button{
    cursor: pointer;
    &:hover{
      filter: brightness(130%);
    }
    &:active{
      filter: brightness(80%);
    }
  }
`;