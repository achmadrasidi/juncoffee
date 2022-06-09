import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";

const Home = () => {
  const { token } = useSelector((state) => state.persist.userToken.info);

  useEffect(() => {
    document.title = "Juncoffee - Home";
  }, []);

  return (
    <>
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
