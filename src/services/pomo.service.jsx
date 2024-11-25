import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllPomodoros = async (token) => {
    try {
      const response = await axios.get(`${API_URL}pomodoro/user`, {
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

export const patchTodosInPomodoros = async (todos, token) => {
    try {
        const response = await axios.patch(`${API_URL}pomodoro/`, todos, {
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
}

export const patchPomodoroStateAndTime = async (pomodoro, token) => {
    try {
        const response = await axios.patch(`${API_URL}pomodoro/state-time`, pomodoro, {
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
}