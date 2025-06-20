import { useRef } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const controllerRef = useRef();

  if (controllerRef.current) {
    controllerRef.current.abort();
  }
  controllerRef.current = new AbortController();
  controllerRef.current.abort();
  const refresh = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3700/api/auth/refresh_token",
        {
          withCredentials: true,
          signal: controllerRef.current.signal,
        }
      );
      setAuth((prev) => {
        //console.log(JSON.stringify(prev));
        //console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {}
  };
  return refresh();
};

export default useRefreshToken;
