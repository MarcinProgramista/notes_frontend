import styled, { css } from "styled-components";
import Books from "../../assets/pen-nib-svgrepo-com.png";

const ButtonIcon = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 40%;
  background-image: url(${({ $icon }) => $icon});
  background-color: white;
  border: ${({ $active }) => ($active ? "4px" : "1px")};
`;

export default ButtonIcon;
