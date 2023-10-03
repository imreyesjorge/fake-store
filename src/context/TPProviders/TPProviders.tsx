"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TPProvidersProps } from "./types";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../UserContext";

export function TPProviders({ children }: TPProvidersProps) {
  return (
    <NextUIProvider>
      <UserProvider>
        <>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                padding: "10px 20px",
              },
            }}
          />
        </>
      </UserProvider>
    </NextUIProvider>
  );
}
