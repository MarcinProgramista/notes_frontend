import styled from "styled-components";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";

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
      <Register />
    </WrapperApp>
  );
}

export default App;
