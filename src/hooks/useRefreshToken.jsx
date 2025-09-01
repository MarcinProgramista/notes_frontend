import { useRef } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import API_CONFIG from "../config/api";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const controller = new AbortController();

    try {
      const response = await axios.get(
        API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.REFRESH_TOKEN,
        {
          withCredentials: true,
          signal: controller.signal,
        }
      );

      setAuth((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error("Token refresh failed:", error);
      }
      throw error;
    }
  };

  return refresh;
};
export default useRefreshToken;
