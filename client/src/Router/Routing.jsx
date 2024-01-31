import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../UI/Pages/Login/Login";
import Profile from "../UI/Pages/Profile/Profile";
import HeaderCom from "../UI/Components/HeaderCom/HeaderCom";
import { Provider } from "react-redux";
import { store } from "../../Redux/App/Store";
import SignUp from "../UI/Pages/SingUp/SignUp";
import Apply from "../UI/Pages/Apply/Apply";
import ShowAll from "../UI/Pages/ShowAll/ShowAll";
import Attendance from "../UI/Pages/Attendance/Attendance";
import AdminAttendance from "../UI/Pages/Admin/AdminAttendance";
import AdminLeaves from "../UI/Pages/Admin/AdminLeaves";

function Routing() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <HeaderCom />
          <Routes>
            <Route path="/showall" element={<ShowAll />} />
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<AdminLeaves />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/adminattendance" element={<AdminAttendance />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default Routing;
