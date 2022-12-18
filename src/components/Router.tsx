import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Login";
import { AppRouterOption } from "../types";

export default function AppRouter({refreshUser, user, isLoggedIn}: AppRouterOption) {
  return <Router>
    <Routes>
      { isLoggedIn? (
        <>
        <Route path="/" element={<Home user={user} />} />
        </>
      ) : (
        <>
        <Route path="/" element={<Auth />} />
        </>
      )}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </Router>

}