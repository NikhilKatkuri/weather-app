import Background from "@/components/background";
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import { GeoProvider } from "@/context/useGeo";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <GeoProvider>
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
          <Background />
          <SafeAreaView>
            <View
              style={{
                paddingHorizontal: 40,
                paddingVertical: 7,
                borderRadius: 10,
                // backgroundColor: "#00000080",
                flex: 1,
                width: "100%",
                alignItems: "center",
                overflowX: "hidden",
              }}
            >
              <Navbar />
              <Body  />
            </View>
          </SafeAreaView>
        </View>
      </GeoProvider>
    </>
  );
}
