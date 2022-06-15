import React, { useEffect } from "react";
import { ArrowUp } from "react-bootstrap-icons";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Order = () => {
  useEffect(() => {
    document.title = "Juncoffee - Orders";
  }, []);
  return (
    <>
      <Header />
      <section className="cart">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="checkout-title my-5 ps-5 ms-5" id="checkout-title-res">
                Finish your customer order now!
              </h1>
            </div>
          </div>
          <div className="row ps-5 ms-5 card-between-row" id="card-between-row-res">
            <div className="col-md-4 ms-5 ps-5" id="card-between-col-res">
              <div className="card cart-card-layout">
                <div className="card-body">
                  <div className="row mt-5 ">
                    <div className="col-md-12">
                      <h2 className="cart-product-title text-center">Delivery Order</h2>
                      <p className="text-order-for">for Zulaikha</p>
                    </div>
                  </div>
                  <div className="row mt-3 cart-row-border pb-4 ps-0">
                    <div className="col-md-3 cart-row-col">
                      <img src={require("../assets/img/hazelnut-latte.png")} width="100%" alt="" className="image-cart-product" />
                    </div>
                    <div className="col-md-6 ">
                      <p className="cart-product-text m-0">Hazzelnut Latte</p>

                      <p className="cart-product-text m-0">x1</p>
                      <p className="cart-product-text m-0">Regular</p>
                    </div>
                    <div className="col-md-3">
                      <p className="cart-product-text">IDR 10000</p>
                    </div>
                  </div>

                  <div className="row mt-3 cart-row-border pb-4 ps-0">
                    <div className="col-md-3 cart-row-col">
                      <img src={require("../assets/img/hazelnut-latte.png")} width="100%" alt="" className="image-cart-product" />
                    </div>
                    <div className="col-md-6 ">
                      <p className="cart-product-text m-0">Chicken Wings</p>

                      <p className="cart-product-text m-0">x1</p>
                      <p className="cart-product-text m-0">Regular</p>
                    </div>
                    <div className="col-md-3">
                      <p className="cart-product-text">IDR 10000</p>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">SUBTOTAL</p>{" "}
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR 100000</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">TAX &amp; FEES</p>{" "}
                        </div>
                        <div className="col-md-6 ">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR 10000</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text m-0">SHIPPING</p>{" "}
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <p className="cart-price-text text-center m-0">IDR 20000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ms-2 mt-5 mb-3 ">
                    <div className="col-md-6">
                      <p className="cart-total-price">TOTAL</p>
                    </div>
                    <div className="col-md-6">
                      <p className="cart-total-price">IDR 50000</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="upcoming-button mt-5">
                Swipe up to see upcoming orders <ArrowUp />
              </button>
            </div>
            <div className="col-md-4 ">
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
                            <span className="fw-bold">Delivery</span> to
                            <b> </b> Address
                          </p>
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className="col-md-12">
                          <input type="text" className="user-contact-text" placeholder="Detail Address"></input>

                          <p className="delivery-text border-bottom m-0">{"No Address"}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <input type="text" className="user-contact-text" placeholder="Contact Detail"></input>

                          <p className="delivery-text m-0">{"No Contact Detail"}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 text-end align-self-center">
                          <p className="cart-edit-title text-black mb-0 me-2 mt-2">save</p>
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
                          <input type="radio" name="gender" value="card" />
                          <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                            <img src={require("../assets/img/payment-icon.png")} alt="" />
                          </label>
                          <span className="payment-text ms-2">Card</span>
                          <div className="border ms-4 mt-2"></div>
                        </div>
                      </div>

                      <div className="row my-3">
                        <div className="col-md-12">
                          <input type="radio" name="gender" value="bank account" />
                          <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                            <img src={require("../assets/img/bank-icon.png")} alt="" />
                          </label>
                          <span className="payment-text ms-2 ">Bank Account</span>
                          <div className="border ms-4 mt-2"></div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <input type="radio" name="gender" value="cash on delivery" />
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
                  <button className="button-cart-pay w-100 mt-4">Mark as done</button>
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

export default Order;
