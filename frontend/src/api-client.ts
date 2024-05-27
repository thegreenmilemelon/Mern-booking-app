import axios, { AxiosError } from "axios";
import { RegisterForm } from "./pages/Register";

import { SignInFormData } from "./pages/SignIn";

const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ErrorResponse {
  message: string;
}

export const register = async (formData: RegisterForm) => {
  try {
    await axios.post(`${APP_BASE_URL}/api/users/register`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export const signIn = async (formData: SignInFormData) => {
  const response = await axios.post(
    `${APP_BASE_URL}/api/auth/login`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response from signIn: ", response);
  if (response.status !== 200) {
    throw new Error("Failed to sign in");
  }
  return response.data;
};

export const signOut = async () => {
  const response = await axios.post(
    `${APP_BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response from signOut: ", response);
  if (response.status !== 200) {
    throw new Error("Failed to sign out");
  }
};

export const validateToken = async () => {
  const response = await axios.get(`${APP_BASE_URL}/api/auth/validate-token`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to validate token");
  }
  return response.data;
};
