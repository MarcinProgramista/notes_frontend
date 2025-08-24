import styled, { css } from "styled-components";

const StyledRemovedNoteButton = styled.button`
  background-color: #ffd82b;
  margin-bottom: 5px;
  height: 47px;
  color: black;
  border: none;
  border-radius: 50px;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  width: ${({ $small }) => ($small ? "200px" : "300px")};

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

export default StyledRemovedNoteButton;
