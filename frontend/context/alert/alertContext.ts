"use client"

import { AlertInitialState } from "@/types";
import { createContext } from "react";

const alertContext = createContext<AlertInitialState>({
  alerts: [],
});

export default alertContext;