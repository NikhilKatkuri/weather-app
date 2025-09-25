"use client";

import { BgImage } from "@/types/images";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

 

const bgMorning = `morning`;
const bgAfternoon = `afternoon`;
const bgEvening = `evening`;
const bgNight = `night`;

type ValueType = string;

type timeLineType = {
  day: string;
  month: string;
  date: number;
  year: number;
  timeLine: string;
};

type timeType = {
  hours: number;
  minutes: number;
};
interface TimeContextType {
  value: ValueType;
  setValue: (val: ValueType) => void;
  bgImage: BgImage;
  timeLine: timeLineType;
  time: timeType;
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
  const [timeLine, setTimeline] = useState<timeLineType>({
    day: "",
    month: "",
    year: 0,
    date: 0,
    timeLine: "",
  });
  const days = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );
  const months = useMemo(
    () => [
      "january",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  useEffect(() => {
    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    setTimeline({
      day: day,
      date: date.getDate(),
      month: month,
      year: year,
      timeLine: `${day} , ${month} ${year}`,
    });
  }, [days, months]);
  const [time, setTime] = useState<timeType>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  useEffect(() => {
    const get = () => {
      const date = new Date();
      setTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
      });
    };
    get();
    const interval = setInterval(get, 60 * 60);
    return () => clearInterval(interval);
  }, []);
  const [value, setValue] = useState<ValueType>("");
  return (
    <TimeContext.Provider value={{ value, setValue, bgImage, timeLine, time }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) throw new Error("useTime must be used within TimeProvider");
  return context;
};
