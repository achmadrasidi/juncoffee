import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Shop from "../../Components/Product/Shop";
import ShopAdmin from "../../Components/Product/ShopAdmin";

const Product = () => {
  const { role } = useSelector((state) => state.persist.userInfo.info);
  useEffect(() => {
    document.title = "Juncoffee - Product";
  }, []);

  return (
    <>
      <Header />
      {role === "admin" ? <ShopAdmin /> : <Shop />}
      <Footer />
    </>
  );
};
export default Product;
