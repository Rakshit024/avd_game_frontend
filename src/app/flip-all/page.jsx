"use client";
import { Button } from "@/components/ui/button";
import { backendUrl } from "@/config/envFile";
import axios from "axios";
import React from "react";

const page = () => {
  const flipAll = async () => {
    const res = await axios.patch(`${backendUrl}/sutra/staticAll`);
    console.log(res.data);
  };

  return <Button onClick={flipAll}>Flip From Anywhere</Button>;
};

export default page;
