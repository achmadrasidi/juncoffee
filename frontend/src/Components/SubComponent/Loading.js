import React from "react";
import { Modal } from "react-bootstrap";

const Loading = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header>
        <Modal.Body>
          Please Wait...
          <img src={require("../../assets/gif/Loading_icon.gif")} width={100} height={100} alt="" />
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default Loading;
