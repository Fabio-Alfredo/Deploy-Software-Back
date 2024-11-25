import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (task, token) => {
  try {
    const response = await axios.post(`${API_URL}todo`, task, {
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

export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}todo`, {
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

export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}todo/${id}`, {
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

export const updateTask = async (id, task, token) => {
  try {
    const response = await axios.patch(`${API_URL}todo/${id}`, task, {
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
