import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";

import LinkPage from "./components/LinkPage/LinkPage.jsx";
import Missing from "./components/Missing/Missing.jsx";
import Home from "./components/Home/Home.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";
import Notes from "./components/Notes.jsx";
import { GlobalStyle } from "./theme/GlobalStyle.js";

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}>
              <Route path="/notes/:category_id/Books" element={<Notes />} />
              <Route path="/notes/:category_id/Films" element={<Notes />} />
              <Route path="/notes/:category_id/Notes" element={<Notes />} />
              <Route
                path="/notes/:category_id/Books/note/:id"
                element={<h1>hell</h1>}
              />
            </Route>
          </Route>
          <Route path="*" element={<Missing />} />\{" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
