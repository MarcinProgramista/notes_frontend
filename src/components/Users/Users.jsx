import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios";

function Users() {
  const [users, setUsers] = useState();
  const controller = new AbortController();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users", {signal:controller.signal});

        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <>
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.name}</li>
            ))}
          </ul>
          <h2>Public</h2>
        </>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
