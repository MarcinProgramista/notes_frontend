import styled from "styled-components";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
