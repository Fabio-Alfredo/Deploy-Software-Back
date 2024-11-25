import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);

    console.error(error);
    toast.error(errorMessage);
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, {
      name,
      email,
      password,
    });

    return true;
  } catch (error) {
    const errorMessage = handleError(error);

    console.error(error);
    toast.error(errorMessage);

    return false;
  }
};

export const getMe = async (token) => {
  try {
    const response = await axios.get(`${API_URL}user/me`, {
      headers: {
        Authorization: `${import.meta.env.VITE_API_PREFIX} ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);

    console.error(error);
    toast.error(errorMessage);
  }
};
