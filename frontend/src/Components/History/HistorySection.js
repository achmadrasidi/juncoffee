import Message from "../../Components/SubComponent/Message";
import Prompt from "../../Components/SubComponent/Prompt";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { deleteAllHistory, deleteHistory } from "../../Redux/Actions/HistoryAction";
import { userHistory } from "../../Redux/Actions/UserAction";
import HistoryItem from "./sub/HistoryItem";

const HistorySection = () => {
  const [message, setMessage] = useState(null);
  const [showDelete, setDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [itemId, setItemId] = useState([]);

  const { err, data } = useSelector((state) => state.userHistory);
  const { mes } = useSelector((state) => state.deleteHistory);
  const { msg } = useSelector((state) => state.deleteAllHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(null);
    setDelete(false);
    setCheckedAll(false);

    if (mes) {
      setMessage(mes);
      setShowModal(true);
      return;
    }
    if (msg) {
      setMessage(msg);
      setShowModal(true);
    }
  }, [mes, msg]);

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
    setShowPrompt(true);
  };

  const deleteHandler = () => {
    if (checkedAll) {
      dispatch(deleteAllHistory());
      setShowPrompt(false);
      return;
    }
    dispatch(deleteHistory(itemId));
    setShowPrompt(false);
  };

  return (
    <>
      {message ? (
        <Message
          show={showModal}
          onHide={() => {
            setMessage(null);
            setShowModal(false);
            dispatch(userHistory());
          }}
          message={message}
          error={message}
        />
      ) : (
        <Prompt show={showPrompt} cancel={() => setShowPrompt(false)} message={"Are you sure want to delete the selected item(s) ?"} confirm={deleteHandler} />
      )}
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
                  {data.length && !err ? (
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
          <HistoryItem changeHandler={changeHandler} checkedAll={checkedAll} showDelete={showDelete} />
        </div>
      </section>
    </>
  );
};

export default HistorySection;
