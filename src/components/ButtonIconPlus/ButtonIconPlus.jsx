import styled, { css } from "styled-components";

const ButtonIconPlus = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
  background-image: url(${({ $icon }) => $icon});

  ${({ $category }) =>
    $category === "Books" &&
    css`
      background-color: hsl(106, 47%, 64%);
    `}
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      background-color: #ffd82b;
    `}
    ${({ $category }) =>
    $category === "Films" &&
    css`
      background-color: hsl(196, 83%, 75%);
    `}

    ${({ $category }) =>
    $category === "Home" &&
    css`
      background-color: #ffd82b;
    `}
`;

export default ButtonIconPlus;
