"use client";

import { Button, Input } from "@nextui-org/react";

export default function LoginScreen() {
  return (
    <form className="w-[400px] mx-auto flex flex-col gap-[20px]">
      <div className="text-center flex flex-col gap-[10px]">
        <h1 className="text-2xl font-bold">We’re glad to see you again!</h1>
        <p className="text-sm text-slate-600">
          Use your credentials to access the store
        </p>
      </div>
      <Input type="text" label="username" variant="bordered" />
      <Input type="password" label="password" variant="bordered" />
      <Button fullWidth size="lg" color="primary" disableRipple>
        Login
      </Button>
    </form>
  );
}
