import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Fetch user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Check if the user is authenticated
  const isAuthenticated = !!user && !!token;

  // Check if the user's role matches one of the allowed roles (if roles are provided)
  const hasAccess = allowedRoles
    ? isAuthenticated && allowedRoles.includes(user?.Admin)
    : isAuthenticated;

  // Redirect to login if the user is not authenticated or doesn't have access
  if (!hasAccess) {
    return <Navigate to="/UserHomepage" />;
  }

  // Render the child components if access is granted
  return children;
};

export default ProtectedRoute;
