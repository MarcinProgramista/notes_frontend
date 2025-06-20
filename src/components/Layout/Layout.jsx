import { Outlet } from "react-router-dom";
import styled from "styled-components";

const WrapperApp = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem 0.5rem;
`;

const Layout = () => {
  return (
    <WrapperApp>
      <Outlet />
    </WrapperApp>
  );
};

export default Layout;
