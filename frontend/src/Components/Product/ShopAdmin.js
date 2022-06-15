import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeKeyword } from "../../Redux/Actions/SearchActions";

import ItemsAdmin from "./Sub/ItemsAdmin";

const ShopAdmin = () => {
  const [favorite, setFavorite] = useState(false);
  const [category, setCategory] = useState(null);
  const [pageUrl, setPageUrl] = useState(null);
  const [promo, setPromo] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API}/promo`);
        setPromo(result.data.data[0]);
      } catch (err) {
        setError(err.respose ? err.response.data.error : err.message);
      }
    })();
  }, []);

  return (
    <section className="product-section">
      <div className="container-fluid">
        <div className="row p-0">
          <div className="col-md-4 text-center product-promo-col">
            <div className="row mt-5">
              <h2 className="promo-title-product">Promo for you</h2>
              <p className="promo-desc-product mt-5">
                Coupons will be updated every weeks. <br />
                Check them out!
              </p>
            </div>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                {" "}
                <div className="row mt-3">
                  <div className="card card-back-brown" id="card-back-brown-res">
                    <div className="card card-back-black" id="card-back-black-res">
                      <div className="card card-product-promo-layout" id="card-product-promo-res">
                        <div className="card-body">
                          <img src={require("../../assets/img/pencil.png")} className="pencil-style-promo" width={25} height={25} onClick={() => navigate(`/product/edit-promo/${promo.id}`)} />
                          <div className="row justify-content-center">
                            <img src={promo.image ? `${process.env.REACT_APP_API}${promo.image}` : require("../../assets/img/promo-product-image.png")} className="promo-food-img " alt="" />
                            <h2 className="product-promo-card-title">{promo.name}</h2>
                            <p className="product-promo-card-desc mt-2">{promo.description}</p>
                          </div>
                          <div className="row p-0 mt-3">
                            <div className="border-dot"></div>
                          </div>
                          <div className="row mt-4">
                            <p className="product-promo-card-desc">COUPON CODE</p>
                            <h2 className="coupon-code-text">{promo.coupon_code}</h2>
                            <p className="coupon-code-exp">Valid untill {promo.expired_date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center apply-coupon" id="apply-coupon-res">
                  <button className="apply-coupon-button">Apply Coupon</button>
                </div>
                <div className="row text-start tnc" id="tnc-res">
                  <h5 className="tnc-title">Terms and Condition</h5>
                  <ol className="tnc-items mt-3">
                    <li>You can only apply 1 coupon per day</li>
                    <li className="mt-3">It only for dine in</li>
                    <li className="mt-3">Buy 1 get 1 only for new user</li>
                    <li className="mt-3">Should make member card to apply coupon</li>
                  </ol>
                </div>
              </>
            )}

            <div class="row">
              <div class="col-md-12">
                <button className="add-new-promo" onClick={() => navigate("/product/add-promo")}>
                  Add new promo
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row justify-content-center mt-3">
              <div className="col-md-2">
                <button
                  className={category === "Add-on" ? "nav-link link-text-active" : "nav-link link-text"}
                  aria-current="page"
                  onClick={() => {
                    setFavorite(false);
                    setPageUrl(null);
                    setCategory("Add-on");
                    dispatch(removeKeyword());
                  }}
                >
                  All Products
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className={favorite ? "nav-link link-text-active" : "nav-link link-text"}
                  aria-current="page"
                  onClick={() => {
                    dispatch(removeKeyword());
                    setPageUrl(null);
                    setFavorite(true);
                    setCategory(null);
                  }}
                >
                  Favorite Product
                </button>
              </div>

              <div className="col-md-2 text-center">
                <button
                  className={category === "coffee" ? "nav-link link-text-active" : "nav-link link-text"}
                  aria-current="page"
                  onClick={() => {
                    dispatch(removeKeyword());
                    setPageUrl(null);
                    setCategory("coffee");
                    setFavorite(false);
                  }}
                >
                  Coffee
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className={category === "non-coffee" ? "nav-link link-text-active" : "nav-link link-text"}
                  aria-current="page"
                  onClick={() => {
                    dispatch(removeKeyword());
                    setPageUrl(null);
                    setFavorite(false);
                    setCategory("non-coffee");
                  }}
                >
                  Non-Coffee
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className={category === "foods" ? "nav-link link-text-active" : "nav-link link-text"}
                  aria-current="page"
                  onClick={() => {
                    dispatch(removeKeyword());
                    setPageUrl(null);
                    setFavorite(false);
                    setCategory("foods");
                  }}
                >
                  Foods
                </button>
              </div>
            </div>
            {<ItemsAdmin category={category} favorite={favorite} pageUrl={pageUrl} setPageUrl={setPageUrl} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopAdmin;
