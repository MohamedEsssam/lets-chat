import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home";
import Chat from "./components/chat/chat";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:id" component={Chat}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
