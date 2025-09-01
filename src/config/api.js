const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3700",
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/register",
    REFRESH_TOKEN: "/api/auth/refresh_token",
    NOTES: "/api/notes",
    CATEGORIES: "/api/categories",
  },
};

export default API_CONFIG;
