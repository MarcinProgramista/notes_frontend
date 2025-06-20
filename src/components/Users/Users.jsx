import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Users() {
  const [users, setUsers] = useState();
  const controller = new AbortController();
  const navigate = useNavigate();
  const location = useLocation();
 const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    
  const controller = new AbortController();

    const getUsers = async () => {
      
      try {
        const response = await axiosPrivate.get("", {signal:controller.signal});

        isMounted && setUsers(response.data);
        controller.abort();

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
