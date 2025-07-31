"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/config/envFile";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";

const groupOptions = [
  "Param",
  "Pavitra",
  "Pulkit",
  "Paramanand",
  "Samp",
  "Atmiya",
  "Suhradbhav",
  "Bhulku",
  "Saradta",
  "Dasatva",
  "Swikar",
  "Ekta",
  "Sahaj",
  "Seva Nadiad",
  "Smruti Nadiad",
  "Suhradbhav Nadiad",
  "Swadharma Nadiad",
  "Bhakti Zone",
  "Parabhakti Zone",
  "Anuvrutti Zone",
  "Mehemdavad",
];

const GamePage = ({ id }) => {
  const [partnerId, setPartnerId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [part_a, setPart_a] = useState("");
  const [part_b, setPart_b] = useState("");
  const [blockNo, setBlockNo] = useState(null);
  const [is_second_true, setIs_second_true] = useState(false);
  const [group, setGroup] = useState("");
  const [my_group, setMy_group] = useState("");

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("sutra"));

  //   if (!data || data.sutraData === null) {
  //     redirect("/");
  //   }

  //   if (data.fieldValue !== id) {
  //     redirect("/");
  //   }

  //   if (data.sutraData.p2 === id) {
  //     setIs_second_true(true);
  //   }
  //   setPart_a(data.sutraData.s1);
  //   setPart_b(data.sutraData.s2);
  //   setMy_group(data.groupName);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (partnerId.trim() === "") {
      setError("Diary Id is required");
      return;
    }

    if (!/^\d+$/.test(partnerId.trim())) {
      setError("Diary ID must be a number");
      return;
    }
    setError("");

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${backendUrl}/sutra/checkStatus`,
        {
          id: id,
          secondId: partnerId,
          groupName: my_group,
          secondGroupName: group,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        if (res.data.errorStatus === true) {
          toast.error("Both IDs are in the same Sutra ");
        }
        if (res.data.data.status === "PAIRED") {
          toast.success("Successfully Paired");
          setBlockNo(res.data.data.updated.sutraA.blockNo);
        }
        if (res.data.data.status == "ALREADY_PAIRED") {
          setBlockNo(res.data.data.blockNo);
          toast.success(res.data.data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full flex justify-center items-stretch gap-4 ">
          {/* This is for sutra section */}
          <Card className="w-96 h-36 flex flex-col justify-between">
            <CardHeader>
              {is_second_true ? "તમારા સાથીદાર નું સુત્ર" : "તમારું સુત્ર"}
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <h1
                  className={`text-md font-bold ${
                    is_second_true ? "text-destructive" : "text-primary"
                  }`}
                >
                  {part_a}
                </h1>
              </div>
            </CardContent>
          </Card>

          <Card className="w-96 h-36 flex flex-col justify-between">
            <CardHeader>
              {is_second_true ? "તમારું સુત્ર" : "તમારા સાથીદાર નું સુત્ર"}
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <h1
                  className={`text-md font-bold ${
                    is_second_true ? "text-primary" : "text-destructive"
                  }`}
                >
                  {part_b}
                </h1>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex justify-center items-center">
          <Card className={'w-full py-2'}>
            <CardContent>
               <div>
                <h1 className="text-md text-center">તમારું Id : {id}</h1>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <Card className={"h-full"}>
            <CardContent>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center gap-4 w-[80vw]"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <Label>તમારા સાથીદાર નું Id</Label>
                    <Input
                      type="text"
                      value={partnerId}
                      placeholder="Enter Your Partner Id"
                      className={`w-full  ${
                        error.trim() !== "" ? "border-red-500" : ""
                      }`}
                      onChange={(e) => setPartnerId(e.target.value)}
                    />
                    {error.trim() !== "" && (
                      <p className="text-red-500">{error}</p>
                    )}
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
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {blockNo !== null && (
          <div className="w-full flex items-center justify-center">
            <Card>
              <CardContent>
                <div className="flex flex-col gap-2">
                  Your Fliped Block Number is : {blockNo}
                  <Link href={"/camera"}>
                    <Button className={"w-full"} variant={"secondary"}>
                      Take Smruti
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePage;
