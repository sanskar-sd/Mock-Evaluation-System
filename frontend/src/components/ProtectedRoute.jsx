import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("meval_token");
  const userRaw = localStorage.getItem("meval_user");
  let user = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw);
    } catch (e) {
      // malformed stored user, clear it
      localStorage.removeItem("meval_user");
      user = null;
    }
  }

  if (!token || !user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}
