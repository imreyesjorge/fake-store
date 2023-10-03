"use client";

import { Button, Input } from "@nextui-org/react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { IFormData } from "./types";
import toast from "react-hot-toast";
import { useUserContext } from "../context/UserContext";

export default function LoginScreen() {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setUser } = useUserContext();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!(formData.username && formData.password)) {
      toast.error(`Please provide a valid username and password.`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: "mor_2314",
          password: "83r5^_",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to connect with the server`);
      }

      const responseData = await response.json();

      // Set the token to the localStorage
      localStorage.setItem("token", responseData.token);
      setUser({ token: "anon" });
    } catch (error) {
      toast.error(error.message);

      // Use `anon` as a token if the service failed
      localStorage.setItem("token", "anon");
      setUser({ token: "anon" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value,
    }));
  };

  return !user ? (
    <form
      className="w-[400px] mx-auto flex flex-col gap-[20px]"
      onSubmit={handleFormSubmit}
    >
      <div className="text-center flex flex-col gap-[10px]">
        <h1 className="text-2xl font-bold">Welcome to FakeStore</h1>
        <p className="text-sm text-slate-600">
          Use your credentials to access the store
        </p>
      </div>
      <Input
        type="text"
        label="username"
        name="username"
        variant="bordered"
        value={formData.username}
        onChange={handleValueChange}
      />
      <Input
        type="password"
        label="password"
        name="password"
        variant="bordered"
        value={formData.password}
        onChange={handleValueChange}
      />
      <Button
        fullWidth
        size="lg"
        color="primary"
        disableRipple
        type="submit"
        isLoading={isLoading}
      >
        Login
      </Button>
    </form>
  ) : (
    <div className="w-full text-center flex flex-col gap-[10px] items-center justify-center">
      <h1 className="text-2xl font-bold">We’re glad to see you again!</h1>
      <p className="text-sm text-slate-600">
        Browse the <strong>users</strong> or the <strong>products</strong>{" "}
        pages.
      </p>
    </div>
  );
}
