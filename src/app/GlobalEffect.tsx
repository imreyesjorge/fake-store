"use client";

import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export const GlobalEffect = () => {
  const { setUser } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser((prev) => ({ ...prev, token }));
    }
  }, []);

  return <></>;
};
