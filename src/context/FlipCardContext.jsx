"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import axios from "axios";
import { backendUrl } from "@/config/envFile";

const FlipCardContext = createContext();

const ROWS = 20;
const COLS = 25;

const CENTER_X = Math.floor(COLS / 2);
const CENTER_Y = Math.floor(ROWS / 2);

export const FlipCardProvider = ({ children }) => {
  const [cards, setCards] = useState(
    Array.from({ length: ROWS * COLS }, (_, i) => {
      const x = i % COLS;
      const y = Math.floor(i / COLS);
      return {
        id: i + 1,
        x,
        y,
        flipped: false,
      };
    })
  );

  const { socket } = useSocket();

  const skipIds = new Set([261, 262, 263, 286, 287, 288]);

  const flipFromCenter = () => {
    const sorted = [...cards]
      .filter((card) => !skipIds.has(card.id)) // Exclude the specified IDs
      .sort((a, b) => {
        const distA = Math.sqrt((a.x - CENTER_X) ** 2 + (a.y - CENTER_Y) ** 2);
        const distB = Math.sqrt((b.x - CENTER_X) ** 2 + (b.y - CENTER_Y) ** 2);
        return distA - distB;
      });

    sorted.forEach((card, index) => {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
        );
      }, index * 120);
    });
  };

  const flipSkippedBlocksSequentially = () => {
    const skipBlocks = cards.filter((card) => skipIds.has(card.id));

    skipBlocks.forEach((card, index) => {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
        );
      }, index * 200); // Delay (adjust if needed)
    });
  };

  const fetchFromApi = async () => {
    try {
      const res = await axios.get(`${backendUrl}/sutra/paired`);

      const records = res.data.data.records;

      console.log(records);

      if (!Array.isArray(records)) return;

      records.forEach((item, index) => {
        const { blockNo, flipped } = item;

        if (blockNo > 500) return;

        setCards((prev) =>
          prev.map((card) =>
            card.id === blockNo ? { ...card, flipped } : card
          )
        );
        // Delay between each flip (150ms)
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFromApi();
  }, []);

  useEffect(() => {
    const handleData = (data) => {
      const { blockNo, flipped } = data;

      if (blockNo > 500) {
        return;
      }

      console.log("Received:", blockNo, flipped);

      setCards((prev) =>
        prev.map((card) => (card.id === blockNo ? { ...card, flipped } : card))
      );
    };

    const handleFlipSix = (data) => {
      if (data.flipped) {
        flipSkippedBlocksSequentially();
      }
    };

    const handleFlipAll = (data) => {
      if (data.flipped) {
        flipFromCenter();
      }
    };

    socket.on("sutra-paired", handleData);
    socket.on("sutra-six", handleFlipSix);
    socket.on("sutra-All", handleFlipAll);

    return () => {
      socket.off("sutra-paired", handleData);
      socket.off("sutra-six", handleFlipSix);
      socket.off("sutra-All", handleFlipAll);
    };
  }, [socket]);

  return (
    <FlipCardContext.Provider
      value={{ cards, setCards, flipFromCenter, flipSkippedBlocksSequentially }}
    >
      {children}
    </FlipCardContext.Provider>
  );
};

export const useFlipContext = () => useContext(FlipCardContext);
