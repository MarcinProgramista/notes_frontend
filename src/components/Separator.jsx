import styled from "styled-components";

const StyledSeparator =styled.div`
    flex-shrink: 1;
    background-color: hsl(0, 0%, 20%);
    height: 1px;
    width: 100%;
    margin-top:5px;
    border-bottom: 1px solid  hsl(0, 0%, 20%);
`
const WrapperSeparator = () => {
  return (
    <StyledSeparator>
      
    </StyledSeparator>
  )
}

export default WrapperSeparator
