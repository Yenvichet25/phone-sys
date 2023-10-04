import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPhone from "./components/add-phone.component";
import Phone from "./components/phone.component";
import PhoneList from "./components/phone-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/phone"} className="navbar-brand">
            PHONE SYS
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/phone"} className="nav-link">
                List Model
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Model
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<PhoneList/>} />
            <Route path="/phone" element={<PhoneList/>} />
            <Route path="/add" element={<AddPhone/>} />
            <Route path="/phone/:id" element={<Phone/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
