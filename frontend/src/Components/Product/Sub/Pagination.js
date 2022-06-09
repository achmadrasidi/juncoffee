import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({ setPageUrl }) => {
  const { list } = useSelector((state) => state.productList);
  const { meta } = list;
  const { currentPage, totalPage } = meta;
  const getPaginationGroup = () => {
    let start = currentPage || totalPage ? Math.floor((currentPage - 1) / totalPage) * totalPage : 1;
    return new Array(totalPage).fill().map((_, i) => start + i + 1);
  };
  const nextPageHandler = () => {
    setPageUrl(`page=${currentPage + 1}&`);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };
  const prevPageHandler = () => {
    setPageUrl(`page=${currentPage - 1}&`);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };
  const changePageHandler = (e) => {
    const pageNumber = Number(e.target.textContent);
    setPageUrl(`page=${pageNumber}&`);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };
  return (
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
  );
};

export default Pagination;
