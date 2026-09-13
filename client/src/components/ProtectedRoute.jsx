import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("vbcToken");
  return token ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export default ProtectedRoute;
