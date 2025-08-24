import {
  useLocation,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthProvider";
import { useContext, useState } from "react";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
