import axios, { AxiosError } from "axios";
import { RegisterForm } from "./pages/Register";

const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ErrorResponse {
  message: string;
}

export const register = async (formData: RegisterForm) => {
  try {
    await axios.post(`${APP_BASE_URL}/api/users/register`, formData);
    // console.log("response: ", response);
    // const resposeBody = response.data;
    // console.log("resposeBody: ", resposeBody);
    // return resposeBody;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response) {
        throw new Error((serverError.response.data as ErrorResponse).message);
      }
    }
  }
};
