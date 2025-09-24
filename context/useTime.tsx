"use client";

import { BgImage } from "@/types/images";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const basePath = "assets";
const imagePath = "images";

const bgMorning = `morning`;
const bgAfternoon = `afternoon`;
const bgEvening = `evening`;
const bgNight = `night`;

type ValueType = string;


interface TimeContextType {
  value: ValueType;
  setValue: (val: ValueType) => void;
  bgImage: BgImage;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [bgImage, setBgImage] = useState<BgImage>("morning");
  useEffect(() => {
    const updateBgImage = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setBgImage(bgMorning);
      } else if (hour >= 12 && hour < 17) {
        setBgImage(bgAfternoon);
      } else if (hour >= 17 && hour < 20) {
        setBgImage(bgEvening);
      } else {
        setBgImage(bgNight);
      }
    };
    updateBgImage();
    const interval = setInterval(updateBgImage, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [value, setValue] = useState<ValueType>("");
  return (
    <TimeContext.Provider value={{ value, setValue, bgImage }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) throw new Error("useTime must be used within TimeProvider");
  return context;
};
