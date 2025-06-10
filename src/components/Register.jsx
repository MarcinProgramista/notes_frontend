import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import styled, { css } from "styled-components";

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

const ParagraphError = styled.p`
  position: ${({ $errMsg }) => ($errMsg ? "" : "absolute")};
  left: ${({ $errMsg }) => ($errMsg ? "" : "-9999px")};
  background-color: ${({ $errMsg }) => ($errMsg ? "lightpink" : "")};
  color: ${({ $errMsg }) => ($errMsg ? "firebrick" : "")};
  font-weight: ${({ $errMsg }) => ($errMsg ? "bold" : "")};
  padding: ${({ $errMsg }) => ($errMsg ? "0.5rem" : "")};
  margin-bottom: ${({ $errMsg }) => ($errMsg ? "0.5rem" : "")};
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
`;

const LabelWrapper = styled.label`
  margin-top: 1rem;
`;

const StyledFontAwesomeIconHideName = styled(FontAwesomeIcon)`
  color: ${({ $validName }) => ($validName ? "limegreen" : "")};
  margin-left: ${({ $validName }) => ($validName ? "0.25rem" : "")};
  display: ${({ $validName }) => ($validName ? "" : "none")};
`;

const StyledFontAwesomeIconInvalidName = styled(FontAwesomeIcon)`
  display: ${({ $validName, $user }) => ($validName || !$user ? "none" : "")};
  color: ${({ $validName, $user }) => ($validName || !$user ? "" : "red")};
  margin-left: ${({ $validName, $user }) =>
    $validName || !$user ? "0.25rem" : ""};
`;

const StyledInput = styled.input`
  margin-top: 1rem;
  font-family: "Nunito", sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
`;

const ParagraphUser = styled.p`
  position: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "relative" : "absolute"};
  left: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "" : "9999px"};
  font-size: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "0.75rem" : ""};
  border-radius: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "0.5rem" : ""};
  background: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "#000" : ""};
  color: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "#fff" : ""};
  padding: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "0.25rem" : ""};
  bottom: ${({ $validName, $user, $userFocus }) =>
    $userFocus && $user && !$validName ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

const StyledFontAwesomeIconHideEmail = styled(FontAwesomeIcon)`
  color: ${({ $validEmail }) => ($validEmail ? "limegreen" : "")};
  margin-left: ${({ $validEmail }) => ($validEmail ? "0.25rem" : "")};
  display: ${({ $validEmail }) => ($validEmail ? "" : "none")};
`;

const StyledFontAwesomeIconInvalidEmail = styled(FontAwesomeIcon)`
  display: ${({ $validEmail, $email }) =>
    $validEmail || !$email ? "none" : ""};
  color: ${({ $validEmail, $email }) => ($validEmail || !$email ? "" : "red")};
  margin-left: ${({ $validEmail, $email }) =>
    $validEmail || !$email ? "0.25rem" : ""};
`;

const ParagraphEmail = styled.p`
  position: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "relative" : "absolute"};
  left: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "" : "9999px"};
  font-size: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.75rem" : ""};
  border-radius: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.5rem" : ""};
  background: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "#000" : ""};
  color: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "#fff" : ""};
  padding: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "0.25rem" : ""};
  bottom: ${({ $validEmail, $email, $emailFocus }) =>
    $emailFocus && $email && !$validEmail ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Register() {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setvalidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <>
      {success ? (
        <SectionWrapper>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
            {errMsg}
          </ParagraphError>
          <h1>Register</h1>
          <FormWrapper>
            <LabelWrapper htmlFor="username">
              Username:
              <StyledFontAwesomeIconHideName
                icon={faCheck}
                $validName={validName}
              />
              <StyledFontAwesomeIconInvalidName
                icon={faTimes}
                $validName={validName}
                $user={user}
              />
            </LabelWrapper>
            <StyledInput
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <ParagraphUser
              id="uidnote"
              $userFocus={userFocus}
              $user={user}
              $validName={validName}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </ParagraphUser>
            <LabelWrapper htmlFor="email">
              Email:
              <StyledFontAwesomeIconHideEmail
                icon={faCheck}
                $validEmail={validEmail}
              />
              <StyledFontAwesomeIconInvalidEmail
                icon={faTimes}
                $validEmail={validEmail}
                $email={email}
              />
            </LabelWrapper>
            <StyledInput
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <ParagraphEmail
              id="uidnote"
              $emailFocus={emailFocus}
              $email={email}
              $validEmail={validEmail}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              username part of the email, allowing alphanumeric characters and
              some special characters like ., _, %, +, and -.
              <br />
              Must have "@" symbol that separates the username from the domain.
              <br />
              Must begin with a letter.
              <br />
              Domain part, allowing letters, digits, dots, and hyphens
              <br />
              top-level domain (TLD), which must consist of at least 2
              alphabetic characters.
            </ParagraphEmail>
          </FormWrapper>
        </SectionWrapper>
      )}
    </>
  );
}

export default Register;
