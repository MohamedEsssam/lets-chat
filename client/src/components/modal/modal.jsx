import React from "react";
import { Modal, Button } from "react-bootstrap";
import FromModal from "./formModal";

const CustomModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Room
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <FromModal onHide={props.onHide} />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
