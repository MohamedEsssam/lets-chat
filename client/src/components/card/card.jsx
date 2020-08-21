import React from "react";
import { Button, Card } from "react-bootstrap";

const CustomCard = ({ name, id }) => {
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
          <Button
            variant="dark"
            size="lg"
            className="mr-2"
            style={{ marginLeft: "13rem" }}
          >
            Update
          </Button>
          <Button variant="danger" size="lg">
            Delete
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ fontSize: "50px" }}> Join us </Card.Title>
          <Card.Text style={{ fontSize: "40px" }}>
            Enter chat
            <Button variant="secondary" size="lg" className="ml-3">
              Join
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomCard;
