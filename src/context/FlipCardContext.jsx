// app/context/FlipContext.js
"use client";
import { createContext, useContext, useState } from "react";

const FlipContext = createContext();

export const FlipProvider = ({ children }) => {
  const [flipAll, setFlipAll] = useState(false);

  return (
    <FlipContext.Provider value={{ flipAll, setFlipAll }}>
      {children}
    </FlipContext.Provider>
  );
};

export const useFlipContext = () => useContext(FlipContext);
