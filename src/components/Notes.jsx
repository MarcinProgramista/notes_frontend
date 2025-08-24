import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import StyledRemovedNoteButton from "./StyledRemovedNoteButton/StyledRemovedNoteButton";

import plusIcon from "../assets/plus-svgrepo-com.png";
import ButtonIconPlus from "./ButtonIconPlus/ButtonIconPlus";

import NewNoteItem from "./NewNoteItem/NewNoteItem";

const StyledTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;

  text-align: start;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  //height: 50px;
  font-family: "Montserrat", sans-serif;
  background-color: hsl(0, 0%, 10%);
  //margin-bottom: 1px;

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
const WrpperButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //margin: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding-right: 2rem /* 32px */;
  padding-left: 2rem /* 32px */;
  padding-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;
  position: relative;
`;

const NotesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem /* 16px */;
`;

const WrapperCard = styled.div`
  width: 300px;
  text-align: center;
`;

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

const StyledParagraph = styled.div`
  font-size: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem /* 32px */;
  //margin-left: 1rem /* 32px */;
  margin-bottom: 10px;

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

const StyledParagraphInfo = styled.p`
  font-size: 17px;
  text-align: center;
  margin-bottom: 700px;

  //margin-left: 1rem /* 32px */;
  margin-bottom: 10px;

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
const StyledButtonIcon = styled(ButtonIconPlus)`
  position: fixed;
  bottom: 40px;

  right: 100px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  background-size: 35%;
  border-radius: 50px;
  z-index: 10000;
`;
const Notes = ({}) => {
  const [notes, setNotes] = useState();
  const [buttonShown, setButtonShown] = useState(false);
  const user_id = useOutletContext();
  const params = useParams();
  const category_id = params.category_id;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  //console.log(user_id);

  const categoryName = location.pathname.slice(
    location.pathname.length - 5,
    location.pathname.length
  );
  const formatDate = (note) => {
    const reg = /([0-9]{2})-([0-9]{2})-([0-9]{4})/;
    return note.created.replace(reg, "$1.#2.#3");
  };

  function toggle() {
    setButtonShown((buttonShown) => !buttonShown);
  }

  function handleSubmitNote(note) {
    fetch(`http://localhost:3700/api/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setNotes((prevNote) => [...prevNote, res]);
        setButtonShown(false);
        return redirect(`/notes/${Number(res.category_id)}/note/${res.id}`);
      })

      .catch((err) => console.log(err));
  }
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get(`/api/notes/${category_id}`, {
          signal: controller.signal,
        });

        isMounted && setNotes(response.data);
        setButtonShown(false);
        controller.abort();
      } catch (err) {
        //console.log(err);
        Navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getNotes();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [category_id]);
  //console.log(notes);
  return (
    <>
      {" "}
      {notes?.length > 0 && (
        <h4>
          <StyledParagraphInfo $category={categoryName}>
            Number of {categoryName}: {notes.length}
          </StyledParagraphInfo>
        </h4>
      )}
      <Wrapper>
        <NotesList>
          {notes?.length > 0 ? (
            notes.map((note) => (
              <WrpperButtons>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`${location.pathname}/note/${note.id}`}
                  key={note.id}
                >
                  <WrapperCard key={note.id}>
                    <StyledTitle $category={categoryName}>
                      {note.title}
                    </StyledTitle>
                    {note?.link && (
                      <StyledAvatar src={note.link} $category={categoryName} />
                    )}
                    <StyledParagraph $category={categoryName}>
                      Created :{" "}
                      <p>
                        {note.created.length === 10
                          ? formatDate(note)
                          : new Date(note.created).toLocaleDateString()}
                      </p>
                    </StyledParagraph>
                    <StyledRemovedNoteButton $category={categoryName}>
                      more details
                    </StyledRemovedNoteButton>
                  </WrapperCard>
                </NavLink>
                <StyledRemovedNoteButton $category={categoryName}>
                  Remove
                </StyledRemovedNoteButton>
              </WrpperButtons>
            ))
          ) : (
            <StyledTitle>No notes found this category.</StyledTitle>
          )}
        </NotesList>
        <StyledButtonIcon
          $icon={plusIcon}
          $category={categoryName}
          onClick={toggle}
        ></StyledButtonIcon>
      </Wrapper>
      {buttonShown && (
        <NewNoteItem
          $category={categoryName}
          $buttonShown={buttonShown}
          onNotesSubmit={handleSubmitNote}
        />
      )}
      <Outlet />
    </>
  );
};

export default Notes;
