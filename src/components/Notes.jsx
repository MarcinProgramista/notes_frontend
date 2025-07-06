import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
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
  width: 320px;
`;

const Notes = () => {
  const [notes, setNotes] = useState();
  const params = useParams();
  const category_id = params.category_id;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

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
  console.log(notes);
  return (
    <Wrapper>
      <NotesList>
        <WrapperCard> {category_id}</WrapperCard>
      </NotesList>
    </Wrapper>
  );
};

export default Notes;
