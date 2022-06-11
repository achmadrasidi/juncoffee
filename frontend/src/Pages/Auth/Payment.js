import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const Payment = () => {
  const { token } = useParams();
  const user = useSelector((state) => state.persist.userInfo.info.token);
  if (!user) {
    return <Navigate to="/auth/login" replace state={{ message: "Please login to confirm payment" }} />;
  }
  return <Navigate to="/cart" replace state={{ token }} />;
};

export default Payment;
