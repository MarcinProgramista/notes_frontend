import { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";

const SectionWrapper = styled.section`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
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

  return <SectionWrapper></SectionWrapper>;
};

export default Login;
