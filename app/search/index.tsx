import Background from "@/components/background";
import Body from "@/components/Body";
import { useWeather } from "@/context/useWeather";
import { GeoData } from "@/types/geo";
import { WeatherDataUsingIP } from "@/types/weather";
import { widthPercentage } from "@/utils/useDimension";
import React, { useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [query, setQuery] = useState<string>("");
  const { getWeatherUsingQueryPlace } = useWeather();
  const [data, setData] = useState<WeatherDataUsingIP | undefined | null>(null);
  const [location, setLocation] = useState<GeoData | undefined>(undefined);
  const handleSearch = async () => {
    if (!query.trim()) return;
    const result = await getWeatherUsingQueryPlace(query.trim());
    setData(result);
    setLocation({
      city: query.trim(),
      country: result?.sys.country || "IN",
      lat: 0,
      lon: 0,
      regionName: result?.sys.country || "IN",
      query: query.trim(),
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "flex-start" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#ffffff00"} />
      <Background />
      <SafeAreaView>
        <View style={{ flex: 1, alignItems: "flex-start", padding: 16 }}>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "400",
                fontFamily: "poppinsMedium",
                color: "#fff",
              }}
            >
              Search
            </Text>
          </View>
          <View style={{ height: 16 }} />
          <View
            style={{
              width: widthPercentage(1) - 32,
              alignItems: "center",
              height: 48,
              backgroundColor: "rgb(248 250 252 )",
              borderRadius: 8,
              paddingHorizontal: 4,
              paddingLeft: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Search"
              value={query}
              onChangeText={(text) => setQuery(text)}
              style={{ flex: 1, color: "rgb(71 85 105)" }}
            />
            <View
              style={{
                backgroundColor: "rgb(241 245 249 )",
                borderRadius: 8,
                marginLeft: 8,
                padding: 8,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
            >
              <TouchableOpacity onPress={handleSearch}>
                <View>
                  <Image
                    source={require("../../assets/images/search.png")}
                    style={{
                      height: 24,
                      width: 24,
                      tintColor: "#000",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 16 }} />
          <View style={{ flex: 1, maxWidth: widthPercentage(1)-32, alignItems: "center", justifyContent: "center" }}>
            {data === null ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Image
                  source={require("../../assets/images/start-search.png")}
                  style={{ width: 300, height: 300 }}
                />
              </View>
            ) : data === undefined ? (
              <>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Image
                    source={require("../../assets/images/not-found.png")}
                    style={{ width: 300, height: 300 }}
                  />
                </View>
              </>
            ) : (
              <Body data={data} location={location} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
