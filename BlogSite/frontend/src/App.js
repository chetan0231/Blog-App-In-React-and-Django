import React from "react";
import Register from "./components/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import MyBlogs from "./components/MyBlogs";
import AllBlogs from "./components/AllBlogs"
import Header from "./components/Header";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Home/>
        <Switch>
          <Route exact path="/" component={Header}/>
          <Route exact path="/myBlogs" component={MyBlogs}/>
          <Route exact path="/logIn" component={Login}/>
          <Route exact path="/signUp" component={Register} />
          <Route exact path="/allBlogs" component={AllBlogs} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
