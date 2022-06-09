import React from "react";
import { Navigate, useParams } from "react-router-dom";

const Payment = () => {
  const { token } = useParams();
  return <Navigate to="/cart" replace state={{ token }} />;
};

export default Payment;
