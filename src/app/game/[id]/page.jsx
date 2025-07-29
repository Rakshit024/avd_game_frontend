import GamePage from "@/components/game-page";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return <GamePage id={id}/>;
};

export default page;
