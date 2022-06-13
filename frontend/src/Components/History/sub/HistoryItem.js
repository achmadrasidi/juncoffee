import React, { useEffect, useState } from "react";
import Loading from "../../../Components/SubComponent/Loading";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";

const HistoryItem = ({ changeHandler, checkedAll, showDelete }) => {
  const [open, setOpen] = useState({});
  const [error, setError] = useState(null);

  const { err, loading, data } = useSelector((state) => state.userHistory);
  const { load, errr } = useSelector((state) => state.deleteHistory);
  const { lo, er } = useSelector((state) => state.deleteAllHistory);

  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

  useEffect(() => {
    setError(null);
    if (err) {
      setError(err);
      return;
    }
    if (er) {
      setError(er);
      return;
    }
    if (errr) {
      setError(errr);
    }
  }, [err, errr, er]);
  const handleDetails = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="row mt-4 me-5 pe-4 card-history-row">
      {error ? (
        <h1 className="history-title text-center mt-5">{error}</h1>
      ) : loading || load || lo ? (
        <Loading show={true} onHide={false} />
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
  );
};

export default HistoryItem;
