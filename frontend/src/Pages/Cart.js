import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CartSection from "../Components/Cart/CartSection";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Cart = () => {
  const user = useSelector((st) => st.persist.userToken.info);

  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Juncoffee - Cart";

    if (state && state.token) {
      const { token } = state;
      (async () => {
        try {
          const result = await axios.get(`http://localhost:5000/auth/payment/${token}`, { headers: { Authorization: `Bearer ${user.token}` } });
        } catch (err) {}
      })();
    }
  }, []);

  return (
    <>
      <Header />
      <CartSection />
      <Footer />
    </>
  );
};

export default Cart;
