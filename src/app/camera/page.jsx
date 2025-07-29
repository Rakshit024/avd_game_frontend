"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const Page = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCaptured(imageSrc);
  }, []);

  // Draw onto canvas when captured and base image loaded
  useEffect(() => {
    if (!captured) return;

    const drawImage = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const background = new Image();
      const selfie = new Image();

      background.src = "/frame.jpeg"; // from public folder
      selfie.src = captured;

      background.onload = () => {
        canvas.width = 600;
        canvas.height = 900;

        // Draw base image
        ctx.drawImage(background, 0, 0, 600, 900);

        // Draw captured selfie into frame region
        ctx.drawImage(selfie, 70, 390, 460, 310);

        // Convert canvas to downloadable image URL
        const finalUrl = canvas.toDataURL("image/png");
        setFinalImageUrl(finalUrl);
      };
    };

    drawImage();
  }, [captured]);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Webcam preview */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className="rounded shadow w-full max-w-md"
      />

      <Button className="my-4 w-full max-w-md" onClick={capture}>
        Capture Selfie
      </Button>

      {/* Canvas (invisible) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Final image preview */}
      {finalImageUrl && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <img
            src={finalImageUrl}
            alt="Final ID"
            className="w-[300px] border rounded shadow"
          />
          <a href={finalImageUrl} download="frame.jpeg">
            <Button variant="secondary">Download ID Card</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
