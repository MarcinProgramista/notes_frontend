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

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 14%, 0.4);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  width: 95%;
  margin: 20px;

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

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;

  border-radius: 20px;

  :first-of-type {
    z-index: 999;
  }

  ${({ $flex }) =>
    $flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: black;
    `}
  ${({ $row }) =>
    $row &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      //justify-content: space-between;
      gap: 6rem /* 32px */;
      padding-left: 2rem /* 32px */;
      padding-right: 2rem /* 32px */;
      padding-top: 1rem /* 16px */;
      padding-bottom: 1rem /* 16px */;
    `}

    ${({ $category }) =>
    $category === "Notes" &&
    css`
      background-color: #ffd82b;
    `}
  ${({ $category }) =>
    $category === "Films" &&
    css`
      background-color: hsl(196, 83%, 75%);
    `}
  ${({ $category }) =>
    $category === "Books" &&
    css`
      background-color: hsl(106, 47%, 64%);
    `}
`;

const StyledHeading = styled.h1`
  margin: 5px 0 0;
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
`;
const DateInfo = styled.p`
  margin: 0 0 10px;
  font-weight: 600;
  color: black;
  font-size: 0.8rem;
`;

const StyledCommentNotes = styled.i`
  max-width: 700px;
  position: relative;
  left: 0px;
  font-size: 1.2rem;
  color: #242424;

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
  function CDate(note) {
    if (typeof note?.created === "string") {
      const date = new Date(note?.created);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return day + "." + month + "." + year;
    }
  }
  //console.log(params);
  return (
    <>
      <StyledWrapper
        $category={positionCategoryAndNameCategory(location.pathname)}
      >
        {" "}
        <InnerWrapper
          $category={positionCategoryAndNameCategory(location.pathname)}
        >
          <StyledHeading>{note?.title}</StyledHeading>
          <DateInfo>{CDate(note)}</DateInfo>
        </InnerWrapper>
        <InnerWrapper $flex>
          <InnerWrapper $row>
            {positionCategoryAndNameCategory(location.pathname) === "Films" && (
              <StyledAvatar src={note?.link} />
            )}
            {positionCategoryAndNameCategory(location.pathname) === "Books" && (
              <StyledAvatar src={note?.link} />
            )}
            {positionCategoryAndNameCategory(location.pathname) !== "Films" &&
            positionCategoryAndNameCategory(location.pathname) !== "Books" ? (
              <StyledCommentNotes
                $category={positionCategoryAndNameCategory(location.pathname)}
              >
                {note?.content}{" "}
              </StyledCommentNotes>
            ) : (
              <StyledCommentNotes
                $category={positionCategoryAndNameCategory(location.pathname)}
              >
                {note?.content}{" "}
              </StyledCommentNotes>
              // <StyledComment>{note.content}</StyledComment> <h1>
            )}
          </InnerWrapper>
          <StyledRemovedNoteButton
            $category={positionCategoryAndNameCategory(location.pathname)}
          >
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/notes/${
                params.category_id
              }/${positionCategoryAndNameCategory(location.pathname)}`}
            >
              go back
            </NavLink>
          </StyledRemovedNoteButton>
        </InnerWrapper>
      </StyledWrapper>
    </>
  );
};

export default DetialsNote;
