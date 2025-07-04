import { Link } from "react-router-dom";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import styled, { withTheme } from "styled-components";
import Wrapper from "../ui/Wrapper";

const LinkPage = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <h1>Links</h1>
        <br />
        <h2>Public</h2>
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/login">
          Login
        </Link>
        <br />
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/register">
          Register
        </Link>
        <br />
        <h2>Private</h2>
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
          Home
        </Link>
      </SectionWrapper>
    </Wrapper>
  );
};

export default LinkPage;
