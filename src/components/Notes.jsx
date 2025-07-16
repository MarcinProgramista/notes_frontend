import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import StyledRemovedNoteButton from "./StyledRemovedNoteButton/StyledRemovedNoteButton";

const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding-right: 2rem /* 32px */;
  padding-left: 2rem /* 32px */;
  padding-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;
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
const StyledTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #ffd82b; //hsl(60, 9.1%, 97.8%);
  text-align: center;
  font-family: "Nunito", sans-serif;
  margin-bottom: 10px;
`;

const StyledAvatar = styled.img`
  width: 300px;
  height: 350px;
  border: 3px solid #ffd82b; //hsl(60, 9.1%, 97.8%);
  border-radius: 25px;
  position: relative;
  text-align: left;

  margin-bottom: 10px;
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
`;

const Notes = () => {
  const [notes, setNotes] = useState();
  const params = useParams();
  const category_id = params.category_id;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const formatDate = (note) => {
    const reg = /([0-9]{2})-([0-9]{2})-([0-9]{4})/;
    return note.created.replace(reg, "$1.#2.#3");
  };

  //console.log(location.pathname.slice(10, 15));

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await axiosPrivate.get(`/api/notes/${category_id}`, {
          signal: controller.signal,
        });

        isMounted && setNotes(response.data);
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
  // console.log(notes);
  return (
    <Wrapper>
      <NotesList>
        {notes?.length > 0 ? (
          notes.map((note) => (
            <WrapperCard key={note.id}>
              <StyledTitle>{note.title}</StyledTitle>
              <StyledAvatar src={note.link} />
              <StyledParagraph>
                Created :{" "}
                <p>
                  {note.created.length === 10
                    ? formatDate(note)
                    : new Date(note.created).toLocaleDateString()}
                </p>
              </StyledParagraph>
              <StyledRemovedNoteButton>Remove</StyledRemovedNoteButton>
            </WrapperCard>
          ))
        ) : (
          <StyledTitle>No notes found this category.</StyledTitle>
        )}
      </NotesList>
    </Wrapper>
  );
};

export default Notes;
