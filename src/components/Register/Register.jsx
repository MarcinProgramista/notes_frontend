import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styled, { css } from "styled-components";
import SectionWrapper from "../SectionWrapperFrom/SectionWrapper";
import ParagraphError from "../ParagraphErrorFrom/ParagraphErrorFrom";
import FormWrapperRegisterLogin from "../FormWrapperRegisterLogin/FormWrapperRegisterLogin";
import StyledButtonRegisterLogin from "../StyledButtonRegirsterLogin/StyledButtonRegirsterLOgin";

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

const StyledFontAwesomeIconHidePassword = styled(FontAwesomeIcon)`
  color: ${({ $validPwd }) => ($validPwd ? "limegreen" : "")};
  margin-left: ${({ $validPwd }) => ($validPwd ? "0.25rem" : "")};
  display: ${({ $validPwd }) => ($validPwd ? "" : "none")};
`;

const StyledFontAwesomeIconInvalidPassword = styled(FontAwesomeIcon)`
  display: ${({ $validPwd, $pwd }) => ($validPwd || !$pwd ? "none" : "")};
  color: ${({ $validPwd, $pwd }) => ($validPwd || !$pwd ? "" : "red")};
  margin-left: ${({ $validPwd, $pwd }) =>
    $validPwd || !$pwd ? "0.25rem" : ""};
`;

const ParagraphPassword = styled.p`
  position: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "relative" : "absolute"};
  left: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "" : "9999px"};
  font-size: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.75rem" : ""};
  border-radius: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.5rem" : ""};
  background: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "#000" : ""};
  color: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "#fff" : ""};
  padding: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "0.25rem" : ""};
  bottom: ${({ $validPwd, $pwdFocus }) =>
    $pwdFocus && !$validPwd ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

const StyledFontAwesomeIconHidePasswordConfirm = styled(FontAwesomeIcon)`
  color: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "limegreen" : ""};
  margin-left: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "0.25rem" : ""};
  display: ${({ $validMatch, $matchPwd }) =>
    $validMatch && $matchPwd ? "" : "none"};
`;

const StyledFontAwesomeIconInvalidPasswordConfirm = styled(FontAwesomeIcon)`
  display: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "none" : ""};
  color: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "" : "red"};
  margin-left: ${({ $validMatch, $matchPwd }) =>
    $validMatch || !$matchPwd ? "0.25rem" : ""};
`;

const ParagraphPasswordConfrim = styled.p`
  position: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "relative" : "absolute"};
  left: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "" : "9999px"};
  font-size: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.75rem" : ""};
  border-radius: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.5rem" : ""};
  background: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "#000" : ""};
  color: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "#fff" : ""};
  padding: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "0.25rem" : ""};
  bottom: ${({ $validMatch, $matchFocus }) =>
    $matchFocus && !$validMatch ? "-10px" : ""};
  svg {
    margin-right: 0.25rem;
  }
`;

const StyledButton = styled.button`
  font-family: "Nunito", sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem;
`;

const StyledSpan = styled.span`
  display: inline-block;
`;

const StyledHref = styled.a`
  color: #fff;
  a:visited {
    color: #fff;
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
  }, [user, pwd, email, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3700/api/register",
        JSON.stringify({
          name: user,
          password: pwd,
          password2: matchPwd,
          email: email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setEmail("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <SectionWrapper>
          <h1>Success!</h1>
          <p>
            <StyledHref href="#">Sign In</StyledHref>
          </p>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
            {errMsg}
          </ParagraphError>
          <h1>Register</h1>
          <FormWrapperRegisterLogin onSubmit={handleSubmit}>
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
            <LabelWrapper htmlFor="password">
              Password:
              <StyledFontAwesomeIconHidePassword
                icon={faCheck}
                $validPwd={validPwd}
              />
              <StyledFontAwesomeIconInvalidPassword
                icon={faTimes}
                $validPwd={validPwd}
                $pwd={pwd}
              />
            </LabelWrapper>
            <StyledInput
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <ParagraphPassword
              id="pwdnote"
              $pwdFocus={pwdFocus}
              $validPwd={validPwd}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </ParagraphPassword>
            <LabelWrapper htmlFor="confirm_pwd">
              Confirm Password:
              <StyledFontAwesomeIconHidePasswordConfirm
                icon={faCheck}
                $validMatch={validMatch}
                $matchPwd={matchPwd}
              />
              <StyledFontAwesomeIconInvalidPasswordConfirm
                icon={faTimes}
                $validMatch={validMatch}
                $matchPwd={matchPwd}
              />
            </LabelWrapper>
            <StyledInput
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <ParagraphPasswordConfrim
              id="confirmnote"
              $matchFocus={matchFocus}
              $validMatch={validMatch}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </ParagraphPasswordConfrim>
            <StyledButtonRegisterLogin
              disabled={
                !validName || !validPwd || !validMatch || !validEmail
                  ? true
                  : false
              }
            >
              Sing up
            </StyledButtonRegisterLogin>
          </FormWrapperRegisterLogin>
          <p>
            Already registered?
            <br />
            <StyledSpan className="line">
              {/*put router link here*/}
              <StyledHref href="#">Sign In</StyledHref>
            </StyledSpan>
          </p>
        </SectionWrapper>
      )}
    </>
  );
}

export default Register;
