import Navbar from "@/components/Navbar";
import { useTime } from "@/context/useTime";
import { imagesType } from "@/types/images";
import { heightPercentage, widthPercentage } from "@/utils/useDimension";
import { Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
              width: widthPercentage(1),
              height: heightPercentage(1),
              position: "absolute",
              top: 0,
              left: 0,
              resizeMode: "cover",
              zIndex: -1,
            }}
          />
        )}
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor: "#00000080",
              flex: 1,
              width: "100%",
              alignItems: "center",
              overflowX: "hidden",
            }}
          >
            <Navbar />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
