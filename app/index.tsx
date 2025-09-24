import { useTime } from "@/context/useTime";
import { imagesType } from "@/types/images";
import { Dimensions, Image, StatusBar, Text, View } from "react-native";

export default function Index() {
  const { width, height } = Dimensions.get("screen");
  const { bgImage } = useTime();
  const images: imagesType = {
    morning: require("../assets/images/bg-morning.png"),
    afternoon: require("../assets/images/bg-afternoon.png"),
    evening: require("../assets/images/bg-evening.png"),
    night: require("../assets/images/bg-night.png"),
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff00"} />
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {bgImage && (
          <Image
            source={images[bgImage]}
            style={{
              flex: 1,
              width: width,
              height: height,
              position: "absolute",
              top: 0,
              left: 0,
              resizeMode: "cover",
              zIndex: -1,
            }}
          />
        )}
        <Text></Text>
      </View>
    </>
  );
}
