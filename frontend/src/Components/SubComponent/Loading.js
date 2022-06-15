import React from "react";
import { Modal } from "react-bootstrap";

const Loading = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header>
        <Modal.Body className="text-center">
          Please Wait...
          <img src={require("../../assets/gif/Loading_icon.gif")} width={50} height={50} alt="" />
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default Loading;
