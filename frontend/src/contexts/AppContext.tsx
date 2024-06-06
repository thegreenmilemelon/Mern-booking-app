import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise = loadStripe(STRIPE_PUB_KEY);

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type Props = {
  children: React.ReactNode;
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const result = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !result.isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppcontext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
