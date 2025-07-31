"use client";
import { Button } from "@/components/ui/button";
import { backendUrl } from "@/config/envFile";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    const res = await axios.patch(`${backendUrl}/sutra/static`);
    console.log(res.data);
    if (res.data.errorStatus === false) {
      setIsClicked(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-red-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
            relative overflow-hidden
            px-16 py-12 md:px-24 md:py-16 lg:px-32 lg:py-20
            font-bold text-2xl md:text-4xl lg:text-5xl
            ${
              isClicked
                ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400"
                : "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400"
            }
            text-white border-none rounded-3xl shadow-2xl
            ${
              isClicked
                ? "hover:shadow-green-500/30 shadow-green-500/20"
                : "hover:shadow-orange-500/30 shadow-orange-500/20"
            }
            transform transition-all duration-500 ease-in-out
            ${isLoading ? "scale-95" : "hover:scale-105"}
            ${isClicked ? "animate-pulse" : ""}
            active:scale-95
          `}
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-white rounded-3xl transition-opacity duration-300"></div>

          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Button text with flip animation */}
          <div className="relative w-64 h-24">
            <div
              className={`transition-all duration-500 transform absolute inset-0 flex items-center justify-center text-5xl font-bold ${
                isClicked
                  ? "opacity-0 scale-75 rotate-12"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            >
              {isLoading ? "" : "બસ એક"}
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-5xl font-bold transition-all duration-500 transform ${
                isClicked
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-12"
              }`}
            >
              તુ રાજી થા
            </div>
          </div>

          {/* Sparkle effects */}
          {isClicked && (
            <>
              <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
              <div className="absolute bottom-3 left-8 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-400"></div>
              <div className="absolute bottom-2 right-4 w-2 h-2 bg-white rounded-full animate-ping delay-600"></div>
            </>
          )}
        </button>
      </div>

      {/* Success confetti effect */}
      {isClicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
