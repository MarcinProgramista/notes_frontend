import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Users from "../Users/Users";
import axios from "axios";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const logout = () => {
    setAuth({});
    axios.delete(`http://localhost:3700/api/auth/logout`, {
      withCredentials: true,
    });
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <Link style={{ textDecoration: "none", color: "#fff" }} to="/linkpage">
        LLink
      </Link>
      <Users />
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
