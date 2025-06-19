import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";
import { axiosPrivate } from "../api/axios";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const respons = await axios.get(
          "http://localhost:3700/api/auth/refresh_token"
        );
        setToken(respons.data.accessToken);
      } catch {
        setToken(null);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosPrivate.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
    });

    return () => {
      axiosPrivate.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await axiosPrivate.get(
              "http://localhost:3700/api/auth/refresh_token"
            );

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;
            return axiosPrivate(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(refreshInterceptor);
    };
  });
};
