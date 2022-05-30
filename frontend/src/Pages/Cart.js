import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Cart = () => {
  const [items, setItems] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const shipping = items ? 10000 : 0;

  useEffect(() => {
    document.title = "Juncoffee - Cart";
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartInfo"));
    let subtotal;
    if (items) {
      subtotal = items.map((item) => item.price * item.quantity).reduce((b, a) => b + a);
      const tax = subtotal * 0.05;
      const total = subtotal + shipping + tax;

      setTax(tax);
      setTotalPrice(total);
      setSubtotal(subtotal);
      setItems(items);
    }
  }, []);
  const paymentHandle = () => {
    localStorage.removeItem("cartInfo");
    window.location.reload(false);
  };
  return (
    <>
      <Header />
      <section className="cart">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="checkout-title my-5 ps-5 ms-5" id="checkout-title-res">
                Checkout your item now!
              </h1>
            </div>
          </div>
          <div className="row ps-5 ms-5 card-between-row" id="card-between-row-res">
            <div className="col-md-4 ms-5 ps-5" id="card-between-col-res">
              <div className="card cart-card-layout">
                <div className="card-body">
                  <div className="row mt-5 ">
                    <div className="col-md-12">
                      <h2 className="cart-product-title text-center">Order Summary</h2>
                    </div>
                  </div>{" "}
                  {!items ? (
                    <>
                      <div className="no-cart text-center">
                        <h1 className="text-center">No Cart Items Found</h1>
                        <Link className="btn btn-success text-white mt-3" to="/product">
                          Shop Now
                        </Link>
                      </div>
                    </>
                  ) : (
                    items.map((item) => (
                      <div className="row mt-3 cart-row-border pb-4 ps-0">
                        <div className="col-md-3 cart-row-col">
                          <img src={`http://localhost:5000${item.image}`} width="100%" alt="" class="image-cart-product" />
                        </div>
                        <div className="col-md-6 ">
                          <p className="cart-product-text m-0">{item.name}</p>
                          <p className="cart-product-text m-0">x{item.quantity}</p>
                          <p className="cart-product-text">{item.size}</p>
                        </div>
                        <div className="col-md-3">
                          <p className="cart-product-text">IDR {item.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">SUBTOTAL</p>{" "}
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR {subtotal}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">TAX &amp; FEES</p>{" "}
                        </div>
                        <div className="col-md-6 ">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR {tax}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">SHIPPING</p>{" "}
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR {shipping}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ms-2 mt-5 mb-3 ">
                    <div className="col-md-6">
                      <p className="cart-total-price">TOTAL</p>
                    </div>
                    <div className="col-md-6">
                      <p className="cart-total-price">IDR {totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="cart-detail-title">Address details</h2>
                </div>
                <div className="col-md-6 text-end align-self-center">
                  <p className="cart-edit-title mb-0 me-2">edit</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-cart-delivery">
                    <div className="card-body mt-2">
                      <div className="row">
                        <div className="col-md-12 ">
                          <p className="delivery-text border-bottom m-0">
                            <span className="fw-bold">Delivery</span> to Iskandar Street
                          </p>
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className="col-md-12">
                          <p className="delivery-text border-bottom m-0">Km 5 refinery road oppsite re public road, effurun, Jakarta</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <p className="delivery-text m-0">+62 81348287878</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <h2 className="cart-detail-title">Payment method</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-cart-payment">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mt-2">
                          <input type="radio" name="gender" value="female" />
                          <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                            <img src={require("../assets/img/payment-icon.png")} alt="" />
                          </label>
                          <span className="payment-text ms-2">Card</span>
                          <div className="border ms-4 mt-2"></div>
                        </div>
                      </div>

                      <div className="row my-3">
                        <div className="col-md-12">
                          <input type="radio" name="gender" value="female" />
                          <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                            <img src={require("../assets/img/bank-icon.png")} alt="" />
                          </label>
                          <span className="payment-text ms-2 ">Bank Account</span>
                          <div className="border ms-4 mt-2"></div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <input type="radio" name="gender" value="female" />
                          <label htmlFor="gender" className="male-icon-text ms-3 mb-0 ">
                            <img src={require("../assets/img/delivery-icon.png")} alt="" />
                          </label>
                          <span className="payment-text ms-2 ">Cash on delivery</span>
                          <div className="border ms-4 mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button className="button-cart-pay w-100 mt-4" onClick={paymentHandle}>
                    Confirm and Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
