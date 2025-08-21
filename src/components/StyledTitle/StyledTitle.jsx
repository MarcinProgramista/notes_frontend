import styled, { css } from "styled-components";

const StyledTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #ffd82b; //hsl(60, 9.1%, 97.8%);
  text-align: center;
  font-family: "Nunito", sans-serif;
  margin-bottom: 10px;
  ${({ $big }) =>
    $big &&
    css`
      font-size: 3rem;
    `}
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      color: hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      color: hsl(106, 47%, 64%);
    `}
`;

export default StyledTitle;
