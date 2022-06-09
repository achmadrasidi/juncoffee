import React from "react";
import { Navigate, useParams } from "react-router-dom";

const EmailConfirm = () => {
  const { token } = useParams();
  return <Navigate to="/auth/login" replace state={{ token }} />;
};

export default EmailConfirm;
