import { useGeo } from "@/context/useGeo";
import { useWeather } from "@/context/useWeather";
import { WeatherDataUsingIP } from "@/types/weather";
import { widthPercentage } from "@/utils/useDimension";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

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
const Body = () => {
  const { location } = useGeo();
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

  const [timeLine, setTimeline] = useState<timeLineType>({
    day: "",
    month: "",
    year: 0,
    date: 0,
    timeLine: "",
  });
  const [time, setTime] = useState<timeType>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

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

  const { getWeatherUsingIP } = useWeather();
  const [data, setData] = useState<WeatherDataUsingIP | undefined>(undefined);
  useEffect(() => {
    const [lat, long] = [location?.lat, location?.lon];
    (async () => {
      if (lat !== undefined && long !== undefined) {
        const data = await getWeatherUsingIP(lat, long);
        setData(data);
      }
    })();
  }, [getWeatherUsingIP, location?.lat, location?.lon]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 24,
        width: widthPercentage(1),
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "PoppinsMedium",
            textAlign: "center",
          }}
        >
          {location?.city || "Unknown City"},{" "}
          {location?.country || "Unknown Country"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "PoppinsLight",
          }}
        >
          {timeLine.day || "Unknown Day"}, {timeLine.month || "Unknown Month"}{" "}
          {timeLine.date || 0}, {time.hours || 0}:
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
        </Text>
      </View>
      <View style={{ height: 36 }} />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "PoppinsMedium",
          }}
        >
          {data?.weather[0].description || ""}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 48,
            fontFamily: "PoppinsLight",
          }}
        >
          {data?.main.temp}&deg;C
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              fontFamily: "Poppinssemibold",
            }}
          >
            High: {data?.main.temp_max}&deg;C
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              fontFamily: "Poppinssemibold",
            }}
          >
            Low: {data?.main.temp_min}&deg;C
          </Text>
        </View>
      </View>
      <View style={{ height: 36 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
          backgroundColor: "#ffffff90",
          borderRadius: 10,
          alignItems: "center",
          paddingHorizontal: 22,
          gap: 56,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Image
            source={require("../assets/images/humidity.png")}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: "#000" }}
          >
            {data?.main.humidity || 0}%
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Image
            source={require("../assets/images/wind-speed.png")}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: "#000" }}
          >
            {data?.wind.speed || 0} km/h
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Body;
