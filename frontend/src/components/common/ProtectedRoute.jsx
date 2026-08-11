import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

/**
 * Route guard component ensuring user is authenticated before accessing child components.
 * Redirects to /login if unauthenticated. Shows Loader while auth state initializes.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
