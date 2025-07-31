"use client";
import React from "react";
import FlipCardCmp from "./flip-card-cmp";
import { Button } from "./ui/button";
import { useFlipContext } from "@/context/FlipCardContext";

const FlipCard = () => {
  const { cards } = useFlipContext();

  return (
    <>
 
      <div className="grid grid-cols-25 grid-rows-20 w-full h-[112.5vh] ">
        {cards.map((card) => (
          <FlipCardCmp key={card.id} number={card.id} flipped={card.flipped} />
        ))}
      </div>
    </>
  );
};

export default FlipCard;
