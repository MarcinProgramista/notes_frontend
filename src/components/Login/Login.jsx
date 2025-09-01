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

import WrapperSeparator from "../Separator";
import Wrapper from "../ui/Wrapper";
import API_CONFIG from "../../config/api";

const LabelWrapper = styled.label`
  margin-top: 1rem;
`;
const StyledHeader = styled.h1`
  color: hsl(60, 9.1%, 97.8%);
  text-align: center;
  margin-block: 0.67em;
  font-size: 2em;
`;

const SyledParagraph = styled.p`
  color: hsl(24, 5.4%, 63.9%);
  text-align: center;
  font-size: 16px;
`;
const StyledInput = styled.input`
  margin-top: 1rem;
  font-family: "Nunito", sans-serif;

  //font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
  display: flex;
  width: 100%;
  border: 2px solid hsl(39, 89%, 67%);
  border-width: 0px;
  background: hsl(0, 0%, 20%);
  color: #fff;
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px hsl(39, 89%, 67%);
    background: hsl(0, 0%, 20%);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &::placeholder {
    color: hsl(39, 89%, 67%);
  }
`;

const LOGIN_URL = "http://localhost:3700/api/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const controller = new AbortController();
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN}`,
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          signal: controller.signal,
        }
      );
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      //const roles = response?.data?.roles;
      //   console.log(roles);
      setId(JSON.stringify(response?.data.user_id));
      setAuth({
        id: JSON.stringify(response?.data.user_id),
        email,
        pwd,
        accessToken,
      });
      setEmail("");
      setPwd("");
      controller.abort();
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
    <Wrapper>
      <SectionWrapper>
        <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
          {errMsg}
        </ParagraphError>
        <StyledHeader>Log In</StyledHeader>
        <SyledParagraph>Log in using your email and password</SyledParagraph>
        <WrapperSeparator />
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
            placeholder="name@example.com"
          />
          <LabelWrapper htmlFor="password">Password:</LabelWrapper>
          <StyledInput
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="put password"
          />
          <StyledButtonRegisterLogin>Log in</StyledButtonRegisterLogin>
        </FormWrapperRegisterLogin>
        <p>
          Need account?
          <br />
          <StyledSpanRegisterLogin className="line">
            {/*put router link here*/}
            <StyledHrefRegisterLogin href="/register">
              Register
            </StyledHrefRegisterLogin>
          </StyledSpanRegisterLogin>
        </p>
      </SectionWrapper>
    </Wrapper>
  );
};
export default Login;
