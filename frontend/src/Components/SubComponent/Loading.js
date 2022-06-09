import React from "react";
import { Modal } from "react-bootstrap";

const Loading = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header>
        <Modal.Body>Please Wait...</Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default Loading;
