import { useGeo } from "@/context/useGeo";
import { widthPercentage } from "@/utils/useDimension";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

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
          {location?.city}, {location?.country}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "PoppinsLight",
          }}
        >
          {timeLine.day}, {timeLine.month} {timeLine.date}, {time.hours}:
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
        </Text>
      </View>
    </View>
  );
};

export default Body;
