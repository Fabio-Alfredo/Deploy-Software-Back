import React, { useEffect, useState, createContext } from "react";
import { login, getMe, register } from "../services/auth.service.jsx";
import { useNavigate } from "react-router-dom";
import { VIEWS } from "../lib/views.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("session");
      if (token) {
        await fetchUser();
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const registerUser = async (name, email, password) => {
    const user = await register(name, email, password);

    if (user) {
      setUser(user);
      navigate(VIEWS.login);
    }
  };

  const loginUser = async (email, password) => {
    const user = await login(email, password);
    if (user) {
      setUser(user);

      localStorage.setItem("session", user.token);
      fetchUser();
      navigate(VIEWS.securityHome);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("session");
      const response = await getMe(token);

      setUser((prev) => ({ ...prev, token, ...response }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
    navigate(VIEWS.login);
  };

  const isAuthenticated = () => user;

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isAuthenticated,
        loading,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
