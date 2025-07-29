"use client";
import { Button } from "@/components/ui/button";
import { useFlipContext } from "@/context/FlipCardContext";
import React from "react";

const page = () => {
  const { setFlipAll } = useFlipContext();
  return (
    <div className="flex justify-center items-center">
      <Button onClick={() => setFlipAll(true)}>Flip All</Button>
    </div>
  );
};

export default page;
