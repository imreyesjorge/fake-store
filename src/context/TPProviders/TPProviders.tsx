"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TPProvidersProps } from "./types";

export function TPProviders({ children }: TPProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
