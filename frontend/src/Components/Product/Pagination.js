import React, { useEffect, useState } from "react";
import axios from "axios";

const Pagination = ({ handleData, baseUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(baseUrl);

        const meta = response.data.meta;

        setCurrentPage(meta.currentPage);
        setTotalPage(meta.totalPage);
      } catch (error) {
        setTotalPage(1);
      }
    })();
  }, [baseUrl, totalPage]);

  const nextPageHandler = async () => {
    try {
      let response = await axios.get(`${baseUrl}page=${currentPage + 1}&`);

      const products = response.data.data;
      const meta = response.data.meta;
      setCurrentPage(meta.currentPage);
      setTotalPage(meta.totalPage);
      handleData(products);
      window.scrollTo({ behavior: "smooth", top: "0px" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const prevPageHandler = async () => {
    try {
      let response = await axios.get(`${baseUrl}page=${currentPage - 1}&`);

      const products = response.data.data;
      const meta = response.data.meta;
      setCurrentPage(meta.currentPage);
      setTotalPage(meta.totalPage);
      handleData(products);
      window.scrollTo({ behavior: "smooth", top: "0px" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const changePageHandler = async (e) => {
    const pageNumber = Number(e.target.textContent);
    try {
      let response = await axios.get(`${baseUrl}page=${pageNumber}&`);

      const products = response.data.data;
      const meta = response.data.meta;
      setCurrentPage(meta.currentPage);
      setTotalPage(meta.totalPage);
      handleData(products);
      window.scrollTo({ behavior: "smooth", top: "0px" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / totalPage) * totalPage;
    return new Array(totalPage).fill().map((_, i) => start + i + 1);
  };

  return (
    <>
      <div className="pagination my-3">
        <button onClick={prevPageHandler} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
          prev
        </button>

        {getPaginationGroup().map((item, i) => (
          <button onClick={changePageHandler} key={i} className={`paginationItem ${currentPage === item ? "active" : null}`}>
            <span>{item}</span>
          </button>
        ))}

        <button onClick={nextPageHandler} className={`next ${currentPage === totalPage ? "disabled" : ""}`}>
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
