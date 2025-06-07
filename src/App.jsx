import styled from "styled-components";

const WrapperApp = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem 0.5rem;
`;
function App() {
  return (
    <WrapperApp>
      <h1>Register</h1>
    </WrapperApp>
  );
}

export default App;
