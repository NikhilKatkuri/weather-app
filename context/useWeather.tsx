"use client";

import { WeatherDataUsingIP } from "@/types/weather";
import { createContext, ReactNode, useContext, useState } from "react";

type ValueType = string;

interface WeatherContextType {
  value: ValueType;
  setValue: (val: ValueType) => void;
  getWeatherUsingIP: (
    lat: string | number,
    long: string | number
  ) => Promise<WeatherDataUsingIP | undefined>;
  getWeatherUsingQueryPlace: (
    query: string
  ) => Promise<WeatherDataUsingIP | undefined>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const ApiKey = process.env.EXPO_PUBLIC_API_KEY;
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<ValueType>("");

  const getWeatherUsingIP = async (
    lat: string | number,
    long: string | number
  ): Promise<WeatherDataUsingIP | undefined> => {
    try {
      const url = `${baseUrl}weather?lat=${lat}&lon=${long}&appid=${ApiKey}&units=metric`;
      const res = await fetch(url);
      const date = await res.json();
      return date as WeatherDataUsingIP;
    } catch {
      return undefined;
    }
  };

  const getWeatherUsingQueryPlace = async (
    query: string
  ): Promise<WeatherDataUsingIP | undefined> => {
    try {
      const url = `${baseUrl}weather?q=${query}&appid=${ApiKey}&units=metric`;
      console.log(url)
      const res = await fetch(url);
      if (!res.ok) return undefined;
      if (res.status === 404) return await getWeatherUsingQueryPlace("india");
      const data = await res.json();
      return data as WeatherDataUsingIP;
    } catch {
      return undefined;
    }
  };

  return (
    <WeatherContext.Provider
      value={{ value, setValue, getWeatherUsingIP, getWeatherUsingQueryPlace }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used within WeatherProvider");
  return context;
};
