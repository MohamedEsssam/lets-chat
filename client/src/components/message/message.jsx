import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import { getMessages, remove } from "../../services/messageService";
import MessageForm from "./messageForm";

const ViewMessage = React.memo(() => {
  const prams = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [fetched, setFetched] = useState(false);
  const [fetchedMessages, setFetchedMessages] = useState([]);

  let messages = [];

  useEffect(() => {
    const socket = openSocket("http://localhost:8000");

    if (!fetched) loadData();
    connectToMessage(socket);
  }, []);

  const connectToMessage = (socket) => {
    socket.on("messages", (date) => {
      if (date.action === "create") createMessage(date.message);
      if (date.action === "delete") deleteMessage(date.message);
    });
  };

  const loadData = async () => {
    const fetchedMessages = await getMessages({ roomId: prams.id });
    messages = fetchedMessages.data.slice(0);
    setFetchedMessages(fetchedMessages.data);
    setFetched(true);
  };

  const createMessage = (message) => {
    messages.push(message);

    setFetchedMessages(() => [...[], ...messages]);
  };

  const deleteMessage = (message) => {
    messages = messages.filter(function (obj) {
      return obj.messageId !== message.messageId;
    });

    setFetchedMessages(() => [...[], ...messages]);
  };

  const handleDelete = async (messageId) => {
    try {
      const userId = user.userId;
      await remove({ messageId, userId });
    } catch (err) {
      if (err.response.status === 500)
        toast.error(`Failed to delete message 😞`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  console.log(fetchedMessages);
  return (
    <>
      <Card
        bg="info"
        text="white"
        style={{ width: "60rem", left: "21%", top: "200px" }}
        className="mb-2"
      >
        <Card.Header style={{ fontSize: "50px" }}></Card.Header>
        <Card.Body>
          {fetchedMessages &&
            fetchedMessages.map((message) => {
              return (
                <>
                  <Card.Text
                    style={{ fontSize: "40px" }}
                    key={message.messageId}
                  >
                    {message.username}: {message.message}
                    {user.userId === message.userId ? (
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ marginLeft: "10rem" }}
                        onClick={() => handleDelete(message.messageId)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Card.Text>
                </>
              );
            })}
          <MessageForm />
        </Card.Body>
      </Card>
    </>
  );
});

export default ViewMessage;
