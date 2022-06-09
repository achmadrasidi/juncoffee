import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ShopDetail from "../../Components/Product/ShopDetail";

import { productDetail } from "../../Redux/Actions/ProductAction";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Juncoffee - Product Detail";
    window.scrollTo({ behavior: "smooth", top: "0px" });
    dispatch(productDetail(id));
  }, []);

  return (
    <>
      <Header />
      <ShopDetail />
      <Footer />
    </>
  );
};

export default Detail;
