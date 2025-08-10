import styled, { css } from "styled-components";
import Books from "../../assets/pen-nib-svgrepo-com.png";

const ButtonIcon = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
  background-image: url(${({ $icon }) => $icon});
  background-color: white;

  ${({ $active, $category }) =>
    $active &&
    $category === "Books" &&
    css`
      border: 6px solid hsl(106, 47%, 64%);
      background-size: 80%;
      width: 70px;
      height: 70px;
    `}
  ${({ $active, $category }) =>
    $active &&
    $category === "Notes" &&
    css`
      border: 6px solid #ffd82b;
      background-size: 80%;
      width: 70px;
      height: 70px;
    `}
    ${({ $active, $category }) =>
    $active &&
    $category === "Films" &&
    css`
      border: 8px solid hsl(196, 83%, 75%);
      background-size: 80%;
      width: 70px;
      height: 70px;
    `}
`;

export default ButtonIcon;
