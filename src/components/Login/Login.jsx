import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import ParagraphError from "../ParagraphErrorFrom/ParagraphErrorFrom";
import FormWrapperRegisterLogin from "../FormWrapperRegisterLogin/FormWrapperRegisterLogin";
import StyledButtonRegisterLogin from "../StyledButtonRegirsterLogin/StyledButtonRegirsterLOgin";
import StyledSpanRegisterLogin from "../StyledSpanRegisterLogin/StyledSpanRegirsterLogin";
import StyledHrefRegisterLogin from "../StyledHrefRegisterLogin/StyledHrefRegisterLogin";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

const LOGIN_URL = "http://localhost:3700/api/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3700/api/auth/login",
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3700/api/auth/login",
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      //const roles = response?.data?.roles;
      //   console.log(roles);
      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log(err);

        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
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
