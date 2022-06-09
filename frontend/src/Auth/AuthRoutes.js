import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.persist.userToken.info);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export const IsLoggedInRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.persist.userToken.info);
  if (!!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;
