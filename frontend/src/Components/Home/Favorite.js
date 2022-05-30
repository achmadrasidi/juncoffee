import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/product/favourite?limit=3");
        const data = response.data.data;
        setProducts(data);
      } catch (error) {
        setError(error.response.data.message);
      }
    })();
  }, []);
  return (
    <>
      <section className="favorite">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">Here is People's Favorite</h2>
              <p className="section-desc">Let's choose and have a bit taste of people's favorite. It might be yours too!</p>
            </div>
          </div>

          {error ? (
            <h2 className="text-center fw-bold fs-6">{error}</h2>
          ) : (
            <div className="row card-rows">
              {products.map((product, i) => (
                <div className="col-md-4 card-cols" key={i}>
                  <div className="card card-layout" onClick={() => navigate(`/product/${product.id}`, { replace: true })}>
                    <img src={`http://localhost:5000${product.image}`} className="card-img-top" id="card-img-top-res" alt="hazelnut-img" />
                    <div className="card-body">
                      <h3 className="card-title">{product.name}</h3>
                    </div>
                    <ul className="d-grid gap-3 p-0 m-auto" id="gap-res">
                      <li className="list-item-desc list-item-res">
                        <img src={require("../../assets/img/checklist.png")} className="me-3" alt="list-icon" />1 Shot of Coffee
                      </li>
                      <li className="list-item-desc list-item-res">
                        <img src={require("../../assets/img/checklist.png")} className="me-3" alt="list-icon" />
                        Wanilla Whipped Cream
                      </li>
                      <li className="list-item-desc list-item-res">
                        <img src={require("../../assets/img/checklist.png")} className="me-3" alt="list-icon" />
                        Chocolate Biscuits
                      </li>
                      <li className="list-item-desc list-item-res">
                        <img src={require("../../assets/img/checklist.png")} className="me-3" alt="list-icon" />
                        Strawberry Syrup
                      </li>
                      <li className="list-item-desc list-item-res">
                        <img src={require("../../assets/img/checklist.png")} className="me-3" alt="list-icon" />
                        Sliced strawberry on Top
                      </li>
                    </ul>
                    <div className="card-body card-price">
                      <h2 className="price-text">IDR {product.price.split("Rp")[1]}</h2>
                      <button className="button-select" onClick={() => navigate(`/product/${product.id}`, { replace: true })}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorite;
