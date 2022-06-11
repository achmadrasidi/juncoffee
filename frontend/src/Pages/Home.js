import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Banner from "../Components/Home/Banner";
import Description from "../Components/Home/Description";
import Favorite from "../Components/Home/Favorite";
import Navigation from "../Components/Home/Navigation";
import Partner from "../Components/Home/Partner";
import Promo from "../Components/Home/Promo";
import Store from "../Components/Home/Store";
import Testimony from "../Components/Home/Testimony";
import Header from "../Components/Header";
import Slideshow from "../Components/Home/Slideshow";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/SubComponent/Message";
import { resetState } from "../Redux/Actions/UserAction";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [msg, setMsg] = useState(null);
  const { token } = useSelector((st) => st.persist.userInfo.info);
  const { message } = useSelector((st) => st.userLogin);
  const dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    setMsg(null);
    if (message) {
      setMsg(message);
      setShowMessage(true);
    }
    if (state && state.message) {
      setMsg(state.message);
      setShowMessage(true);
    }

    (() => {
      window.history.replaceState({}, { ...state });
    })();

    document.title = "Juncoffee - Home";
  }, [dispatch, msg, state]);

  return (
    <>
      <Message
        show={showMessage}
        onHide={() => {
          dispatch(resetState());
          setShowMessage(false);
        }}
        message={msg}
      />
      {token ? <Header /> : <Navigation />}
      <Slideshow />
      <Banner />
      <Description />
      <Favorite />
      <Store />
      <Partner />
      <Testimony />
      <Promo />
      <Footer />
    </>
  );
};

export default Home;
