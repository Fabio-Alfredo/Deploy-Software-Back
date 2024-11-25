import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import Loading from "../generic/Loading";

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/login" />;
  }

  return Component ? <Component /> : <Outlet />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
};

export default ProtectedRoute;
