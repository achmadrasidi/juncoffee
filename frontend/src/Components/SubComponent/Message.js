import React from "react";
import { Button, Modal } from "react-bootstrap";

const Message = ({ show, onHide, message, error }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header>
        <Modal.Title>{message ? message : error}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Message;
