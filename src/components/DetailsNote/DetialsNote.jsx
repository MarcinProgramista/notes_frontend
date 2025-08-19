import { useLocation } from "react-router-dom";

const DetialsNote = () => {
  const location = useLocation();

  console.log(location.pathname.indexOf("Books"));

  const positionCategoryAndNameCategory = (path) => {
    if (path.indexOf("Books") > 0) return [path.indexOf("Books"), "Books"];
    if (path.indexOf("Films") > 0) return [path.indexOf("Films"), "Films"];
    if (path.indexOf("") > 0) return [path.indexOf("Notes"), "Notes"];
  };

  return <div>{positionCategoryAndNameCategory(location.pathname)[1]}</div>;
};

export default DetialsNote;
