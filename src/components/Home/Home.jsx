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
//import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Books from "../../assets/books-svgrepo-com.png";
import Films from "../../assets/video-svgrepo-com.png";
import Notes from "../../assets/pen-nib-svgrepo-com.png";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import HomeIcon from "../../assets/home-1-svgrepo-com.png";
import LogoutIcon from "../../assets/logout-bracket-svgrepo-com.png";

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
  color: hsl(24, 5.4%, 63.9%);
  text-decoration: none;
  text-align: end;

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
      background-image: url(${({ $icon }) => $icon});
      background-size: 40%;
      background-repeat: no-repeat;
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
      background-image: url(${({ $icon }) => $icon});
      background-size: 40%;
      background-repeat: no-repeat;
    `}
    ${({ $active, $category }) =>
    $active &&
    $category === "Films" &&
    css`
      color: black;
      text-decoration: "underline";
      font-size: 24px;
      background-color: hsl(196, 83%, 75%);
    `};
  ${({ $active, $category }) =>
    $active &&
    $category === "Home" &&
    css`
      color: black;
      text-decoration: "underline";
      font-size: 24px;
      background-color: #ffd82b;
    `};
`;

const StyledParagraph = styled.div`
  font-size: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px /* 32px */;
  //margin-left: 1rem /* 32px */;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 20px;

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
`;

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const user_id = parseInt(JSON.parse(auth.id));
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const positionCategoryAndNameCategory = (path) => {
    if (path.indexOf("Books") > 0) return [path.indexOf("Books"), "Books"];
    if (path.indexOf("Films") > 0) return [path.indexOf("Films"), "Films"];
    if (path.indexOf("Notes") > 0) return [path.indexOf("Notes"), "Notes"];
    if (path.indexOf("Notes") < 0) return [path.indexOf("Notes"), "Notes"];
  };

  const categoryName = positionCategoryAndNameCategory(location.pathname)[1];
  //console.log(user_id);

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
        <StyledParagraph>
          <StyledLink $category={categoryName} to="/">
            {({ isActive }) => (
              <StyledParagraph>
                <ButtonIcon
                  $icon={HomeIcon}
                  $active={isActive}
                  $category="Home"
                ></ButtonIcon>

                <StyledCategory $category="Home" $active={isActive}>
                  Home
                </StyledCategory>
              </StyledParagraph>
            )}
          </StyledLink>
        </StyledParagraph>

        {categories?.length ? (
          <StyledCategories>
            {categories.map((category, i) => (
              <StyledParagraph key={i}>
                <StyledLink
                  key={i}
                  style={{ textDecoration: "no ne" }}
                  to={`/notes/${category.id}/${category.category}`}
                >
                  {({ isActive }) => (
                    <StyledParagraph>
                      {category.category === "Books" && (
                        <ButtonIcon
                          $icon={Books}
                          $active={isActive}
                          $category={categoryName}
                        ></ButtonIcon>
                      )}
                      {category.category === "Notes" && (
                        <ButtonIcon
                          $icon={Notes}
                          $active={isActive}
                          $category={categoryName}
                        ></ButtonIcon>
                      )}
                      {category.category === "Films" && (
                        <ButtonIcon
                          $icon={Films}
                          $active={isActive}
                          $category={categoryName}
                        ></ButtonIcon>
                      )}
                      <StyledCategory
                        $category={categoryName}
                        $active={isActive}
                      >
                        {category.category}
                      </StyledCategory>
                    </StyledParagraph>
                  )}
                </StyledLink>
              </StyledParagraph>
            ))}
          </StyledCategories>
        ) : (
          <p>No catgories to display</p>
        )}

        <StyledParagraph>
          <StyledLink $category={categoryName} onClick={logout}>
            {({ isActive }) => (
              <StyledParagraph>
                <ButtonIcon
                  $icon={LogoutIcon}
                  $active={isActive}
                  $category="Logout"
                ></ButtonIcon>

                <StyledCategory $category="Logout" $active={isActive}>
                  Log Out
                </StyledCategory>
              </StyledParagraph>
            )}
          </StyledLink>
        </StyledParagraph>
      </StyledNavbar>
      <Outlet context={user_id} />
    </>
  );
};

export default Home;
