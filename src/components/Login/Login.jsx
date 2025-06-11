import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import ParagraphError from "../ParagraphErrorFrom/ParagraphErrorFrom";
import FormWrapperRegisterLogin from "../FormWrapperRegisterLogin/FormWrapperRegisterLogin";

const LabelWrapper = styled.label`
  margin-top: 1rem;
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

  return (
    <SectionWrapper>
      <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
        {errMsg}
      </ParagraphError>
      <h1>Sign In</h1>
      <FormWrapperRegisterLogin>
        <LabelWrapper htmlFor="email">Email:</LabelWrapper>
      </FormWrapperRegisterLogin>
    </SectionWrapper>
  );
};

export default Login;
