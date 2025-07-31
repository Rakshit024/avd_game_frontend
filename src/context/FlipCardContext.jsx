"use client";
import { createContext, useContext, useState } from "react";

const FlipCardContext = createContext();

const ROWS = 20;
const COLS = 25;

const CENTER_X = Math.floor(COLS / 2);
const CENTER_Y = Math.floor(ROWS / 2);

export const FlipCardProvider = ({ children }) => {
  const [cards, setCards] = useState(
    Array.from({ length: ROWS * COLS }, (_, i) => {
      const x = i % COLS;
      const y = Math.floor(i / COLS);
      return {
        id: i + 1,
        x,
        y,
        flipped: true,
      };
    })
  );

  const flipFromCenter = () => {
    console.log('function run')
    const sorted = [...cards].sort((a, b) => {
      const distA = Math.sqrt((a.x - CENTER_X) ** 2 + (a.y - CENTER_Y) ** 2);
      const distB = Math.sqrt((b.x - CENTER_X) ** 2 + (b.y - CENTER_Y) ** 2);
      return distA - distB;
    });

    sorted.forEach((card, index) => {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
          )
        );
      }, index * 20);
    });
  };

  return (
    <FlipCardContext.Provider value={{ cards, setCards, flipFromCenter }}>
      {children}
    </FlipCardContext.Provider>
  );
};

export const useFlipContext = () => useContext(FlipCardContext);
