import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import openSocket from "socket.io-client";
import queryString from "query-string";
import { Button } from "react-bootstrap";
import { logout } from "../../services/userServices";
import CustomModal from "../modal/modal";
import CustomCard from "../card/card";
import { getRooms } from "../../services/chatRoomServices";

const Home = () => {
  const location = useLocation();
  const history = useHistory();
  const user = location.user
    ? location.user
    : JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [fetchedRooms, setFetchedRooms] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);

  let rooms = [];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDidMount(true);
    const socket = openSocket("http://localhost:8000");

    if (!fetched) loadData();
    connectToRoom(socket);

    return () => setDidMount(false);
  }, []);

  const connectToRoom = (socket) => {
    socket.on("rooms", (date) => {
      if (date.action === "create") createRoom(date.room);
      if (date.action === "delete") deleteRoom(date.room);
      if (date.action === "update") updateRoom(date.room);
    });
  };

  const loadData = async () => {
    const fetchedRooms = await getRooms();
    rooms = fetchedRooms.data.slice(0);
    setFetchedRooms(fetchedRooms.data);
    setFetched(true);
  };

  const createRoom = (room) => {
    rooms.unshift(room);

    setFetchedRooms(() => [...[], ...rooms]);
  };

  const deleteRoom = (room) => {
    rooms = rooms.filter(function (obj) {
      return obj.roomId !== room.roomId;
    });

    setFetchedRooms(() => [...[], ...rooms]);
  };

  const updateRoom = (room) => {
    let newRooms = rooms.slice(0);
    newRooms.map((obj) => {
      if (obj.roomId === room.roomId) obj.name = room.name;
    });

    setFetchedRooms(newRooms);
  };

  const onChange = async (e) => {
    history.push(`/?room=${e.target.value}`);
    let qs = queryString.parse(window.location.search);
    const newRooms = await getRooms(qs);
    setFetchedRooms(() => [...[], ...newRooms.data]);
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
        <input
          type="text"
          id="input"
          placeholder="search for room"
          onChange={onChange}
        />
        {fetchedRooms &&
          fetchedRooms.map((room) => {
            return (
              <CustomCard
                name={room.name}
                id={room.roomId}
                userId={room.userId}
                key={room.roomId}
              />
            );
          })}
        <Button variant="warning" size="lg" onClick={handleShow}>
          Create Room
        </Button>
        <CustomModal
          type="Create"
          initialValues={{ name: "" }}
          show={show}
          onHide={handleClose}
        />
      </div>
    )
  );
};

export default Home;
