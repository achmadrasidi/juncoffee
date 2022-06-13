import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../../Redux/Actions/CartAction";
import { createOrder } from "../../../Redux/Actions/OrderActions";
import Loading from "../../SubComponent/Loading";
import Message from "../../SubComponent/Message";

const Payment = (props) => {
  const [payMethod, setPayMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const { message, loading, err } = useSelector((state) => state.createOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (err) {
      setError(err);
      return;
    }
    if (message) {
      setPayMethod(null);
      dispatch(emptyCart());
    }
  }, [err, message]);

  const paymentHandle = () => {
    if (!props.item.length) {
      setError(null);
      setError("No Cart Items Found");
      setShowModal(true);
      return;
    }
    if (!payMethod) {
      setError(null);
      setError("Please Choose Your Payment Method");
      setShowModal(true);
      return;
    }

    setError(null);
    const body = {
      email: props.email,
      totalPrice: props.totalPrice,
      subtotal: props.subtotal,
      address: props.address,
      payMethod,
      items: props.item,
      shipping: props.shipping,
      tax: props.tax,
    };
    dispatch(createOrder(body));
    setShowModal(true);
  };

  return (
    <>
      {loading ? (
        <Loading show={true} onHide={false} />
      ) : (
        <Message
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          message={message}
          error={error}
        />
      )}
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
                  <input
                    type="radio"
                    name="gender"
                    value="card"
                    onClick={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    checked={payMethod === "card"}
                  />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                    <img src={require("../../../assets/img/payment-icon.png")} alt="" />
                  </label>
                  <span className="payment-text ms-2">Card</span>
                  <div className="border ms-4 mt-2"></div>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-12">
                  <input
                    type="radio"
                    name="gender"
                    value="bank account"
                    onClick={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    checked={payMethod === "bank account"}
                  />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0">
                    <img src={require("../../../assets/img/bank-icon.png")} alt="" />
                  </label>
                  <span className="payment-text ms-2 ">Bank Account</span>
                  <div className="border ms-4 mt-2"></div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="radio"
                    name="gender"
                    value="cash on delivery"
                    onClick={(e) => {
                      setPayMethod(e.target.value);
                    }}
                    checked={payMethod === "cash on delivery"}
                  />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0 ">
                    <img src={require("../../../assets/img/delivery-icon.png")} alt="" />
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
    </>
  );
};

export default Payment;
