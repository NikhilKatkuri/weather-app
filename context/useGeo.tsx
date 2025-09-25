"use client";
import { GeoData } from "@/types/geo";
import * as Network from "expo-network";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface GeoContextType {
  localIP: string | null;
  location: GeoData | null;
}

const GeoContext = createContext<GeoContextType | undefined>(undefined);

export const GeoProvider = ({ children }: { children: ReactNode }) => {
  const [localIP, setLocalIP] = useState<string | null>(null);
  const [location, setLocation] = useState<GeoData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const ip = await Network.getIpAddressAsync();
        setLocalIP(ip);

        const res = await fetch("https://api.ipify.org?format=json");
        const { ip: publicIP } = await res.json();

        const geoRes = await fetch(`http://ip-api.com/json/${publicIP}`);
        const geoJson = await geoRes.json();
        setLocation(geoJson);  
      } catch (error) {
        console.error("Error fetching IP/Geo:", error);
      }
    })();
  }, []);
  return (
    <GeoContext.Provider value={{ localIP, location }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => {
  const context = useContext(GeoContext);
  if (!context) throw new Error("useGeo must be used within GeoProvider");
  return context;
};
