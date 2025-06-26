import { useState, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
  return <div>{category_id}</div>;
};

export default Notes;
