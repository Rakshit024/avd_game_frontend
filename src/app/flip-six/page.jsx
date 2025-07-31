'use client'
import { Button } from "@/components/ui/button";
import { backendUrl } from "@/config/envFile";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const handleSubmit = async () => {
    const res = await axios.patch(`${backendUrl}/sutra/static`);
    console.log(res.data)
    if (res.data.errorStatus === false) {
      toast.success("Flip Successfully");
    }
  };

  return (
    <div>
      {/* {/* <Button onClick={flipFromCenter}>Flip All</Button> */}
      <Button onClick={handleSubmit}>Flip HPYS</Button>
    </div>
  );
};

export default page;
