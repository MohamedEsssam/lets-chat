import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import CustomModal from "../modal/modal";
import { remove } from "../../services/chatRoomServices";
import { useHistory } from "react-router-dom";
import { currentUser } from "../../services/userServices";
import { toast } from "react-toastify";

const CustomCard = ({ name, id, userId }) => {
  const history = useHistory();
  const user = currentUser();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    try {
      let values = {};
      values.roomId = id;
      values.userId = user.userId;

      const room = await remove(values);
      if (room)
        toast.success(`Room deleted successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    } catch (err) {
      if (err)
        toast.error(`Failed to delete room 😞`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  return (
    <>
      <Card
        key={id}
        bg="info"
        text="white"
        style={{ width: "40rem" }}
        className="mb-2"
      >
        <Card.Header style={{ fontSize: "50px" }}>
          {name}
          {userId === user.userId ? (
            <>
              <Button
                variant="dark"
                size="lg"
                className="mr-2"
                style={{ marginLeft: "13rem" }}
                onClick={handleShow}
              >
                Update
              </Button>
              <Button variant="danger" size="lg" onClick={handleDelete}>
                Delete
              </Button>
            </>
          ) : null}
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ fontSize: "50px" }}> Join us </Card.Title>
          <Card.Text style={{ fontSize: "40px" }}>
            Enter chat
            <Button
              variant="secondary"
              size="lg"
              className="ml-3"
              onClick={() => {
                history.push(`/chat/${id}`);
              }}
            >
              Join
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <CustomModal
        type="Update"
        roomId={id}
        initialValues={{ name: name }}
        show={show}
        onHide={handleClose}
      />
    </>
  );
};

export default CustomCard;
