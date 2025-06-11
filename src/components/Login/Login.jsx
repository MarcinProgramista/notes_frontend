import { useRef, useState, useEffect, useContext } from "react";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  return <div></div>;
};

export default Login;
