import { useNavigate, Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styled from "styled-components";

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem /* 32px */;
  padding-left: 2rem /* 32px */;
  padding-right: 2rem /* 32px */;
  padding-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;
`;

const StyledCategories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem /* 32px */;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: hsl(60, 9.1%, 97.8%);
  &:focus,
  &:hover {
    text-decoration: none;
    color: hsl(60, 9.1%, 97.8%);
  }
`;

const StyledCategory = styled.span`
  color: ${({ $active }) => ($active ? "black" : "hsl(60, 9.1%, 97.8%)")};
  text-decoration: ${({ $active }) => ($active ? "underline" : "")};
  font-weight: 600;
  font-size: ${({ $active }) => ($active ? "24px" : "22px")};
  background-color: ${({ $active }) => ($active ? "hsl(60, 9.1%, 97.8%)" : "")};
  margin: 5px;
  padding: 10px;
  border-radius: 25px;
`;
const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const user_id = parseInt(JSON.parse(auth.id));
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getCategires = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/categories/user/${user_id}`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setCategories(response.data);
        controller.abort();
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getCategires();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user_id]);

  const logout = () => {
    setAuth({});
    axios.delete(`http://localhost:3700/api/auth/logout`, {
      withCredentials: true,
    });
    navigate("/linkpage");
  };

  return (
    <>
      <StyledNavbar>
        <StyledLink to="/">Home</StyledLink>
        {categories?.length ? (
          <StyledCategories>
            {categories.map((category, i) => (
              <StyledLink
                key={i}
                style={{ textDecoration: "no ne" }}
                to={`/notes/${category.id}`}
              >
                {({ isActive }) => (
                  <StyledCategory $active={isActive}>
                    {" "}
                    {category.category}
                  </StyledCategory>
                )}
              </StyledLink>
            ))}
          </StyledCategories>
        ) : (
          <p>No catgories to display</p>
        )}

        <StyledLink onClick={logout}>Log Out</StyledLink>
      </StyledNavbar>

      <button> ➕ Add note</button>
      <Outlet />
    </>
  );
};

export default Home;
