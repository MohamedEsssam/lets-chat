import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { logout } from "../../services/userServices";
import openSocket from "socket.io-client";

const Home = () => {
  const location = useLocation();
  const user = location.user
    ? location.user
    : JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    openSocket("http://localhost:8000");
  }, []);

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
      </div>
    )
  );
};

export default Home;
