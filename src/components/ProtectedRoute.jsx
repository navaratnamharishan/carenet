// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }){
  const auth = JSON.parse(localStorage.getItem("carenet_auth") || "null");
  if (!auth || !auth.user) return <Navigate to="/login" />;
  // allow superadmin to access everything
  if (auth.user.isSuper) return children;
  // role check
  if (role && auth.user.role !== role) return <Navigate to="/login" />;
  return children;
}
