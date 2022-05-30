import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("userInfo"));

  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  return children;
};

export const IsLoggedInRoutes = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"));
    setUser(token);
  }, [user]);
  const location = useLocation();
  if (!!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoutes;
