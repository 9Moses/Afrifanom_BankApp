import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../login/login";
import ClientDashboard from "../dashboard/client_dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routesPages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default routesPages;
