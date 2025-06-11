import styled from "styled-components";
const ParagraphError = styled.p`
  position: ${({ $errMsg }) => ($errMsg ? "" : "absolute")};
  left: ${({ $errMsg }) => ($errMsg ? "" : "-9999px")};
  background-color: ${({ $errMsg }) => ($errMsg ? "lightpink" : "")};
  color: ${({ $errMsg }) => ($errMsg ? "firebrick" : "")};
  font-weight: ${({ $errMsg }) => ($errMsg ? "bold" : "")};
  padding: ${({ $errMsg }) => ($errMsg ? "0.5rem" : "")};
  margin-bottom: ${({ $errMsg }) => ($errMsg ? "0.5rem" : "")};
`;

export default ParagraphError;
