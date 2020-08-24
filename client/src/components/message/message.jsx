import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import openSocket from "socket.io-client";
import { getMessages } from "../../services/messageService";
import MessageForm from "./messageForm";
import { useParams } from "react-router-dom";

const ViewMessage = React.memo(() => {
  const prams = useParams();
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

  return (
    <>
      <Card bg="info" text="white" style={{ width: "60rem" }} className="mb-2">
        <Card.Header style={{ fontSize: "50px" }}></Card.Header>
        <Card.Body>
          {fetchedMessages &&
            fetchedMessages.map((message) => {
              return (
                <Card.Text style={{ fontSize: "40px" }} key={message.messageId}>
                  {message.username}: {message.message}
                </Card.Text>
              );
            })}
          <MessageForm />
        </Card.Body>
      </Card>
    </>
  );
});

export default ViewMessage;
