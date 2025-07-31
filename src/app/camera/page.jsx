"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // for triggering file input
  const [uploadedImage, setUploadedImage] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [sutra, setSutra] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("sutra"));
      if (data?.sutraData) {
        setSutra(data.sutraData);
      }
    }
  }, []);

  const completSutra = sutra ? `${sutra.s1} ${sutra.s2}` : "";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!uploadedImage || !completSutra) return;

    const drawImage = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const background = new Image();
      const selfie = new Image();

      background.src = `/stura_frame_images/${completSutra}.png`;
      selfie.src = uploadedImage;

      background.onload = () => {
        canvas.width = 500;
        canvas.height = 900;

        // Draw background frame
        ctx.drawImage(background, 0, 0, 500, 900);

        // Draw uploaded photo — center crop
        ctx.save();
        ctx.beginPath();
        ctx.rect(45, 463, 390, 250); // Clip to frame bounds
        ctx.clip();

        ctx.drawImage(selfie, 45, 463, 390, 250); // Fit inside area
        ctx.restore();

        // Generate output image
        const finalUrl = canvas.toDataURL("image/png");
        setFinalImageUrl(finalUrl);
      };
    };

    drawImage();
  }, [uploadedImage, completSutra]);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Hidden file input for camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user" // 👈 opens camera on mobile
        onChange={handleImageUpload}
        className="hidden"
      />
        <div className="mt-34 flex flex-col items-baseline justify-center gap-4">
          <h2 className="text-lg">તમારા સાથીદાર સાથેની સેલ્ફી</h2>
      {/* Custom trigger button */}
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="default"
        className="mb-4 py-5 px-8 w-full"
        >
        📸 Take Selfie
      </Button>
        </div>

      {/* Canvas (hidden) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Preview and Download */}
      {finalImageUrl && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <img
            src={finalImageUrl}
            alt="Final ID"
            className="w-[300px] border rounded shadow"
          />
          <a href={finalImageUrl} download="ID_Card.png">
            <Button variant="secondary">📥 Download Smruti</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
