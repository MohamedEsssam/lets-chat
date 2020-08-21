import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import openSocket from "socket.io-client";
import { Button } from "react-bootstrap";
import { logout } from "../../services/userServices";
import CustomModal from "../modal/modal";
import { getRooms } from "../../services/chatRoomServices";

const Home = () => {
  const location = useLocation();
  const user = location.user
    ? location.user
    : JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [fetchedRooms, setFetchedRooms] = useState([]);
  // const [fetched, setFetched] = useState(false);

  let rooms = [];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const socket = openSocket("http://localhost:8000");
    async function getRoomsFromApi() {
      const fetchedRooms = await getRooms();
      rooms = fetchedRooms.data.slice(0);
      setFetchedRooms(fetchedRooms.data);
    }

    socket.on("rooms", (date) => {
      if (date.action === "create") createRoom(date.room);
    });

    getRoomsFromApi();
  }, []);

  const createRoom = (room) => {
    let newRooms = rooms.slice(0);
    newRooms.unshift(room);
    setFetchedRooms(newRooms);
  };

  return !user ? (
    <div>
      <div>
        <Link
          to={{
            pathname: "/login",
          }}
        >
          login
        </Link>
      </div>
      <Link
        to={{
          pathname: "/register",
        }}
      >
        register
      </Link>
    </div>
  ) : (
    user && (
      <div>
        <Link
          to={{
            pathname: "/",
          }}
          onClick={logout}
        >
          logout
        </Link>
        <h3>hello {user.name}</h3>
        {fetchedRooms &&
          fetchedRooms.map((room) => {
            return (
              <div key={room.roomId}>
                <h1>{room.name}</h1>
              </div>
            );
          })}
        <Button variant="warning" size="lg" onClick={handleShow}>
          Create Room
        </Button>
        <CustomModal show={show} onHide={handleClose} />
      </div>
    )
  );
};

export default Home;
