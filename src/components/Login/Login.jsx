import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import ParagraphError from "../ParagraphErrorFrom/ParagraphErrorFrom";

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
    </SectionWrapper>
  );
};

export default Login;
