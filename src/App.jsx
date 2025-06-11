import styled from "styled-components";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Unauthorized from "./components/Unauthorized/Unauthorized.jsx";
import LinkPage from "./components/LinkPage/LinkPage.jsx";
import Missing from "./components/Missing/Missing.jsx";
import Home from "./components/Home/Home.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          {/* catch all */}
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
