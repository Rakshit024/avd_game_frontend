"use client";
import { Button } from "@/components/ui/button";
import { useFlipContext } from "@/context/FlipCardContext";
import React from "react";

const page = () => {
  const { flipFromCenter } = useFlipContext();

  return <Button onClick={flipFromCenter}>Flip From Anywhere</Button>;
};

export default page;
