import styled, { css } from "styled-components";

const StyledTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: black;
  text-align: start;
  border-radius: 20px;
  padding: 15px;
  margin: 15px;
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
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      background-color: hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      background-color: hsl(106, 47%, 64%);
    `}
`;

export default StyledTitle;
