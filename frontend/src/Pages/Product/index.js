import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Shop from "../../Components/Product/Shop";

const Product = () => {
  useEffect(() => {
    document.title = "Juncoffee - Product";
  }, []);

  return (
    <>
      <Header />
      <Shop />
      <Footer />
    </>
  );
};
export default Product;
