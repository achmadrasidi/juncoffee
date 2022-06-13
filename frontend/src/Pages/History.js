import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { userHistory } from "../Redux/Actions/UserAction";
import HistorySection from "../Components/History/HistorySection";
import { useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Juncoffee - History";
    dispatch(userHistory());
  }, [dispatch]);

  return (
    <>
      <Header />
      <HistorySection />
      <Footer />
    </>
  );
};

export default History;
