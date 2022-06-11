import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.persist.userInfo);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace state={{ message: "Please Login First" }} />;
  }
  return children;
};

export const IsLoggedInRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.persist.userInfo.info);

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PrivateRoutes = ({ children }) => {
  const { role } = useSelector((state) => state.persist.userInfo.info);
  if (role !== "admin") {
    return <Navigate to="/" replace state={{ message: "Page for Admin Only" }} />;
  }
  return children;
};

export default ProtectedRoutes;
