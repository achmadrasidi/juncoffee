import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { SortDown, SortUp } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productList } from "../../../Redux/Actions/ProductAction";
import Loading from "../../SubComponent/Loading";
import Pagination from "./Pagination";

const ItemsAdmin = ({ category, favorite, pageUrl, setPageUrl }) => {
  const [sortValue, setSortValue] = useState("");
  const [order, setOrder] = useState("Order by");
  const [_, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, error, loading } = useSelector((st) => st.productList);
  const { keyword } = useSelector((st) => st.searchKeyword);
  const { data } = list;

  let baseUrl = `${process.env.REACT_APP_API}/product?`;

  if (favorite) {
    baseUrl = `${process.env.REACT_APP_API}/product/favourite?`;
  }
  if (!!keyword) {
    baseUrl += `keyword=${keyword}&`;
  }

  if (!!category && category !== "Add-on") {
    baseUrl += `category=${category}&`;
  }
  if (!!pageUrl) {
    baseUrl += pageUrl;
  }

  switch (sortValue) {
    case "asc":
      baseUrl += "order=asc&sort=price&";
      break;
    case "desc":
      baseUrl += "order=desc&sort=price&";
      break;
    default:
      break;
  }

  useEffect(() => {
    let paramsUrl = baseUrl.split("?")[1];
    if (favorite) {
      paramsUrl = baseUrl.split("product/")[1].replace("favourite", "category=favourite").replace("?", "&");
    }

    setSearchParams(paramsUrl);
    dispatch(productList(baseUrl));

    if (error) {
      setPageUrl(null);
    }
  }, [baseUrl, pageUrl]);

  const handleSortDown = () => {
    setSortValue("asc");
  };
  const handleSortUp = () => {
    setSortValue("desc");
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-2 p-0 d-flex gap-2">
          {sortValue === "desc" ? <SortDown className="sort-icon" size={40} onClick={handleSortDown}></SortDown> : <SortUp className="sort-icon" size={40} onClick={handleSortUp}></SortUp>}{" "}
          <DropdownButton variant={"secondary"} className="dropdown-sort" title={order}>
            <Dropdown.Item eventKey="1" onClick={() => setOrder("Date")}>
              {"Date"}
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setOrder("Price")}>
              {"Price"}
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {loading ? (
        <Loading show={true} onHide={false} />
      ) : error ? (
        <h1 className="text-center my-5 py-5">{error}</h1>
      ) : (
        <>
          <div className="row fav-product mt-0  p-0" id="fav-prod-mobile-res">
            {data.map((product, i) => (
              <div className="col-md-3 my-5" key={i}>
                <div className="card card-fav-product-admin-layout h-100">
                  <div className="card-body text-center d-grid" id="card-body-res">
                    <img src={`${process.env.REACT_APP_API}${product.image}`} className="product-card-image" alt="" />
                    <h2
                      className="fav-product-title"
                      onClick={() => {
                        navigate(`/product/${product.id}`, { replace: true });
                      }}
                    >
                      {product.name}
                    </h2>
                    <p className="fav-product-price-admin">IDR {product.price.split("Rp")[1]}</p>
                    <img src={require("../../../assets/img/pencil.png")} className="pencil-style" width={25} height={25} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination setPageUrl={setPageUrl} />
          <div class="row my-5">
            <div class="col-md-12">
              <button className="add-new-prod" onClick={() => navigate("/product/add-product")}>
                Add new product
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemsAdmin;
