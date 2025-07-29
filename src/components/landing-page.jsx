"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backendUrl } from "@/config/envFile";
import { toast } from "react-hot-toast";

const groupOptions = [
  "Param",
  "Pulkit",
  "Pavitra",
  "Parmanand",
  "Samp Atmiya",
  "Suhradbhav Bhoolku",
  "Saradata Dastva",
  "Swikar Ekta",
  "Sahaj (V. V. Nagar, Karamsad, Mogari)",
  "Seva (Nadiad - city)",
  "Smruti (Nadiad - city)",
  "Suhradbhav (Nadiad - city)",
  "Swadharm (Nadiad - city)",
  "Bhakti(Nadiyad Gramya)",
  "Parabhakti(Nadiyad Gramya)",
  "Anuvruti(Nadiyad Gramya)",
  "Mahemdavad",
];

const LandingPage = () => {
  const [id, setId] = useState("");
  const [group, setGroup] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Resolved after ${ms} milliseconds`);
      }, ms);
    });
  }
  // /game/diary-entry/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id.trim() === "") {
      setError("Diary Id is required");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      // http://192.168.201.155:8000/game/diary-entry

      const response = await axios.post(
        `${backendUrl}/game/diary-entry`,
        {
          diary_number: id,
          group_name:group
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.status === 201) {
        if (response.data) {
          router.replace(`/game/${response.data.diary_number}`);
        }
      }
    } catch (error) {
      if (error.request) {
        const message = JSON.parse(error.request.response).error;
        toast.error(message);
      }

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 w-[80vw]"
        >
          <div className="flex flex-col gap-2 w-full">
            <Label>Enter Your diary Id</Label>
            <Input
              type="text"
              value={id}
              placeholder="Enter Your diary Id"
              className={`w-full  ${
                error.trim() !== "" ? "border-red-500" : ""
              }`}
              onChange={(e) => setId(e.target.value)}
            />
            {error.trim() !== "" && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Select Group</Label>
            <Select
              onValueChange={(value) => {
                console.log("Selected Group:", value);
                setGroup(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Group *" />
              </SelectTrigger>
              <SelectContent>
                {groupOptions.map((groupName) => (
                  <SelectItem key={groupName} value={groupName}>
                    {groupName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Button type={"submit"} className={"w-full py-6 text-lg"}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
