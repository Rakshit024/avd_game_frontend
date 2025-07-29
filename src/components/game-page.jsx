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

const GamePage = ({ id }) => {
  const [partnerId, setPartnerId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [part_a, setPart_a] = useState("");
  const [part_b, setPart_b] = useState("");
  const [blockNo, setBlockNo] = useState(null);
  // game/get-quote-part

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/game/get-quote-part?diary_number=${id}`
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        setPart_a(res.data.part_a);
        setPart_b(res.data.part_b);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (partnerId.trim() === "") {
      setError("Diary Id is required");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${backendUrl}/game/verify-quote-pair`,
        {
          diary_id_1: id,
          diary_id_2: partnerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message);
        setBlockNo(res.data.flip_number);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const flipBlock = async () => {
    e.preventDefault();
    if (partnerId.trim() === "") {
      setError("Diary Id is required");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${backendUrl}/game/verify-quote-pair`,
        {
          diary_id_1: id,
          diary_id_2: partnerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message);
        setBlockNo(res.data.flip_number);
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
        <div className="w-full flex items-center justify-center">
          {/* This is for sutra section  */}
          <Card>
            <CardContent>
              <div className="flex gap-2">
                <h1
                  className={`text-md font-bold ${
                    id % 2 == 0 ? "text-destructive" : "text-primary"
                  }`}
                >
                  {part_a}
                </h1>
                <h1
                  className={`text-md font-bold ${
                    id % 2 == 0 ? "text-primary" : "text-destructive"
                  }`}
                >
                  {part_b}
                </h1>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex items-center justify-center">
          <Card>
            <CardContent>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center gap-4 w-[80vw]"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <Label>Enter Your Partner Id</Label>
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
                Your Block Number is : {blockNo}
                <Button onClick={() => flipBlock(blockNo)}>Flip Block</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePage;
