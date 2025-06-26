import { useParams } from "react-router-dom";

const Notes = () => {
  const params = useParams();
  const category_id = params.category_id;
  return <div>{category_id}</div>;
};

export default Notes;
