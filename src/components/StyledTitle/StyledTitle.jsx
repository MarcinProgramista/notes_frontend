import styled, { css } from "styled-components";

const StyledTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #ffd82b;
  text-align: start;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  //height: 50px;
  font-family: "Montserrat", sans-serif;
  background-color: hsl(0, 0%, 10%);
  //margin-bottom: 1px;
  ${({ $big }) =>
    $big &&
    css`
      font-size: 3rem;
    `}
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      background-color: #ffd82b;
      color: black;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      background-color: hsl(196, 83%, 75%);
      color: black;
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      background-color: hsl(106, 47%, 64%);
      color: black;
    `}
`;

export default StyledTitle;
