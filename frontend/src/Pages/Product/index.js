import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Shop from "../../Components/Product/Shop";

const Product = () => {
  const [keyword, setKeyword] = useState(null);
  useEffect(() => {
    document.title = "Juncoffee - Product";
  }, []);

  return (
    <>
      <Header setKeyword={setKeyword} />
      <Shop keyword={keyword} setKeyword={setKeyword} />
      <Footer />
    </>
  );
};
export default Product;
