import axios from "axios";
import React, { useEffect, useState } from "react";
import { SortDown, SortUp } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Items = ({ keyword, category, favorite }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("");

  const navigate = useNavigate();

  let baseUrl = `http://localhost:5000/product?`;

  if (favorite) {
    baseUrl = `http://localhost:5000/product/favourite?`;
  }
  if (!!keyword) {
    baseUrl += `keyword=${keyword}&`;
  }
  if (!!category && category !== "Add-on") {
    baseUrl += `category=${category}&`;
  }

  switch (sortValue) {
    case "asc":
      baseUrl += "order=asc&sort=price&";
      break;
    case "desc":
      baseUrl += "order=desc&sort=price&";
      break;
    default:
      baseUrl = baseUrl;
  }

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        let response = await axios.get(baseUrl);

        const products = response.data.data;

        setData(products);
      } catch (error) {
        setError(error.response.data.error);
      }
    })();
  }, [baseUrl]);

  const handleData = (pageData) => {
    setData(pageData);
  };

  const handleSortDown = () => {
    setSortValue("asc");
  };
  const handleSortUp = () => {
    setSortValue("desc");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 p-0">{sortValue === "desc" ? <SortDown className="sort-icon" size={40} onClick={handleSortDown}></SortDown> : <SortUp className="sort-icon" size={40} onClick={handleSortUp}></SortUp>}</div>
      </div>

      {error ? (
        <h1 className="text-center my-5 py-5">{error}</h1>
      ) : (
        <div className="row fav-product mt-0  p-0" id="fav-prod-mobile-res">
          {data.map((product, i) => (
            <div className="col-md-3 my-5" key={i}>
              <div
                className="card card-fav-product-layout h-100"
                onClick={() => {
                  navigate(`/product/${product.id}`, { replace: true });
                }}
              >
                <div className="card-body text-center d-grid" id="card-body-res">
                  <img src={`http://localhost:5000${product.image}`} className="product-card-image" alt="" />
                  <h2 className="fav-product-title">{product.name}</h2>
                  <p className="fav-product-price">IDR {product.price.split("Rp")[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination handleData={handleData} baseUrl={baseUrl} />
    </>
  );
};

export default Items;
