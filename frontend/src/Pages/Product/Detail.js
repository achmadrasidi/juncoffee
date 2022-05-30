import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/detail/${id}`);
        const data = response.data.data;
        const { price } = data;
        const newPrice = Number(price.split("Rp")[1].split(".").join(""));
        const newData = { ...data, price: newPrice };
        setProduct(newData);
      } catch (error) {
        setError(error.response.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    document.title = "Juncoffee - Product Detail";
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, []);

  const cartHandler = (e) => {
    e.preventDefault();
    setCart({ quantity, size });
    alert("Product Successfully Added to Your Cart");
  };

  const checkoutHandler = (e) => {
    e.preventDefault();
    const prevItems = JSON.parse(localStorage.getItem("cartInfo"));
    const cartData = [{ name: product.name, image: product.image, quantity, size, price: product.price }];
    if (prevItems) {
      const newItems = Object.assign(...cartData);
      prevItems.push(newItems);
    }

    localStorage.setItem("cartInfo", JSON.stringify(prevItems ? prevItems : cartData));
    navigate("/cart", { replace: true });
  };
  return (
    <>
      <Header />
      {error ? (
        <h1 className="text-center fw-bold fs-6">{error}</h1>
      ) : (
        <section className="detail-product">
          <div className="container-fluid">
            <div className="row my-5 row-content">
              <div className="col-md-4 text-center">
                <p className="top-text-left mb-5" onClick={() => navigate("/product", { replace: true })}>
                  Favorite &amp; Promo <span className="product-text-left">&#8594; {product.name}</span>{" "}
                </p>
                <img src={`http://localhost:5000${product.image}`} alt="" className=" my-3 justify-content-center" width={"60%"} />
                <div className="card text-start delivery-time-card">
                  <div className="card-body mx-3 delivery-time-card-res">
                    <div className="card-title-delivery">
                      <h2 className="fw-bold">Delivery and Time</h2>
                    </div>
                    <div className="card-button mt-5">
                      <button className="dine-in-button me-2 active">Dine In</button>
                      <button className="dine-in-button mx-2">Door Delivery</button>
                      <button className="dine-in-button ms-2">Pick Up</button>
                    </div>
                    <div className="card-time mt-5 ">
                      <span className="now-text">Now</span>
                      <button className="dine-in-button ms-5">Yes</button>
                      <button className="dine-in-button ms-3">No</button>
                    </div>
                    <div className="card-time my-4">
                      <span className="now-text">Set time</span>
                      <input type="text" className="time-input ms-3" placeholder="Enter time for reservation" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-5">
                <h2 className="top-product-title text-center fw-bold mt-4 ">{product.name}</h2>
                <p className="top-product-desc mt-5 pe-5" id="top-product-desc-res">
                  {product.description}
                </p>
                <p className="top-product-desc mt-5">
                  Delivery only on <span className="day">Monday to friday</span> at <span className="day">1 - 7 pm</span>{" "}
                </p>
                <div className="count mt-5 pt-5">
                  <div className="countButton">
                    <div
                      className="minus"
                      onClick={() =>
                        setQuantity((qty) => {
                          if (qty < 1) {
                            return qty * 0;
                          }
                          return qty - 1;
                        })
                      }
                    >
                      {" "}
                      -{" "}
                    </div>

                    <div className="numb"> {quantity} </div>

                    <div className="minus" onClick={() => setQuantity((qty) => qty + 1)}>
                      {" "}
                      +{" "}
                    </div>
                  </div>
                  <div className="priceDetail">IDR {product.price}</div>
                </div>
                <div className="row mt-5 p-0">
                  <div className="col-md-12  ">
                    <button className=" cart-button" onClick={cartHandler}>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="row mt-5 p-0">
                  <div className="col-md-12  ">
                    <button className=" staff-button">Ask a Staff</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-bottom-content">
              <div className="col-md-3">
                <div className="card  card-size">
                  <div className="card-body mb-3">
                    <div className="row p-0 ">
                      <div className="col-md-12">
                        <h2 className="size-text">Choose a size</h2>
                      </div>
                    </div>
                    <div className="row w-100 mb-1">
                      <div className="col-md-4 text-center">
                        {" "}
                        <button
                          className="regular"
                          onClick={(e) => {
                            e.preventDefault();
                            setSize("Regular");
                          }}
                        >
                          R
                        </button>
                      </div>
                      <div className="col-md-4 text-center">
                        {" "}
                        <button
                          className="regular"
                          onClick={(e) => {
                            e.preventDefault();
                            setSize("Large");
                          }}
                        >
                          L
                        </button>
                      </div>
                      <div className="col-md-4 text-center">
                        {" "}
                        <button
                          className="regular"
                          onClick={(e) => {
                            e.preventDefault();
                            setSize("Extra Large");
                          }}
                        >
                          XL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card card-checkout">
                  <div className="card-body ">
                    <div className="row ps-0 pe-5 pt-2">
                      <div className="col-md-6">
                        <div className="row text-center">
                          <div className="col-md-6">
                            {" "}
                            <img src={`http://localhost:5000${product.image}`} className="bottom-image" alt="" />
                          </div>
                          <div className="col-md-6">
                            {" "}
                            <h2 className="cold-brew-title fw-bold">{product.name}</h2>
                            {cart ? (
                              <p className="cold-brew-desc">
                                <span>x{cart.quantity}</span>
                                <span>({cart.size})</span>
                              </p>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-end align-self-center">
                        <span className="checkout-text">Checkout</span>
                        <button className="arrow-button-bot ms-5" onClick={checkoutHandler}>
                          <img src={require("../../assets/img/Arrow 3.png")} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Detail;
