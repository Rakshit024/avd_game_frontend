"use client";
import React from "react";
import FlipCardCmp from "./flip-card-cmp";
import { useFlipContext } from "@/context/FlipCardContext";     

const FlipCard = () => {
  const arrayData = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    flipped: false, // default value
  }));

  return (
    <div className="grid grid-cols-25 grid-rows-20 w-full h-[98vh]">
      {arrayData.map((i) => (
        <FlipCardCmp key={i.id} number={i.id} flipped={i.flipped} />
      ))}
    </div>
  );
};

export default FlipCard;
