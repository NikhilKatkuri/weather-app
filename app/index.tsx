import Background from "@/components/background";
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import { useGeo } from "@/context/useGeo";
import { useWeather } from "@/context/useWeather";
import { WeatherDataUsingIP } from "@/types/weather";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [data, setData] = useState<WeatherDataUsingIP | undefined>(undefined);
  const { location } = useGeo();

  const { getWeatherUsingIP } = useWeather();
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
        <Background />
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 7,
              borderRadius: 10,
              flex: 1,
              width: "100%",
              alignItems: "center",
              overflowX: "hidden",
            }}
          >
            <Navbar />
            <Body data={data} />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
