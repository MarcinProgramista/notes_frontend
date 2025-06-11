import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import ParagraphError from "../ParagraphErrorFrom/ParagraphErrorFrom";
import FormWrapperRegisterLogin from "../FormWrapperRegisterLogin/FormWrapperRegisterLogin";
import StyledButtonRegisterLogin from "../StyledButtonRegirsterLogin/StyledButtonRegirsterLOgin";
import StyledSpanRegisterLogin from "../StyledSpanRegisterLogin/StyledSpanRegirsterLogin";
import StyledHrefRegisterLogin from "../StyledHrefRegisterLogin/StyledHrefRegisterLogin";

const LabelWrapper = styled.label`
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  margin-top: 1rem;
  font-family: "Nunito", sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
`;

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <SectionWrapper>
      <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
        {errMsg}
      </ParagraphError>
      <h1>Log In</h1>
      <FormWrapperRegisterLogin onSubmit={handleSubmit}>
        <LabelWrapper htmlFor="email">Email:</LabelWrapper>
        <StyledInput
          type="email"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <LabelWrapper htmlFor="password">Password:</LabelWrapper>
        <StyledInput
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <StyledButtonRegisterLogin>Log in</StyledButtonRegisterLogin>
      </FormWrapperRegisterLogin>
      <p>
        Need account?
        <br />
        <StyledSpanRegisterLogin className="line">
          {/*put router link here*/}
          <StyledHrefRegisterLogin href="#">Sign In</StyledHrefRegisterLogin>
        </StyledSpanRegisterLogin>
      </p>
    </SectionWrapper>
  );
};

export default Login;
