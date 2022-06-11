import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import CartItems from "./Sub/CartItems";
import Payment from "./Sub/Payment";

const CartSection = () => {
  const [editDetail, setEditDetail] = useState(false);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setshipping] = useState(0);

  const item = useSelector((state) => state.persist.cartInfo.cartItems);
  const userDetail = useSelector((state) => state.persist.userInfo.info);
  const { message } = useSelector((state) => state.createOrder);

  useEffect(() => {
    setAddress(userDetail.address);
    setPhone(userDetail.phone_number);
    if (message) {
      setshipping(0);
      setTax(0);
      setTotalPrice(0);
      setSubtotal(0);
      return;
    }
    if (item.length) {
      const sub = item.map((obj) => obj.variant.map((val) => val.prodPrice * val.quantity).reduce((b, a) => b + a)).reduce((b, a) => b + a);

      const ship = 10000;
      const tx = sub * 0.05;
      const total = sub + ship + tx;

      setshipping(ship);
      setTax(tx);
      setTotalPrice(total);
      setSubtotal(sub);
    }
  }, [item, userDetail.address, userDetail.phone_number]);

  return (
    <>
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
                  </div>
                  <CartItems item={item} subtotal={subtotal} totalPrice={totalPrice} tax={tax} shipping={shipping} />{" "}
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="cart-detail-title">Address details</h2>
                </div>
                <div className="col-md-6 text-end align-self-center">
                  <p
                    className="cart-edit-title mb-0 me-2"
                    onClick={() => {
                      setEditDetail(true);
                    }}
                  >
                    edit
                  </p>
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
                            <b> {userDetail.email.split("@")[0]}</b> Address
                          </p>
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className="col-md-12">
                          {editDetail ? (
                            <input
                              type="text"
                              className="user-contact-text"
                              placeholder="Detail Address"
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            ></input>
                          ) : (
                            <p className="delivery-text border-bottom m-0">{address ? address : "No Address"}</p>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          {editDetail ? (
                            <input
                              type="text"
                              className="user-contact-text"
                              placeholder="Contact Detail"
                              onChange={(e) => {
                                e.preventDefault();
                                setPhone(e.target.value);
                              }}
                            ></input>
                          ) : (
                            <p className="delivery-text m-0">{phone ? phone : "No Contact Detail"}</p>
                          )}
                        </div>
                      </div>
                      {editDetail ? (
                        <div className="row">
                          <div className="col-md-12 text-end align-self-center">
                            <p
                              className="cart-edit-title text-black mb-0 me-2 mt-2"
                              onClick={() => {
                                setEditDetail(false);
                              }}
                            >
                              save
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Payment address={address} item={item} email={userDetail.email} subtotal={subtotal} totalPrice={totalPrice} tax={tax} shipping={shipping} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartSection;
