import { useTime } from "@/context/useTime";
import { GeoData } from "@/types/geo";
import { WeatherDataUsingIP } from "@/types/weather";
import { convertUnixToLocal } from "@/utils/converter";
import { widthPercentage } from "@/utils/useDimension";
import React from "react";
import { Image, Text, View } from "react-native";

const Body = ({
  data,
  location,
}: {
  data: WeatherDataUsingIP | undefined;
  location: GeoData | undefined | null;
}) => {
  const { timeLine, time } = useTime();

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
      <View style={{ height: 36 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
          // backgroundColor: "#ffffff90",
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
            source={require("../assets/images/sunrise.png")}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: "#fff" }}
          >
            {(() => {
              const date = convertUnixToLocal(
                data?.sys.sunrise || 0,
                data?.timezone || 0
              );

              let hours = date.getUTCHours();
              let minutes = date.getUTCMinutes();
              const ampm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12 || 12; // convert 0 → 12 for midnight
              const formattedHours = hours < 10 ? `0${hours}` : hours;
              const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

              return `${formattedHours}:${formattedMinutes} ${ampm}`;
            })()}
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
            source={require("../assets/images/sunset.png")}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{ fontFamily: "PoppinsMedium", fontSize: 12, color: "#fff" }}
          >
            {(() => {
              const date = convertUnixToLocal(
                data?.sys.sunset || 0,
                data?.timezone || 0
              );

              let hours = date.getUTCHours();
              let minutes = date.getUTCMinutes();
              const ampm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12 || 12; // convert 0 → 12 for midnight
              const formattedHours = hours < 10 ? `0${hours}` : hours;
              const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

              return `${formattedHours}:${formattedMinutes} ${ampm}`;
            })()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Body;
