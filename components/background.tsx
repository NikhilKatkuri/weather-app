import { useTime } from "@/context/useTime";
import { imagesType } from "@/types/images";
import { heightPercentage, widthPercentage } from "@/utils/useDimension";
import React from "react";
import { Image, View } from "react-native";

const Background = () => {
  const { bgImage } = useTime();
  const images: imagesType = {
    morning: require("../assets/images/bg-morning.png"),
    afternoon: require("../assets/images/bg-afternoon.png"),
    evening: require("../assets/images/bg-evening.png"),
    night: require("../assets/images/bg-night.png"),
  };
  return (
    <>
      {bgImage && (
        <Image
          resizeMode="cover"
          source={images[bgImage]}
          style={{
            flex: 1,
            width: widthPercentage(1),
            height: heightPercentage(1),
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "cover",
            zIndex: -2,
          }}
        />
      )}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: widthPercentage(1),
          height: heightPercentage(1),
          backgroundColor:
            bgImage === "afternoon" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.53)",
          zIndex: 0,
        }}
      />
    </>
  );
};

export default Background;
