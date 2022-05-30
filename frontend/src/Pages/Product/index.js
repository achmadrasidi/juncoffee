import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Shop from "../../Components/Product/Shop";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    document.title = "Juncoffee - Product";
    searchParams.delete("keyword");
    searchParams.delete("category");
    setSearchParams(searchParams);
  }, []);

  return (
    <>
      <Header setSearchParams={setSearchParams} />
      <Shop searchParams={searchParams} setSearchParams={setSearchParams} />
      <Footer />
    </>
  );
};
export default Product;
