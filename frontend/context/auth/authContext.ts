"use client"

import { AuthInitialState } from "@/types";
import { createContext } from "react";

const authContext = createContext<AuthInitialState>({
  user: null,
  loading: false,
});

export default authContext;