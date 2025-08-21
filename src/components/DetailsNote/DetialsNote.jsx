import { useEffect, useState } from "react";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styled, { css } from "styled-components";
import axios from "../../api/axios";
import StyledTitle from "../StyledTitle/StyledTitle";
import StyledRemovedNoteButton from "../StyledRemovedNoteButton/StyledRemovedNoteButton";

const StyledAvatar = styled.img`
  width: 300px;
  height: 350px;
  box-shadow: 0 10px 30px -10px 3px solid #ffd82b; //hsl(60, 9.1%, 97.8%);
  border-radius: 25px;
  position: relative;
  text-align: left;

  margin-bottom: 10px;
  ${({ $category }) =>
    $category === "Notes" &&
    css`
      box-shadow: 0 10px 30px -10px #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      box-shadow: 0 10px 30px -10px hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      box-shadow: 0 10px 30px -10px hsl(106, 47%, 64%);
    `}
`;

const DetialsNote = () => {
  const [note, setNote] = useState();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const note_id = params.id;

  const positionCategoryAndNameCategory = (path) => {
    if (path.includes("Books") > 0) return "Books";
    if (path.includes("Films") > 0) return "Films";
    if (path.includes("Notes") > 0) return "Notes";
    if (path.includes("Notes") < 0) return "Notes";
  };

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/api/notes/note/${note_id}`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setNote(response.data);
        controller.abort();
      } catch (err) {
        //console.log(err);
        //Navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getNote();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  console.log(params);
  return (
    <>
      <StyledTitle
        $big={true}
        $category={positionCategoryAndNameCategory(location.pathname)}
      >
        {note?.title}
      </StyledTitle>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
        fugit minima veritatis dolore, atque illo sequi excepturi fugiat
        deleniti! Autem doloribus quia delectus aspernatur amet quasi, assumenda
        cumque hic culpa.
      </p>

      <StyledRemovedNoteButton
        $category={positionCategoryAndNameCategory(location.pathname)}
      >
        <NavLink
          style={{ textDecoration: "none" }}
          to={`/notes/${params.category_id}/${positionCategoryAndNameCategory(
            location.pathname
          )}`}
        >
          go back
        </NavLink>
      </StyledRemovedNoteButton>
    </>
  );
};

export default DetialsNote;
