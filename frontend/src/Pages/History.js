import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { Collapse } from "react-bootstrap";
import { groupByTransaction } from "../helper/groupByTransaction";
import Message from "../Components/SubComponent/Message";
import Prompt from "../Components/SubComponent/Prompt";
import { useSelector } from "react-redux";

const History = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState({});
  const [message, setMessage] = useState(null);
  const [showDelete, setDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [itemId, setItemId] = useState([]);

  const user = useSelector((state) => state.persist.userInfo.info);
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

  useEffect(() => {
    document.title = "Juncoffee - History";

    (async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API}/user/history/`, { headers: { Authorization: `Bearer ${user.token}` } });
        const group = groupByTransaction(result.data.data, "transaction_id");
        setData(Object.entries(group));
      } catch (err) {
        setError(err.response.data.error);
      }
    })();
  }, []);

  const changeHandler = (e) => {
    const { checked, value } = e.target;
    setCheckedAll(false);
    if (checked) {
      setDelete(true);
      setItemId((prevId) => [...prevId, value]);
    } else {
      setItemId((prevId) => prevId.filter((val) => val !== value));
    }
  };

  const changeAll = () => {
    setCheckedAll(true);
  };

  const clickHandler = () => {
    setMessage(null);
    if (!itemId.length && !checkedAll) {
      setShowModal(true);
      setMessage("Please select your transaction");
      return;
    }
    setShowModal(true);
  };

  const deleteHandler = () => {
    if (checkedAll) {
      axios
        .delete(`${process.env.REACT_APP_API}/user/history`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((result) => {
          setMessage(result.data.message);
        })
        .catch((err) => {
          setMessage(null);
          setError(err.response.data.error);
        });
      return;
    }

    const body = {
      id: itemId,
    };
    axios
      .delete(`${process.env.REACT_APP_API}/user/history-order/`, { data: body, headers: { Authorization: `Bearer ${user.token}` } })
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((e) => {
        setMessage(null);
        setError(e.response.data.error);
      });
  };

  const handleDetails = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Modal Delete*/}
      {message ? (
        <Message
          show={showModal}
          onHide={() => {
            window.location.reload(false);
            setShowModal(false);
          }}
          message={message}
          error={message}
        />
      ) : (
        <Prompt show={showModal} cancel={() => setShowModal(false)} message={"Are you sure want to delete the selected item(s) ?"} confirm={deleteHandler} />
      )}

      <Header />
      <section className="history">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="history-title text-center mt-5">Let's see what you have bought!</h1>
              <p className="history-text text-center">Select item to delete item</p>
            </div>
          </div>
          <div className="row text-end">
            <div className="col-md-12">
              {checkedAll || showDelete ? (
                <>
                  <span className="delete-text me-3" id="delete-text-res" onClick={clickHandler}>
                    Delete
                  </span>
                  <span className="delete-text me-5 pe-5" id="delete-text-res" onClick={() => window.location.reload(false)}>
                    Cancel
                  </span>
                </>
              ) : (
                <>
                  {data.length ? (
                    <p className="delete-text me-5 pe-5" id="delete-text-res" onClick={changeAll}>
                      Select All
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row mt-4 me-5 pe-4 card-history-row">
            {error ? (
              <h1 className="history-title text-center mt-5">{error}</h1>
            ) : (
              data.map((item, i) => (
                <>
                  <div className="col-md-4 mt-3 " key={i}>
                    <div className="card card-history-layout">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h2 className="card-history-title fw-bolder ms-4">Order id {item[0]}</h2>
                          </div>
                          <div className="col-md-6">
                            <p className="card-history-text card-history-text-pointer m-0 mt-1 text-end me-5" aria-controls="item-collapse" onClick={() => handleDetails(item[1].find((val) => val.transaction_id === item[0]).transaction_id)}>
                              View Details
                            </p>
                          </div>
                        </div>
                        {item[1].map((itm) => (
                          <Collapse in={open[itm.transaction_id]}>
                            <div className="row" id="item-collapse">
                              <div className="col-md-3">
                                <img src={`${process.env.REACT_APP_API}${itm.image}`} width="155" height="155" alt="" />
                              </div>
                              <div className="col-md-9">
                                <h2 className="card-history-title mt-3 fw-bolder">{itm.product_name}</h2>
                                <p className="card-history-text m-0"> x{itm.quantity}</p>
                                <p className="card-history-text m-0"> {itm.size}</p>
                                <p className="card-history-text m-0">IDR {formatter.format(itm.price * itm.quantity).split("Rp")[1]}</p>
                              </div>
                            </div>
                          </Collapse>
                        ))}
                        <div className="row p-0 mt-3 ms-5">
                          <div className="col-md-8">
                            <p className="card-history-text">{item[1].find((val) => val.transaction_id === item[0]).status}</p>
                          </div>
                          <div className="col-md-3 text-end ">
                            <span>
                              <label htmlFor="delete"></label>
                              <input type="checkbox" checked={checkedAll ? checkedAll : showDelete[i]} value={item[0]} onClick={(e) => changeHandler(e)} name="delete" id="" className="check-col text-end me-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default History;
