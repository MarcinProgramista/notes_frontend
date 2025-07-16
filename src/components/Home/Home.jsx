import {
  useNavigate,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styled, { css } from "styled-components";

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
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      color: hsl(196, 83%, 75%);
    `}
   ${({ $category }) =>
    $category === "Books" &&
    css`
      color: hsl(106, 47%, 64%);
    `}
  font-size: 22px;
  &:focus,
  &:hover {
    text-decoration: none;
    ${({ $category }) =>
      $category === "Notes" &&
      css`
        color: #ffd82b;
      `}
    ${({ $category }) =>
      $category === "Films" &&
      css`
        color: hsl(196, 83%, 75%);
      `}
    ${({ $category }) =>
      $category === "Books" &&
      css`
        color: hsl(106, 47%, 64%);
      `}
  }
`;

const StyledCategory = styled.span`
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      color: hsl(196, 83%, 75%);
    `}
    ${({ $category }) =>
    $category === "Books" &&
    css`
      color: hsl(106, 47%, 64%);
    `}
  text-decoration: "";
  font-weight: 600;
  font-size: 22px;
  background-color: "";
  margin: 5px;
  padding: 10px;
  border-radius: 25px;

  ${({ $active, $category }) =>
    $active &&
    $category === "Notes" &&
    css`
      color: black;
      text-decoration: "underline";
      font-size: 24px;
      background-color: #ffd82b;
    `}

  ${({ $active, $category }) =>
    $active &&
    $category === "Books" &&
    css`
      color: black;
      text-decoration: "underline";
      font-size: 24px;
      background-color: hsl(106, 47%, 64%);
    `}

     ${({ $active, $category }) =>
    $active &&
    $category === "Films" &&
    css`
      color: black;
      text-decoration: "underline";
      font-size: 24px;
      background-color: hsl(196, 83%, 75%);
    `}
`;

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const user_id = parseInt(JSON.parse(auth.id));
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const categoryName = location.pathname.slice(
    location.pathname.length - 5,
    location.pathname.length
  );

  //console.log(categoryName);

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
        <StyledLink $category={categoryName} to="/">
          Home
        </StyledLink>
        {categories?.length ? (
          <StyledCategories>
            {categories.map((category, i) => (
              <StyledLink
                key={i}
                style={{ textDecoration: "no ne" }}
                to={`/notes/${category.id}/${category.category}`}
              >
                {({ isActive }) => (
                  <StyledCategory $active={isActive} $category={categoryName}>
                    {category.category}
                  </StyledCategory>
                )}
              </StyledLink>
            ))}
          </StyledCategories>
        ) : (
          <p>No catgories to display</p>
        )}

        <StyledLink $category={categoryName} onClick={logout}>
          Log Out
        </StyledLink>
      </StyledNavbar>

      <button> + </button>
      <Outlet />
    </>
  );
};

export default Home;
