"use client";
import { AppContextProvider } from "@/hooks/useAppContext";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default Providers;
